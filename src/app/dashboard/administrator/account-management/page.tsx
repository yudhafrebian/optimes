import AnalyticCard from "@/components/card/AnalyticCard";
import AccountTableManagement from "@/components/table/administrator/AccountTable";
import { Box, Grid, Paper, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import WarningIcon from "@mui/icons-material/Warning";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import * as React from "react";

interface IAccountPageProps {}

const AccountPage: React.FunctionComponent<IAccountPageProps> = (props) => {
  return (
    <Box>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid size={4}>
          <AnalyticCard
            title="Total Accounts"
            value={10}
            icon={<PersonIcon fontSize="large" />}
            iconColor="primary.main"
          />
        </Grid>

        <Grid size={4}>
          <AnalyticCard
            title="Active Account"
            value={12}
            icon={<HowToRegIcon fontSize="large" />}
            iconColor="success.main"
            iconBackgroundColor="success.light"
          />
        </Grid>

        <Grid size={4}>
          <AnalyticCard
            title="Disabled Accounts"
            value={0}
            icon={<PersonOffIcon fontSize="large" />}
            iconColor="error.main"
            iconBackgroundColor="error.light"
          />
        </Grid>
      </Grid>
      <AccountTableManagement />
    </Box>
  );
};

export default AccountPage;
