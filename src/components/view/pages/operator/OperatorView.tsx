"use client";
import { Grid, Paper } from "@mui/material";
import * as React from "react";
import EventHistoryModule from "./EventHistory";
import EventPalleteModule from "./EventPalette";

const OperatorView = () => {
  return (
    <Paper sx={{ p: 2 }}>
      {/* <Alert severity="error" onClose={() => {}} sx={{ mb: 2 }}>Operator</Alert> */}
      <Grid container spacing={2}>
        <Grid size={5}>
          <EventHistoryModule />
        </Grid>

        <Grid size={7}>
          <EventPalleteModule />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default OperatorView;
