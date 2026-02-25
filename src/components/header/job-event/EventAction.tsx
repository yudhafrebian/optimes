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
import GenericDialog from "@/components/dialog/GenericDialog";
import { getEventDialogConfig } from "@/components/dialog/eventDialogConfig";

interface IEventActionCardProps {
  isExpanded: boolean;
}

const EventActionCard: React.FunctionComponent<IEventActionCardProps> = ({
  isExpanded,
}) => {
  const [event, setEvent] = useAtom(eventAtom);
  const [dialogType, setDialogType] = React.useState<
    "Production" | "Setup" | "Idle" | null
  >(null);

  const handleOpenDialog = (name: "Production" | "Setup" | "Idle") => {
    setDialogType(name);
  };

  const handleEvent = (name: "Production" | "Setup" | "Idle") => {
    setEvent({
      name,
      bgColor: getEventBgColor(name),
      subColor: getEventSubColor(name),
    });
  };

  const eventConfig = getEventDialogConfig(dialogType);

  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          p: isExpanded ? 2 : 1,
          borderRadius: 2,
          height: "100%",
        }}
      >
        <Typography variant="subtitle1" fontWeight="700">
          Event Actions
        </Typography>
        <Stack
          direction={isExpanded ? "column" : "row"}
          spacing={1}
          sx={{ mt: 2 }}
        >
          <Button
            startIcon={<ConstructionIcon />}
            size="small"
            variant="contained"
            color="primary"
            sx={{
              mb: isExpanded ? 1 : 0,
              flex: isExpanded ? "unset" : 1,
              minWidth: 0,
            }}
            onClick={() =>handleOpenDialog("Setup")}
            disabled={event.name === "Setup"}
          >
            {isExpanded ? "Create Setup Event" : "Setup"}
          </Button>
          <Button
            size="small"
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
            sx={{
              mb: isExpanded ? 1 : 0,
              flex: isExpanded ? "unset" : 1,
              minWidth: 0,
            }}
            onClick={() => handleOpenDialog("Production")}
            disabled={event.name === "Production"}
          >
            {isExpanded ? "Create Production Event" : "Prod"}
          </Button>
          <Button
            size="small"
            startIcon={<PauseIcon />}
            variant="contained"
            color="warning"
            sx={{
              flex: isExpanded ? "unset" : 1,
              minWidth: 0,
            }}
            onClick={() => handleOpenDialog("Idle")}
            disabled={event.name === "Idle"}
          >
            {isExpanded ? "Create Idle Event" : "Idle"}
          </Button>
        </Stack>
      </Paper>

      <GenericDialog
        open={dialogType !== null}
        onClose={() => setDialogType(null)}
        title={eventConfig.title}
        content={eventConfig.content}
        positiveText={eventConfig.positiveText}
        subContent={eventConfig.subContent}
        negativeText="Cancel"
        onConfirm={() => handleEvent(dialogType!)}
        onRefresh={() => setDialogType(null)}
      />
    </>
  );
};

export default EventActionCard;
