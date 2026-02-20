import AnalyticCard from "@/components/card/AnalyticCard";
import { Box, Grid } from "@mui/material";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import VerifiedIcon from "@mui/icons-material/Verified";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import * as React from "react";
import JobTableManagement from "@/components/table/job/JobTable";
import SummaryAnalyticView from "@/components/view/pages/ppic/SummaryAnalyticView";

const JobReportsPage = () => {
  return (
    <Box>
      <SummaryAnalyticView />
      <JobTableManagement />
    </Box>
  );
};

export default JobReportsPage;
