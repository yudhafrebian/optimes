import { Avatar, Box, Grid, Paper, Stack, Typography } from "@mui/material";
import * as React from "react";
import SettingsIcon from "@mui/icons-material/Settings";

interface IMachineInfoCardProps {
  isExpanded: boolean;
}

const MachineInfoCard: React.FunctionComponent<IMachineInfoCardProps> = (
  props,
) => {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: props.isExpanded ? 2 : 1,
        borderRadius: 2,
        height: "100%",
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
        <SettingsIcon sx={{ color: "#1976d2", fontSize: 20 }} />
        <Typography variant="subtitle1" fontWeight="700">
          Machine Information
        </Typography>
      </Stack>

      <Grid container spacing={1}>
        <Grid size={6}>
          <Typography variant="caption" color="text.secondary" display="block">
            Machine Name
          </Typography>
          <Typography variant="body2" fontWeight="700">
            CNC-001
          </Typography>
        </Grid>
        <Grid size={6}>
          <Typography variant="caption" color="text.secondary" display="block">
            Machine ID
          </Typography>
          <Typography variant="body2" fontWeight="700">
            MCH-2026-001
          </Typography>
        </Grid>
        {props.isExpanded ? (
          <>
            <Grid size={6}>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
              >
                Model Number
              </Typography>
              <Typography variant="body2" fontWeight="700">
                DMC-635V
              </Typography>
            </Grid>
            <Grid size={6}>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
              >
                Classification
              </Typography>
              <Typography variant="body2" fontWeight="700">
                CNC Machining
              </Typography>
            </Grid>
            <Grid size={6}>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
              >
                Capability
              </Typography>
              <Typography variant="body2" fontWeight="700">
                5-Axis Milling, High Precision
              </Typography>
            </Grid>
          </>
        ) : null}
      </Grid>

      {props.isExpanded ? (
        <Box sx={{ mt: 2 }}>
          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            sx={{ mb: 1 }}
          >
            Assigned Operators
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar sx={{ width: 24, height: 24, fontSize: "0.75rem" }}>
              JD
            </Avatar>
            <Typography variant="body2" fontWeight="500">
              John Doe, Sarah Chen
            </Typography>
          </Stack>
        </Box>
      ) : null}
    </Paper>
  );
};

export default MachineInfoCard;
