"use client";
import AnalyticCard from "@/components/card/AnalyticCard";
import { Grid } from "@mui/material";
import * as React from "react";
import PersonIcon from "@mui/icons-material/Person";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import PersonAddIcon from "@mui/icons-material/PersonAdd"; 
import EventBusyIcon from "@mui/icons-material/EventBusy"; 
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

import { commonApi } from "@/lib/api";
import useSWR from "swr";

const SummaryAnalyticView = () => {
  const fetcher = () => commonApi.accountControllerGetDashboard().then(res => res);

  const { data, error, isLoading } = useSWR("dashboard-accounts", fetcher, {
    refreshInterval: 5000,
    revalidateOnFocus: true
  });

  return (
    <Grid container spacing={{ xs: 1.5, sm: 2 }} sx={{ mb: 2 }}>
      {/* ROW 1 */}
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <AnalyticCard
          title="Total Accounts"
          value={isLoading ? "..." : data?.total || 0}
          icon={<PersonIcon fontSize="large" />}
          iconColor="primary.main"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <AnalyticCard
          title="Active Account"
          value={isLoading ? "..." : data?.active || 0}
          icon={<HowToRegIcon fontSize="large" />}
          iconColor="success.main"
          iconBackgroundColor="success.light"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <AnalyticCard
          title="Disabled Accounts"
          value={isLoading ? "..." : data?.disabled || 0}
          icon={<PersonOffIcon fontSize="large" />}
          iconColor="error.main"
          iconBackgroundColor="error.light"
        />
      </Grid>

      {/* ROW 2 - Created, Expired, Deleted */}
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <AnalyticCard
          title="Recently Created"
          value={isLoading ? "..." : data?.created || 0}
          icon={<PersonAddIcon fontSize="large" />}
          iconColor="info.main"
          iconBackgroundColor="info.light"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <AnalyticCard
          title="Expired Accounts"
          value={isLoading ? "..." : data?.expired || 0}
          icon={<EventBusyIcon fontSize="large" />}
          iconColor="warning.main"
          iconBackgroundColor="warning.light"
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <AnalyticCard
          title="Deleted Accounts"
          value={isLoading ? "..." : data?.deleted || 0}
          icon={<PersonRemoveIcon fontSize="large" />}
          iconColor="#607d8b"
          iconBackgroundColor="#eceff1"
        />
      </Grid>
    </Grid>
  );
};

export default SummaryAnalyticView;
