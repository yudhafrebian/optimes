"use client";
import GenericChips from "@/components/core/GenericChips";
import { eventLog } from "@/lib/event";
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
  Tooltip,
  Typography,
} from "@mui/material";
import * as React from "react";
import GenericDialog from "@/components/dialog/GenericDialog";

const formatUtcDateTime = (value: string) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  const pad = (num: number) => num.toString().padStart(2, "0");

  return `${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())}, ${pad(date.getUTCDate())}/${pad(date.getUTCMonth() + 1)}/${date.getUTCFullYear()}`;
};

const EventHistoryModule = () => {
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <>
      <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, height: "100%" }}>
        <Typography variant="h6">Event History</Typography>
        <Divider sx={{ my: 2, mt: 3 }} />
        <Grid container spacing={2} sx={{ maxHeight: 460, overflow: "auto" }}>
          {eventLog.map((event) => (
            <Grid key={event.id} size={12}>
              <Card
                sx={{
                  border: "1px solid",
                  borderColor:
                    event.status === "closed"
                      ? "gray"
                      : severityColor(event.severity),
                  borderRight: "10px solid",
                  borderRightColor:
                    event.status === "closed"
                      ? "gray"
                      : severityColor(event.severity),
                }}
              >
                <CardContent sx={{ pb: 1, pt: 1 }}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      {event.activity_label}
                    </Typography>
                    <GenericChips value={event.activity} variant="filled" />
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Tooltip title={event.event_path} arrow>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                      }}
                      variant="body2"
                    >
                      {event.event_path}
                    </Typography>
                  </Tooltip>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 1.5,
                    }}
                  >
                    <TextField
                      size="small"
                      label="Note on Open"
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
                      multiline
                      rows={2}
                      value={event.notes_on_close}
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
                </CardContent>
                <CardActions
                  sx={{
                    justifyContent: "space-between",
                    alignItems: "end",
                    pt: 1,
                    pb: 1,
                  }}
                >
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography variant="caption">
                      Start Time: {formatUtcDateTime(event.start_ts)}
                    </Typography>
                    <Typography variant="caption">
                      End Time: {formatUtcDateTime(event.end_ts)}
                    </Typography>
                  </Box>
                  <Button
                    disabled={event.status === "closed"}
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => setOpen(true)}
                    startIcon={
                      event.status === "closed" ? <DoneIcon /> : <StopIcon />
                    }
                  >
                    {event.status === "closed" ? "Closed" : "Close"}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      <GenericDialog
        title="Close Event"
        content="Are you sure you want to close this event?"
        positiveText="Close"
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
        onRefresh={() => setOpen(false)}
      />
    </>
  );
};

export default EventHistoryModule;
