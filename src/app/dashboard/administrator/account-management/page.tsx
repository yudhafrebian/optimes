import AnalyticCard from "@/components/card/AnalyticCard";
import AccountTableManagement from "@/components/table/administrator/AccountTable";
import { Box, Grid, Paper, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import * as React from "react";

interface IAccountPageProps {}

const AccountPage: React.FunctionComponent<IAccountPageProps> = (props) => {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid size={3}>
          <AnalyticCard title="Total Users" value={10} icon={<PersonIcon fontSize="large" />} />
        </Grid>
      </Grid>
      <AccountTableManagement />
    </Box>
  );
};

export default AccountPage;
