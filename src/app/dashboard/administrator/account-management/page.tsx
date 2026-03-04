import AccountTableManagement from "@/components/table/administrator/AccountTable";
import { Box } from "@mui/material";

import * as React from "react";
import SummaryAnalyticView from "@/components/view/pages/administrator/SummaryAnalyticView";


const AccountPage = () => {
  return (
    <Box sx={{ width: "100%", px: { xs: 1, sm: 0 } }}>
      <SummaryAnalyticView />
      <AccountTableManagement />
    </Box>
  );
};

export default AccountPage;
