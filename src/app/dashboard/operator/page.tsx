import { Grid, Paper, Typography } from "@mui/material";
import * as React from "react";

const OperatorPage = () => {
  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      <Grid container size={12} spacing={2}>
        <Grid size={4}>
          <Paper sx={{ p: 2, height: "100%", minHeight: 300 }}>
            <Typography variant="subtitle1" fontWeight="700">
              Material Consumption
            </Typography>
          </Paper>
        </Grid>
        <Grid size={4}>
          <Paper sx={{ p: 2, height: "100%", minHeight: 300 }}>
            <Typography variant="subtitle1" fontWeight="700">
              Current Machine Speed
            </Typography>
          </Paper>
        </Grid>
        <Grid size={4}>
          <Paper sx={{ p: 2, height: "100%", minHeight: 300 }}>
            <Typography variant="subtitle1" fontWeight="700">
              Speed Statistics
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Grid container size={12}>
        <Grid size={6}>
          <Paper sx={{ p: 2, height: "100%", minHeight: 500 }}>
            <Typography variant="subtitle1" fontWeight="700">
              Machine Speed Trend
            </Typography>
          </Paper>
        </Grid>
        <Grid size={6}>
          <Paper sx={{ p: 2, height: "100%", minHeight: 500 }}>
            <Typography variant="subtitle1" fontWeight="700">
              Event Timeline
            </Typography>
          </Paper>
        </Grid>

        <Grid size={6}>
          <Paper sx={{ p: 2, height: "100%", minHeight: 500 }}>
            <Typography variant="subtitle1" fontWeight="700">
              Event Ratio
            </Typography>
          </Paper>
        </Grid>
        <Grid size={6}>
          <Paper sx={{ p: 2, height: "100%", minHeight: 500 }}>
            <Typography variant="subtitle1" fontWeight="700">
              Run & Stop Duration
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default OperatorPage;
