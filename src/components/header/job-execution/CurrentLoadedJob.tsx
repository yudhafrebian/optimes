import {
  INITIAL_LOADER_DATA,
  loadedDataAtom,
  loaderAtom,
} from "@/atoms/loader.atom";
import AssignmentIcon from "@mui/icons-material/Assignment";
import VerifiedIcon from "@mui/icons-material/Verified";
import GenericChips from "../../core/GenericChips";
import { useSnackbar } from "@/hooks/useSnackbar";
import {
  Alert,
  Box,
  Button,
  Collapse,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useAtom } from "jotai";
import * as React from "react";
import { assetsApi, commonApi } from "@/lib/api";
import { EventsQueryResponse } from "@/api/generated/assets-service";
import GenericDialog from "@/components/dialog/GenericDialog";
import { formatDateTime } from "@/utils/timeFormater";
import useSWR from "swr";

const CurrentLoadedJobCard = () => {
  const [loader, setLoader] = useAtom(loaderAtom);
  const [loaderData, setLoaderData] = useAtom(loadedDataAtom);
  const [openAlert, setOpenAlert] = React.useState<boolean>(false);
  const [progress, setProgress] = React.useState(0);

  const [data, setData] = React.useState<EventsQueryResponse>({
    count: 0,
    total: 0,
    rows: [],
  });
  const [open, setOpen] = React.useState<boolean>(false);
  const [dialogType, setDialogType] = React.useState<
    "complete" | "unload" | null
  >(null);
  const activeJobId = loaderData.id || loader.id;

  const fetcher = async ([, jobId]: [string, string]) => {
    const res = await commonApi.jobOffsetPrinterTaiyoControllerGetById(jobId);
    return res;
  };

  const { mutate } = useSWR(
    loader.isLoaded && activeJobId ? ["loaded-job", activeJobId] : null,
    fetcher,
    {
      refreshInterval: 5000,
      revalidateOnFocus: false,
      onError: (err) => {
        console.log(err);
      },
    },
  );
  const showSnackbar = useSnackbar();

  const handleUnloadJob = async () => {
    try {
      const unload = await assetsApi.setAssetValuesByPath(
        `${loaderData.work_center.code}.Job Lifecycle`,
        { value: "unload" },
      );

      setLoader({
        isLoaded: false,
        id: "",
      });

      setLoaderData(INITIAL_LOADER_DATA);

      setOpen(false);
      showSnackbar("Job unloaded successfully", "success");
    } catch (error: any) {
      console.log(error);
      showSnackbar(error.response.data.message, "error");
    }
  };

  const handleCompletedJob = async () => {
    try {
      const isCompleted = await assetsApi.getAssetValuesByPath(
        `${loaderData.work_center.code}.Job Progress`,
      );
      const progressValue = isCompleted.matches[0]?.value;
      const nextProgress =
        typeof progressValue === "number" ? progressValue : 0;

      setProgress(nextProgress);
      const isReached = nextProgress <= 100;

      if (isReached) {
        setOpenAlert(true);
        setOpen(false);
        return;
      }

      const res = await assetsApi.setAssetValuesBatch({
        items: [
          {
            path: `${loaderData.work_center.code}.Job Lifecycle`,
            value: "complete",
          },
        ],
      });

      const complete = await commonApi.jobOffsetPrinterTaiyoControllerComplete(
        loaderData.id,
      );

      await assetsApi.setAssetValuesByPath(
        `${loaderData.work_center.code}.Job Loader`,
        { value: {} },
      );

      setLoader({
        isLoaded: false,
        id: "",
      });
      setLoaderData(INITIAL_LOADER_DATA);
      mutate();
      setOpen(false); 
      setOpenAlert(false);

      showSnackbar("Job completed successfully", "success");
    } catch (error: any) {
      console.log(error);
      showSnackbar(error.response.data.message, "error");
    }
  };

  const runningEventPattern =
    loader.isLoaded && loaderData.work_center.code && loaderData.work_order
      ? `${loaderData.work_center.code}/Job/${loaderData.work_order}/Lifecycle/Run`
      : null;

  React.useEffect(() => {
    const getLoadedJob = async () => {
      if (!runningEventPattern) {
        setData({
          count: 0,
          total: 0,
          rows: [],
        });
        return;
      }

      try {
        const res = await assetsApi.queryEvents({
          pattern: runningEventPattern,
          status: "open",
        });
        setData(res);
      } catch (error) {
        console.log(error);
      }
    };

    getLoadedJob();
  }, [loadedDataAtom, runningEventPattern]);

  if (!loader.isLoaded && !loader.id) {
    return (
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          borderRadius: 2,
          height: "100%",
          bgcolor: "grey.200",
          minWidth: 300,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 1 }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <AssignmentIcon sx={{ color: "success.main", fontSize: 20 }} />
            <Typography variant="subtitle2" fontWeight="700">
              Currently Loaded Job
            </Typography>
          </Stack>
          <GenericChips value="Offline" />
        </Stack>

        <Box
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="body1" color="text.secondary">
            No active job at the moment.
          </Typography>
        </Box>
      </Paper>
    );
  }

  return (
    <>
      <Paper
        variant="outlined"
        sx={{ p: 2, borderRadius: 2, height: "100%", minWidth: 300 }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 1 }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <AssignmentIcon sx={{ color: "success.main", fontSize: 20 }} />
            <Typography variant="subtitle2" fontWeight="700">
              Currently Loaded Job
            </Typography>
          </Stack>
          <GenericChips
            value={
              loader.isLoaded
                ? loaderData.job_lifecycle_state.label
                : "No Activity"
            }
          />
        </Stack>

        {/* <Typography variant="body2">
          <strong> Work Order: </strong>
          {loaderData.work_order}
        </Typography> */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography variant="caption">Note:</Typography>
          <TextField
            size="small"
            label="On Start"
            fullWidth
            multiline
            rows={2}
            value={data.rows[0]?.notes_on_open || "-"}
            sx={{
              "& textarea": {
                overflow: "auto",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              },
              "& textarea::-webkit-scrollbar": {
                display: "none",
              },
            }}
            slotProps={{
              input: {
                sx: { fontSize: "0.9em" },
                readOnly: true,
              },
            }}
          />

          <TextField
            size="small"
            label="Quantity Order"
            fullWidth
            value={
              `${loaderData.quantity_order} ${loaderData.quantity_unit.label}` ||
              "-"
            }
            sx={{
              "& textarea": {
                overflow: "auto",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              },
              "& textarea::-webkit-scrollbar": {
                display: "none",
              },
            }}
            slotProps={{
              input: {
                sx: { fontSize: "0.9em" },
                readOnly: true,
              },
            }}
          />
        </Box>

        <Stack direction="column" sx={{ my: 2 }}>
          <Typography variant="subtitle2" sx={{ color: "grey", lineHeight: 1 }}>
            Quantity Order:
          </Typography>
          <Typography fontWeight="700">{`${loaderData.quantity_order} ${loaderData.quantity_unit.label}`}</Typography>
        </Stack>
        <Stack direction="column">
          <Typography variant="subtitle2" sx={{ color: "grey", lineHeight: 1 }}>
            Start Time:
          </Typography>
          <Typography fontWeight="700">
            {formatDateTime(data.rows[0]?.start_ts)}
          </Typography>
        </Stack>

        <Stack direction="column" spacing={1} sx={{ mt: 2 }}>
          {/* <Button
            fullWidth
            variant="outlined"
            color="warning"
            startIcon={<FileUploadOutlinedIcon />}
            onClick={() => {
              setOpen(true);
              setDialogType("unload");
            }}
          >
            Unload
          </Button> */}
          <Button
            fullWidth
            variant="contained"
            color="success"
            startIcon={<VerifiedIcon sx={{ color: "common.white" }} />}
            onClick={() => setOpen(true)}
          >
            Complete
          </Button>
          <Collapse in={openAlert}>
            <Alert
              severity="error"
              variant="filled"
              sx={{ maxWidth: "270px" }}
              onClose={() => {
                setOpenAlert(false);
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                  lineHeight: 1.5,
                }}
              >
                Your targer production is not reached. Current progress:{" "}
                {progress}%
              </Typography>
            </Alert>
          </Collapse>
        </Stack>
      </Paper>

      <GenericDialog
        open={open}
        onClose={() => {
          setOpen(false);
          setDialogType(null);
        }}
        title={dialogType === "unload" ? "Unload Job" : "Complete Job"}
        content={
          dialogType === "unload"
            ? "Are you sure you want to unload this job?"
            : "Are you sure you want to complete this job?"
        }
        positiveText={dialogType === "unload" ? "Unload" : "Complete"}
        onConfirm={
          dialogType === "unload" ? handleUnloadJob : handleCompletedJob
        }
        onRefresh={() => {}}
      />
    </>
  );
};

export default CurrentLoadedJobCard;
