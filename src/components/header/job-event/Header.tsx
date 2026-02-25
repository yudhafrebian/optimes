"use client";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Grid,
  Box,
  Collapse,
  Button,
} from "@mui/material";
import * as React from "react";
import MachineInfoCard from "../job-execution/MachineInfo";
import CurrentActiveEventCard from "./CurrentActiveEvent";
import EventActionCard from "./EventAction";
import { useAtom } from "jotai";
import expandedAtom from "@/atoms/expanded.atom";

export default function JobEventHeader() {
  const [isExpanded, setIsExpanded] = useAtom(expandedAtom)

  console.log(isExpanded)

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Box
      sx={{
        mb: 4,
        bgcolor: "#fff",
        pt: 2,
        px: 2,
        width: "100%",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Collapse in={isExpanded} timeout="auto" collapsedSize={100}>
        <Grid container spacing={3}>
          <Grid size={4}>
            <MachineInfoCard isExpanded={isExpanded} />
          </Grid>
          <Grid size={4}>
            <CurrentActiveEventCard isExpanded={isExpanded} />
          </Grid>
          <Grid size={4}>
            <EventActionCard isExpanded={isExpanded} />
          </Grid>
        </Grid>
      </Collapse>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 1,
        }}
      >
        <Button
          fullWidth
          size="small"
          variant="text"
          onClick={handleExpandClick}
          aria-label={isExpanded ? "Collapse header" : "Expand header"}
          endIcon={isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        >
          {isExpanded ? "Show less" : "Expand more"}
        </Button>
      </Box>
    </Box>
  );
}
