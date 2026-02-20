"use client";
import AnalyticCard from "@/components/card/AnalyticCard";
import { Grid } from "@mui/material";
import * as React from "react";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import VerifiedIcon from "@mui/icons-material/Verified";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";

import { accountsApi, jobsApi } from "@/lib/api";
import useSWR from "swr";

const SummaryAnalyticView = () => {
  const fetcher = () => jobsApi.jobOffsetPrinterTaiyoControllerGetDashboard().then(res => res.data);

  const { data, error, isLoading } = useSWR("dashboard-accounts", fetcher, {
    refreshInterval: 5000,
    revalidateOnFocus: true
  });

  return (
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid size={2.4}>
          <AnalyticCard
            title="Scheduled"
            value={isLoading ? "..." : data?.scheduled || 0}
            icon={<EventAvailableIcon fontSize="large" />}
            iconColor="default.main"
          />
        </Grid>

        <Grid size={2.4}>
          <AnalyticCard
            title="Released"
            value={isLoading ? "..." : data?.released || 0}
            icon={<PlayCircleOutlineIcon fontSize="large" />}
            iconColor="primary.main"
            iconBackgroundColor="primary.light"
          />
        </Grid>

        <Grid size={2.4}>
          <AnalyticCard
            title="Running"
            value={isLoading ? "..." : data?.running || 0}
            icon={<SettingsIcon fontSize="large" />}
            iconColor="success.main"
            iconBackgroundColor="success.light"
          />
        </Grid>
        <Grid size={2.4}>
          <AnalyticCard
            title="Completed"
            value={isLoading ? "..." : data?.completed || 0}
            icon={<VerifiedIcon fontSize="large" />}
            iconColor="secondary.main"
            iconBackgroundColor="secondary.light"
          />
        </Grid>
        <Grid size={2.4}>
          <AnalyticCard
            title="Suspended"
            value={isLoading ? "..." : data?.suspended || 0}
            icon={<PauseCircleOutlineIcon fontSize="large" />}
            iconColor="warning.main"
            iconBackgroundColor="warning.light"
          />
        </Grid>
      </Grid>
  );
};

export default SummaryAnalyticView;