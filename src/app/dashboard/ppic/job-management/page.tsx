import { Box } from "@mui/material";
import * as React from "react";
import JobTableManagement from "@/components/table/job/JobTable";
import SummaryAnalyticView from "@/components/view/pages/ppic/SummaryAnalyticView";

const JobManagementPage = () => {
  return (
    <Box>
      <SummaryAnalyticView />
      <JobTableManagement />
    </Box>
  );
};

export default JobManagementPage;
