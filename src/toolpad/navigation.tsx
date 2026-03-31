import AssignmentIcon from "@mui/icons-material/Assignment";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AssessmentIcon from "@mui/icons-material/Assessment";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HistoryIcon from "@mui/icons-material/History";
import EventNoteIcon from '@mui/icons-material/EventNote';

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
      segment: "dashboard/operator/job-list",
      title: "Jobs list",
      icon: <AssignmentIcon />,
    },
    {
      segment: "dashboard/operator/job-history-list",
      title: "Jobs list History",
      icon: <HistoryIcon />,
    },
    {
      segment: "dashboard/operator/job-activity",
      title: "Jobs Activity",
      icon: <AssessmentIcon />,
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
  "head-of-production": [
    //     {
    //   segment: "dashboard/head-of-production",
    //   title: "Dashboard",
    //   icon: <DashboardIcon />,
    // },
    {
      segment: "dashboard/head-of-production/job-management",
      title: "Job Management",
      icon: <AssignmentIcon />,
    },
    {
      segment: "dashboard/head-of-production/event-palette-manager",
      title: "Event Palette Manager",
      icon: <EventNoteIcon />,
    },
  ],
};
