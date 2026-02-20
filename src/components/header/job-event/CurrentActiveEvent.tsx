"use client";
import GenericChips from "@/components/core/GenericChips";
import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import StopIcon from "@mui/icons-material/Stop";
import * as React from "react";
import { useAtom } from "jotai";
import { eventAtom } from "@/atoms/event.atom";
import ConstructionIcon from "@mui/icons-material/Construction";
import PauseIcon from "@mui/icons-material/Pause";

interface ICurrentActiveEventCardProps {}

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

  if (!event.name) {
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
          <Typography variant="subtitle1" fontWeight="700" color="text.secondary">
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
    <Paper
      variant="outlined"
      sx={{ p: 2, borderRadius: 2, height: "100%", bgcolor: `${event.bgColor}` }}
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
        <GenericChips value="Active" variant="filled" />
      </Stack>
      <Stack direction={"column"} spacing={1} my={2} alignItems="center">
        {event.name === "Production" ? (
          <ProductionIcon fontSize={48} />
        ) : event.name === "Setup" ? (
          <ConstructionIcon style={{ fontSize: 48, color: "white" }} />
        ) : (
          <PauseIcon style={{ fontSize: 48, color: "white" }} />
        )}
        <Typography variant="h5" fontWeight="700" color="white">
          {event.name}
        </Typography>
      </Stack>
      <Grid container spacing={1}>
        <Grid size={6}>
          <Stack
            alignItems="center"
            sx={{ bgcolor: event.subColor, p: 1, borderRadius: 1 }}
          >
            <Typography variant="body2" color="white">
              Start Time
            </Typography>
            <Typography variant="h6" color="white">
              13:00:00
            </Typography>
          </Stack>
        </Grid>
        <Grid size={6}>
          <Stack
            alignItems="center"
            sx={{ bgcolor: event.subColor, p: 1, borderRadius: 1 }}
          >
            <Typography variant="body2" color="white">
              Event Duration
            </Typography>
            <Typography variant="h6" color="white">
              2h 30m 20s
            </Typography>
          </Stack>
        </Grid>
      </Grid>
      <Button
        startIcon={<StopIcon />}
        fullWidth
        variant="contained"
        sx={{ mt: 1 }}
        color="error"
        onClick={() => setEvent({ name: null, bgColor: "", subColor: "" })}
      >
        End Event
      </Button>
    </Paper>
  );
};

export default CurrentActiveEventCard;
