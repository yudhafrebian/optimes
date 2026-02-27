import AssignmentIcon from "@mui/icons-material/Assignment";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AssessmentIcon from "@mui/icons-material/Assessment";
import DashboardIcon from '@mui/icons-material/Dashboard';
import HistoryIcon from '@mui/icons-material/History';
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";

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
      segment: "dashboard/operator",
      title: "Dashboard",
      icon: <DashboardIcon />,
    },
    {
      segment: "dashboard/operator/job-execution",
      title: "Jobs Execution",
      icon: <AssignmentIcon />,
    },
    {
      segment: "dashboard/operator/job-history-execution",
      title: "Jobs Execution History",
      icon: <HistoryIcon />,
    },
    {
      segment: "dashboard/operator/job-activity",
      title: "Jobs Activity",
      icon: <AssessmentIcon />,
    }
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
    {
      segment: "dashboard/ppic/work-center-manager",
      title: "Work Center Manager",
      icon: <PrecisionManufacturingIcon />,
    },
  ],
};
