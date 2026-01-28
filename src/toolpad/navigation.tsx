import DashboardIcon from '@mui/icons-material/Dashboard';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
export const navigationByRole = {
  administrator: [
    // { segment: "dashboard/administrator", title: "Dashboard", icon: <DashboardIcon /> },
    {
      segment: "dashboard/administrator/account-management",
      title: "Account Management",
      icon: <ManageAccountsIcon />
    },
  ],
  operator: [
    {
      segment: "dashboard/operator",
      title: "Dashboard",
    },
    {
      segment: "dashboard/operator/job",
      title: "Jobs",
    },
  ],
  ppic: [{ segment: "dashboard/ppic", title: "Dashboard" }],
};
