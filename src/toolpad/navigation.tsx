import AssignmentIcon from "@mui/icons-material/Assignment";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AssessmentIcon from '@mui/icons-material/Assessment';
import HistoryIcon from '@mui/icons-material/History';

export const navigationByRole = {
  administrator: [
    // { segment: "dashboard/administrator", title: "Dashboard", icon: <DashboardIcon /> },
    {
      segment: "dashboard/administrator/account-management",
      title: "Account Management",
      icon: <ManageAccountsIcon />,
    },
  ],
  operator: [
    {
      segment: "dashboard/operator/job-execution",
      title: "Jobs Execution",
      icon: <AssignmentIcon />,
    },
    {
      segment: "dashboard/operator/job-event",
      title: "Jobs Event",
      icon: <AssessmentIcon />,
    },
    {
      segment: "dashboard/operator/job-event-history",
      title: "Jobs Event History",
      icon: <HistoryIcon />,
    },
  ],
  ppic: [
    {
      segment: "dashboard/ppic/job-management",
      title: "Job Management",
      icon: <AssignmentIcon />,
    },
    {
      segment: "dashboard/ppic/job-reports",
      title: "Job Reports",
      icon: <AssessmentIcon />,
      
    },
  ],
};
