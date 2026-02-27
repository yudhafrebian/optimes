"use client";

import {
  alpha,
  Autocomplete,
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { ExecutionHistoryRowData } from "@/interface/row-table.interface";

interface EnhancedTableToolbarProps {
  data: ExecutionHistoryRowData[];
  activityFilter: string;
  statusFilter: string;
  periodFilter: string;
  onFilterActivity: (value: string) => void;
  onFilterStatus: (value: string) => void;
  onFilterPeriod: (value: string) => void;
  onRefresh: () => void;
}

const periodOptions = [
  { label: "Today", value: "Today" },
  { label: "This Week", value: "This Week" },
  { label: "This Month", value: "This Month" },
];

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const {
    data,
    onRefresh,
    activityFilter,
    statusFilter,
    periodFilter,
    onFilterActivity,
    onFilterStatus,
    onFilterPeriod,
  } = props;

  const activityOptions: { label: string; value: string }[] = [
    { label: "All Activity", value: "All" },
    ...Array.from(
      new Set(data.map((row) => row.event_path.split("/").slice(-1)[0] || "-")),
    ).map((activity: string) => ({
      label: activity,
      value: activity,
    })),
  ];

  const statusOptions: { label: string; value: string }[] = [
    { label: "All Status", value: "All" },
    ...Array.from(new Set(data.map((row) => row.status))).map(
      (status: string) => ({
        label: status,
        value: status,
      }),
    ),
  ];

  const isFiltered =
    activityFilter !== "All" || statusFilter !== "All" || periodFilter !== "All";

  const handleReset = () => {
    onFilterActivity("All");
    onFilterStatus("All");
    onFilterPeriod("All");
  };

  return (
    <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          marginTop: 2,
        }}
      >
        <Typography variant="h5" fontWeight={500}>
          Job Execution History
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "nowrap",
            gap: 2,
            alignItems: "center",
            width: "100%",
            p: 2,
            overflowX: "auto",
          }}
        >
          {/* <Autocomplete<{ label: string; value: string }, false, false, false>
            disablePortal
            size="small"
            value={
              activityOptions.find((option) => option.value === activityFilter) ??
              null
            }
            onChange={(_, newValue) => onFilterActivity(newValue?.value ?? "All")}
            options={activityOptions}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            sx={{ minWidth: 300 }}
            renderInput={(params) => <TextField {...params} label="Activity" />}
          /> */}

          <Autocomplete<{ label: string; value: string }, false, false, false>
            disablePortal
            size="small"
            value={
              statusOptions.find((option) => option.value === statusFilter) ?? null
            }
            onChange={(_, newValue) => onFilterStatus(newValue?.value ?? "All")}
            options={statusOptions}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            sx={{ minWidth: 220 }}
            renderInput={(params) => <TextField {...params} label="Status" />}
          />

          <FormControl size="small" sx={{ minWidth: 220 }}>
            <InputLabel id="filter-period-label">Period</InputLabel>
            <Select
              labelId="filter-period-label"
              label="Period"
              value={periodFilter}
              onChange={(e) => onFilterPeriod(e.target.value)}
            >
              <MenuItem value="All">All Period</MenuItem>
              {periodOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {isFiltered && (
            <Tooltip title="Reset Filters">
              <IconButton
                onClick={handleReset}
                color="error"
                sx={{
                  bgcolor: (theme) => alpha(theme.palette.error.main, 0.1),
                  flex: "0 0 auto",
                }}
              >
                <RestartAltIcon />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title="Refresh Data">
            <IconButton
              onClick={onRefresh}
              color="primary"
              sx={{ border: "1px solid", borderColor: "divider" }}
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Toolbar>
  );
}

export default EnhancedTableToolbar;
