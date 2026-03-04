"use client";
import CurrentLoadedJobCard from "@/components/header/job-execution/CurrentLoadedJob";
import OperatorTable from "@/components/table/operator/OperatorTable";
import { Box } from "@mui/material";
import * as React from "react";

const JobPage = () => {
  return (
    <Box sx={{ display: "flex", gap: 1, width: "100%" }}>
      <CurrentLoadedJobCard />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <OperatorTable />
      </Box>
    </Box>
  );
};

export default JobPage;
