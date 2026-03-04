import { Box } from "@mui/material";
import * as React from "react";
import JobTableManagement from "@/components/table/job/JobTable";
import SummaryAnalyticView from "@/components/view/pages/ppic/SummaryAnalyticView";

const JobReportsPage = () => {
  return (
    <Box sx={{ width: "100%", px: { xs: 1, sm: 0 } }}>
      <SummaryAnalyticView />
      <JobTableManagement />
    </Box>
  );
};

export default JobReportsPage;
