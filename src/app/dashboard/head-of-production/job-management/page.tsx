"use client";

import * as React from "react";
import { Box} from "@mui/material";
import SummaryAnalyticView from "@/components/view/pages/administrator/SummaryAnalyticView";
import JobTableManagement from "@/components/table/job/JobTable";

const WorkCenterManagerPage = () => {
  return (
    <Box sx={{ width: "100%", px: { xs: 1, sm: 0 } }}>
      <SummaryAnalyticView />
      <JobTableManagement />
    </Box>
  );
};

export default WorkCenterManagerPage;
