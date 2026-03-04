"use client";
import { Grid, Paper } from "@mui/material";
import * as React from "react";
import EventHistoryModule from "./EventHistory";
import EventPalleteModule from "./EventPalette";

const OperatorView = () => {
  const [historyRefreshKey, setHistoryRefreshKey] = React.useState(0);

  const handleRefreshHistory = React.useCallback(() => {
    setHistoryRefreshKey((prev) => prev + 1);
  }, []);

  return (
    <Paper sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, lg: 5 }}>
          <EventHistoryModule refreshKey={historyRefreshKey} />
        </Grid>

        <Grid size={{ xs: 12, lg: 7 }}>
          <EventPalleteModule onRefresh={handleRefreshHistory} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default OperatorView;
