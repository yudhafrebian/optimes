import { loadedDataAtom, loaderAtom } from "@/atoms/loader.atom";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PauseIcon from "@mui/icons-material/Pause";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import GenericChips from "../../core/GenericChips";
import { useSnackbar } from "@/hooks/useSnackbar";
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useAtom } from "jotai";
import * as React from "react";
import { assetsApi } from "@/lib/api";
import { OperatorRowData } from "@/interface/row-table.interface";
import { EventsQueryResponse } from "@/api/generated/assets-service";
import dayjs from "dayjs";
import GenericDialog from "@/components/dialog/GenericDialog";
import { formatDateTime } from "@/utils/timeFormater";

interface CurrentLoadedJobCardProps {
  row: OperatorRowData;
  onRefresh: () => void;
}

const CurrentLoadedJobCard: React.FunctionComponent<
  CurrentLoadedJobCardProps
> = ({ row, onRefresh }) => {
  const [loader, setLoader] = useAtom(loaderAtom);
  const [loaderData, setLoaderData] = useAtom(loadedDataAtom);
  const [data, setData] = React.useState<EventsQueryResponse>({
    count: 0,
    total: 0,
    rows: [],
  });
  const [open, setOpen] = React.useState<boolean>(false);

  const showSnackbar = useSnackbar();


  const handleUnloadJob = async () => {
    try {
      console.log(loaderData.work_center.code);
      const unload = await assetsApi.setAssetValuesByPath(
        `${loaderData.work_center.code}.Job Lifecycle`,
        { value: "unload" },
      );

      setLoader({
        isLoaded: false,
        id: "",
      });

      setOpen(false);
      showSnackbar("Job unloaded successfully", "success");
    } catch (error: any) {
      console.log(error);
      showSnackbar(error.response.data.message, "error");
    }
  };

  React.useEffect(() => {
    const getLoadedJob = async () => {
      try {
        const res = await assetsApi.queryEvents({
          pattern: `${loaderData.work_center.code}/Job/${loaderData.work_order}/Lifecycle/Running`,
          status: "open",
        });

        setData(res);
      } catch (error) {
        console.log(error);
      }
    };

    if (loader.isLoaded) {
      getLoadedJob();
    }
  }, [loader.isLoaded]);

  if (!loader.isLoaded && !loader.id) {
    return (
      <Paper
        variant="outlined"
        sx={{ p: 2, borderRadius: 2, height: "100%", bgcolor: "grey.200" }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 1 }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <AssignmentIcon sx={{ color: "success.main", fontSize: 20 }} />
            <Typography variant="subtitle1" fontWeight="700">
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
      <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, height: "100%" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 1 }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <AssignmentIcon sx={{ color: "success.main", fontSize: 20 }} />
            <Typography variant="subtitle1" fontWeight="700">
              Currently Loaded Job
            </Typography>
          </Stack>
          <GenericChips value={loader.isLoaded ? "Loaded" : "No Activity"} />
        </Stack>

        <Typography
          sx={{
            fontWeight: "bold",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
          variant="body2"
        >
          {data.rows[0]?.event_path}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            mt: 2,
          }}
        >
          <TextField
            size="small"
            label="Note on Open"
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
                sx: { fontSize: "0.75em" },
                readOnly: true,
              },
            }}
          />

          <TextField
            size="small"
            label="Note on Close"
            fullWidth
            multiline
            rows={2}
            value={data.rows[0]?.notes_on_close || "-"}
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
                sx: { fontSize: "0.75em" },
                readOnly: true,
              },
            }}
          />
        </Box>

        <Stack direction="column" sx={{ my: 2 }}>
          <Typography>
            <strong>Start Time:</strong>{" "}
            {formatDateTime(data.rows[0]?.start_ts)}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1} sx={{ mt: 5 }}>
          <Button
            fullWidth
            variant="outlined"
            color="warning"
            startIcon={
              loader ? <FileUploadOutlinedIcon /> : <FileDownloadOutlinedIcon />
            }
            onClick={() => setOpen(true)}
          >
            Unload Job
          </Button>
        </Stack>
      </Paper>

      <GenericDialog
        open={open}
        onClose={() => setOpen(false)}
        title="Unload Job"
        content="Are you sure you want to unload this job?"
        positiveText="Unload"
        onConfirm={handleUnloadJob}
        onRefresh={() => {}}
      />
    </>
  );
};

export default CurrentLoadedJobCard;
