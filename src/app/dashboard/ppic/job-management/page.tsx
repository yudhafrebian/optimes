import AnalyticCard from "@/components/card/AnalyticCard";
import AccountTableManagement from "@/components/table/administrator/AccountTable";
import { Box, Grid } from "@mui/material";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import VerifiedIcon from "@mui/icons-material/Verified";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import * as React from "react";

const JobManagementPage = () => {
  return (
    <Box>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid size={2.4}>
          <AnalyticCard
            title="Scheduled"
            value={24}
            icon={<EventAvailableIcon fontSize="large" />}
            iconColor="primary.main"
          />
        </Grid>

        <Grid size={2.4}>
          <AnalyticCard
            title="Released"
            value={8}
            icon={<PlayCircleOutlineIcon fontSize="large" />}
            iconColor="warning.main"
            iconBackgroundColor="warning.light"
          />
        </Grid>

        <Grid size={2.4}>
          <AnalyticCard
            title="Running"
            value={12}
            icon={<SettingsIcon fontSize="large" />}
            iconColor="success.main"
            iconBackgroundColor="success.light"
          />
        </Grid>
        <Grid size={2.4}>
          <AnalyticCard
            title="Completed"
            value={156}
            icon={<VerifiedIcon fontSize="large" />}
            iconColor="secondary.main"
            iconBackgroundColor="secondary.light"
          />
        </Grid>
        <Grid size={2.4}>
          <AnalyticCard
            title="Suspended"
            value={3}
            icon={<PauseCircleOutlineIcon fontSize="large" />}
            iconColor="error.main"
            iconBackgroundColor="error.light"
          />
        </Grid>
      </Grid>
      <AccountTableManagement />
    </Box>
  );
};

export default JobManagementPage;
