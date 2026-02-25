"use client";
import GenericChips from "@/components/core/GenericChips";
import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import StopIcon from "@mui/icons-material/Stop";
import * as React from "react";
import { useAtom } from "jotai";
import { eventAtom } from "@/atoms/event.atom";
import ConstructionIcon from "@mui/icons-material/Construction";
import PauseIcon from "@mui/icons-material/Pause";
import GenericDialog from "@/components/dialog/GenericDialog";

interface ICurrentActiveEventCardProps {
  isExpanded: boolean;
}

interface IProductionIconProps {
  fontSize?: number;
  width?: number;
  height?: number;
  top?: number;
  left?: number;
}

export const ProductionIcon: React.FunctionComponent<IProductionIconProps> = ({
  fontSize = 48,
  width = 80,
  height = 64,
  top = 18,
  left = 35,
}) => (
  <Box sx={{ position: "relative", width, height }}>
    <SettingsIcon
      sx={{
        color: "common.white",
        fontSize,
        position: "absolute",
        left: 0,
        top: 0,
        rotate: `-35deg`,
      }}
    />
    <SettingsIcon
      sx={{
        color: "common.white",
        fontSize,
        position: "absolute",
        left,
        top,
      }}
    />
  </Box>
);

const CurrentActiveEventCard: React.FunctionComponent<
  ICurrentActiveEventCardProps
> = (props) => {
  const [event, setEvent] = useAtom(eventAtom);
  const [open, setOpen] = React.useState<boolean>(false);

  const activeEventRender = () => {
    return event.name === "Production" ? (
      props.isExpanded ? (
        <ProductionIcon fontSize={48} />
      ) : (
        <SettingsIcon
          style={{ fontSize: props.isExpanded ? 48 : 24, color: "white" }}
        />
      )
    ) : event.name === "Setup" ? (
      <ConstructionIcon
        style={{ fontSize: props.isExpanded ? 48 : 24, color: "white" }}
      />
    ) : (
      <PauseIcon
        style={{ fontSize: props.isExpanded ? 48 : 24, color: "white" }}
      />
    );
  };

  if (!event.name) {
    return (
      <Paper
        variant="outlined"
        sx={{
          p: props.isExpanded ? 2 : 1,
          borderRadius: 2,
          height: "100%",
          bgcolor: "grey.200",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 0 }}
        >
          <Typography
            variant="subtitle1"
            fontWeight="700"
            color="text.secondary"
          >
            Current Active Event
          </Typography>
          <GenericChips value="No Active Event" variant="outlined" />
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
            No active event at the moment.
          </Typography>
        </Box>
      </Paper>
    );
  }

  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          p: props.isExpanded ? 2 : 1,
          borderRadius: 2,
          height: props.isExpanded ? "100%" : "100%",
          bgcolor: `${event.bgColor}`,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 1 }}
        >
          <Typography variant="subtitle1" fontWeight="700" color="white">
            Current Active Event
          </Typography>
          {!props.isExpanded ? (
            <Box sx={{ display: "flex", gap: 1 }}>
              {activeEventRender()}
              <Typography variant="body1" fontWeight="700" color="white">
                {event.name}
              </Typography>
            </Box>
          ) : (
            <GenericChips value="Active" variant="filled" />
          )}
        </Stack>
        <Box
          sx={{
            display: "flex",
            flexDirection: props.isExpanded ? "column" : "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1,
          }}
        >
          {props.isExpanded ? (
            <Stack direction="column" spacing={1} my={2} alignItems="center">
              {activeEventRender()}
              <Typography variant="h5" fontWeight="700" color="white">
                {event.name}
              </Typography>
            </Stack>
          ) : null}
          <Grid container size={12} spacing={1}>
            <Grid size={6}>
              <Stack
                alignItems="center"
                sx={{
                  bgcolor: event.subColor,
                  p: props.isExpanded ? 1 : 0.5,
                  borderRadius: 1,
                }}
              >
                <Typography sx={{ fontSize: 12 }} variant="body2" color="white">
                  Start Time
                </Typography>
                <Typography
                  sx={{ fontSize: 12 }}
                  variant={props.isExpanded ? "h6" : "body2"}
                  color="white"
                >
                  13:00:00
                </Typography>
              </Stack>
            </Grid>
            <Grid size={6}>
              <Stack
                alignItems="center"
                sx={{
                  bgcolor: event.subColor,
                  p: props.isExpanded ? 1 : 0.5,
                  borderRadius: 1,
                }}
              >
                <Typography sx={{ fontSize: 12 }} variant="body2" color="white">
                  Event Duration
                </Typography>
                <Typography
                  sx={{ fontSize: 12 }}
                  variant={props.isExpanded ? "h6" : "body2"}
                  color="white"
                >
                  2h 30m 20s
                </Typography>
              </Stack>
            </Grid>
          </Grid>

          <Button
            startIcon={<StopIcon />}
            fullWidth={props.isExpanded}
            variant="contained"
            size="small"
            sx={{ mt: 1 }}
            color="error"
            onClick={() => setOpen(true)}
          >
            {props.isExpanded ? "End Event" : "End"}
          </Button>
        </Box>
      </Paper>

      <GenericDialog
        open={open}
        onClose={() => setOpen(false)}
        title="End Event"
        content="Are you sure you want to end event?"
        positiveText="End"
        onConfirm={() => setEvent({ name: null, bgColor: "", subColor: "" })}
        onRefresh={() => setOpen(false)}
      />
    </>
  );
};

export default CurrentActiveEventCard;
