"use client";
import AnalyticCard from "@/components/card/AnalyticCard";
import { Grid } from "@mui/material";
import * as React from "react";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import VerifiedIcon from "@mui/icons-material/Verified";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import { commonApi } from "@/lib/api";
import useSWR from "swr";

const SummaryAnalyticView = () => {
  const fetcher = () => commonApi.jobOffsetPrinterTaiyoControllerGetDashboard().then(res => res);

  const { data, error, isLoading } = useSWR("dashboard-accounts", fetcher, {
    refreshInterval: 5000,
    revalidateOnFocus: true
  });

  return (
      <Grid container spacing={{ xs: 1.5, sm: 2 }} sx={{ mb: 2 }}>
        <Grid size={{ xs: 6, sm: 6, md: 4, lg: 2.4 }}>
          <AnalyticCard
            title="Scheduled"
            value={isLoading ? "..." : data?.scheduled || 0}
            icon={<EventAvailableIcon fontSize="large" />}
            iconColor="default.main"
          />
        </Grid>

        <Grid size={{ xs: 6, sm: 6, md: 4, lg: 2.4 }}>
          <AnalyticCard
            title="Released"
            value={isLoading ? "..." : data?.released || 0}
            icon={<PlayCircleOutlineIcon fontSize="large" />}
            iconColor="primary.main"
            iconBackgroundColor="primary.light"
          />
        </Grid>

        <Grid size={{ xs: 6, sm: 6, md: 4, lg: 2.4 }}>
          <AnalyticCard
            title="Running"
            value={isLoading ? "..." : data?.running || 0}
            icon={<SettingsIcon fontSize="large" />}
            iconColor="secondary.main"
            iconBackgroundColor="secondary.light"
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 6, md: 4, lg: 2.4 }}>
          <AnalyticCard
            title="Completed"
            value={isLoading ? "..." : data?.completed || 0}
            icon={<VerifiedIcon fontSize="large" />}
            iconColor="success.main"
            iconBackgroundColor="success.light"
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 6, md: 4, lg: 2.4 }}>
          <AnalyticCard
            title="Cancelled"
            value={isLoading ? "..." : data?.cancelled || 0}
            icon={<HighlightOffIcon fontSize="large" />}
            iconColor="error.main"
            iconBackgroundColor="error.light"
          />
        </Grid>
      </Grid>
  );
};

export default SummaryAnalyticView;
