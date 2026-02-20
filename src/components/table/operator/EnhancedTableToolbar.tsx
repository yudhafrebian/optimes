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
import { OperatorRowData } from "@/interface/row-table.interface";

interface EnhancedTableToolbarProps {
  data: OperatorRowData[];
  workOrderFilter: string;
  salesOrderFilter: string;
  machineFilter: string;
  plannedDateFilter: string;
  periodFilter: string;
  priorityFilter: string;
  onSearch: (value: string) => void;
  onFilterWorkOrder: (workOrder: string) => void;
  onFilterSalesOrder: (salesOrder: string) => void;
  onFilterMachine: (machine: string) => void;
  onFilterPlannedDate: (plannedDate: string) => void;
  onFilterPeriod: (period: string) => void;
  onFilterPriority: (priority: string) => void;
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
    workOrderFilter,
    salesOrderFilter,
    machineFilter,
    plannedDateFilter,
    periodFilter,
    priorityFilter,
    onFilterWorkOrder,
    onFilterSalesOrder,
    onFilterPlannedDate,
    onFilterPeriod,
  } = props;

  const workOrderOptions: { label: string; value: string }[] = [
    { label: "All Work Order", value: "All" },
    ...Array.from(new Set(data.map((row) => row.work_order))).map(
      (workOrder: string) => ({
        label: workOrder,
        value: workOrder,
      }),
    ),
  ];

    const salesOrderOptions: { label: string; value: string }[] = [
    { label: "All Sales Order", value: "All" },
    ...Array.from(new Set(data.map((row) => row.sales_order))).map(
      (salesOrder: string) => ({
        label: salesOrder,
        value: salesOrder,
      }),
    ),
  ];


  const isFiltered =
    workOrderFilter !== "All" ||
    salesOrderFilter !== "All" ||
    machineFilter !== "All" ||
    plannedDateFilter !== "" ||
    periodFilter !== "All" ||
    priorityFilter !== "All";

  const handleReset = () => {
    onFilterWorkOrder("All");
    onFilterSalesOrder("All");
    onFilterPlannedDate("");
    onFilterPeriod("All");; // Reset local search state juga
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
          Job List
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
          <Autocomplete<{ label: string; value: string }, false, false, false>
            disablePortal
            size="small"
            value={
              workOrderOptions.find(
                (option) => option.value === workOrderFilter,
              ) ?? null
            }
            onChange={(e, newValue) => onFilterWorkOrder(newValue?.value ?? "")}
            options={workOrderOptions}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            sx={{ minWidth: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Work Order" />
            )}
          />
          <Autocomplete<{ label: string; value: string }, false, false, false>
            disablePortal
            size="small"
            value={
              salesOrderOptions.find(
                (option) => option.value === salesOrderFilter,
              ) ?? null
            }
            onChange={(e, newValue) =>
              onFilterSalesOrder(newValue?.value ?? "")
            }
            options={salesOrderOptions}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            sx={{ minWidth: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Sales Order" />
            )}
          />

          <FormControl size="small" sx={{ minWidth: 300 }}>
            <InputLabel id="filter-period-label">Period</InputLabel>
            <Select
              labelId="filter-period-label"
              label="Period"
              value={periodFilter}
              onChange={(e) => onFilterPeriod(e.target.value)}
            >
              <MenuItem value="All">All Period</MenuItem>
              {periodOptions.map((l) => (
                <MenuItem key={l.value} value={l.value}>
                  {l.label}
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
