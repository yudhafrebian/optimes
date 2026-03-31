"use client";
import GenericChips from "@/components/core/GenericChips";
import { severityColor } from "@/utils/severityColor";
import StopIcon from "@mui/icons-material/Stop";
import DoneIcon from "@mui/icons-material/Done";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";
import GenericDialog from "@/components/dialog/GenericDialog";
import { loadedDataAtom } from "@/atoms/loader.atom";
import { useAtom } from "jotai";
import { assetsApi } from "@/lib/api";
import useSWR from "swr";
import { formatDateTime } from "@/utils/timeFormater";

const formatEventName = (value: string) =>
  value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
    .trim();

interface EventHistoryModuleProps {
  refreshKey?: number;
}

const EventHistoryModule: React.FC<EventHistoryModuleProps> = ({
  refreshKey = 0,
}) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = React.useState<string>("");
  const [loaderData] = useAtom(loadedDataAtom);
  const pattern =
    loaderData.work_center.code && loaderData.work_order
      ? `${loaderData.work_center.code}/Job/${loaderData.work_order}/Activity/*`
      : null;

  const { data, mutate } = useSWR(
    pattern ? ["event-history", pattern] : null,
    async ([, eventPattern]) =>
      assetsApi.queryEvents({
        pattern: eventPattern,
      }),
    {
      refreshInterval: 2000,
      revalidateOnFocus: false,
    },
  );

  React.useEffect(() => {
    mutate();
  }, [mutate, refreshKey]);

  const handleCloseEvent = async (id: string) => {
    try {
      const res = await assetsApi.closeEventById({
        id,
      });

      setOpen(false);
      console.log(res);
      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, height: "100%" }}>
        <Typography variant="h6">Event History</Typography>
        <Divider sx={{ my: 2, mt: 3 }} />
        <Grid container spacing={2} sx={{ maxHeight: 330, overflow: "auto" }}>
          {(data?.rows ?? []).map((event) => {
            const isLifecycle = event.event_path.includes("Lifecycle/Running");
            const isClosed = (event.status ?? "").toLowerCase() === "closed";
            const chipValue = event.event_path.split("/").slice(-2)[0];
            return (
              <Grid key={event.id} size={12}>
                <Card
                  sx={{
                    border: "2px solid",
                    borderColor: isClosed
                      ? "gray"
                      : isLifecycle
                        ? "secondary.main"
                        : severityColor(chipValue, true),
                    bgcolor: isClosed
                      ? "gray"
                      : isLifecycle
                        ? "secondary.main"
                        : severityColor(chipValue),
                  }}
                >
                  <CardContent sx={{ pb: 1, pt: 1 }}>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        {formatEventName(
                          event.event_path.split("/").slice(-1)[0],
                        )}
                      </Typography>
                      <GenericChips
                        value={chipValue}
                        variant="filled"
                        colorMap={
                          isClosed
                            ? { [chipValue.toLowerCase()]: "default" }
                            : undefined
                        }
                      />
                    </Box>
                    <Divider sx={{ my: 1 }} />
                    {/* <Tooltip title={event.event_path} arrow>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                        }}
                        variant="body2"
                      >
                        {event.event_path.trim()}
                      </Typography>
                    </Tooltip> */}
                    <Typography variant="body2">Notes:</Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        gap: 1,
                        justifyContent: "space-between",
                        mt: 2,
                      }}
                    >
                      <TextField
                        size="small"
                        label="On Start"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        multiline
                        rows={2}
                        value={event.notes_on_open}
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
                        fullWidth
                        slotProps={{
                          input: {
                            notched: true,
                            sx: { fontSize: "0.9em" },
                            readOnly: true,
                          },
                        }}
                      />

                      <TextField
                        size="small"
                        label="On Finish"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        multiline
                        rows={2}
                        value={event.notes_on_close || "-"}
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
                        fullWidth
                        slotProps={{
                          input: {
                            notched: true,
                            sx: { fontSize: "0.9em" },
                            readOnly: true,
                          },
                        }}
                      />
                    </Box>
                  </CardContent>
                  <CardActions
                    sx={{
                      justifyContent: "space-between",
                      alignItems: { xs: "flex-start", sm: "end" },
                      flexDirection: { xs: "column", sm: "row" },
                      gap: 1,
                      pt: 1,
                      pb: 1,
                    }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography variant="caption">
                        Start Time: {formatDateTime(event.start_ts)}
                      </Typography>
                      <Typography variant="caption">
                        End Time: {formatDateTime(event.end_ts)}
                      </Typography>
                    </Box>
                    {event.event_path !==
                      `${loaderData.work_center.code}/Job/${loaderData.work_order}/Lifecycle/Running` && (
                      <Button
                        disabled={isClosed}
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => {
                          setOpen(true);
                          setSelectedEvent(event.id);
                        }}
                        startIcon={isClosed ? <DoneIcon /> : <StopIcon />}
                      >
                        {isClosed ? "Finished" : "Finish"}
                      </Button>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Paper>

      <GenericDialog
        title="Finish Event"
        content="Are you sure you want to finish this event?"
        positiveText="Finish"
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => handleCloseEvent(selectedEvent)}
        onRefresh={() => {}}
      />
    </>
  );
};

export default EventHistoryModule;
