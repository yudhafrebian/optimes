"use client";
import { Button, Paper, Stack, Typography } from "@mui/material";
import ConstructionIcon from "@mui/icons-material/Construction";
import PauseIcon from "@mui/icons-material/Pause";
import * as React from "react";
import { ProductionIcon } from "./CurrentActiveEvent";
import { useAtom } from "jotai";
import {
  eventAtom,
  getEventBgColor,
  getEventSubColor,
} from "@/atoms/event.atom";

interface IEventActionCardProps {}

const EventActionCard: React.FunctionComponent<IEventActionCardProps> = (
  props,
) => {
  const [event, setEvent] = useAtom(eventAtom);

  console.log("EventActionCard event:", event);

  const handleEvent = (name: "Production" | "Setup" | "Idle") => {
    setEvent({
      name,
      bgColor: getEventBgColor(name),
      subColor: getEventSubColor(name),
    });
  };

  return (
    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, height: "100%" }}>
      <Typography variant="subtitle1" fontWeight="700">
        Event Actions
      </Typography>
      <Stack sx={{ mt: 2 }}>
        <Button
          startIcon={<ConstructionIcon />}
          variant="contained"
          color="primary"
          sx={{ mb: 1 }}
          onClick={() => handleEvent("Setup")}
        >
          Create Setup Event
        </Button>
        <Button
          startIcon={
            <ProductionIcon
              fontSize={16}
              top={8}
              left={12}
              width={24}
              height={24}
            />
          }
          variant="contained"
          color="success"
          sx={{ mb: 1 }}
          onClick={() => handleEvent("Production")}
        >
          Create Production Event
        </Button>
        <Button
          startIcon={<PauseIcon />}
          variant="contained"
          color="warning"
          onClick={() => handleEvent("Idle")}
        >
          Create Idle Event
        </Button>
      </Stack>
    </Paper>
  );
};

export default EventActionCard;
