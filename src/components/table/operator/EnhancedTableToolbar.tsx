"use client";

import {
  alpha,
  Autocomplete,
  Box,
  Button,
  Drawer,
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
import FilterListIcon from "@mui/icons-material/FilterList";
import { OperatorRowData } from "@/interface/row-table.interface";
import { useState } from "react";

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
  const [filterDrawerOpen, setFilterDrawerOpen] = useState<boolean>(false);

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
    onFilterPeriod("All");
  };


  return (
    <Toolbar
      sx={{
        pl: { xs: 1, sm: 2 },
        pr: { xs: 1, sm: 1 },
        alignItems: "flex-start",
      }}
    >
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
            display: { xs: "none", md: "flex" },
            flexWrap: "nowrap",
            gap: 2,
            alignItems: "center",
            width: "100%",
            p: { xs: 0, sm: 2 },
            pt: { xs: 1, sm: 2 },
            pb: { xs: 1, sm: 2 },
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
            sx={{
              minWidth: { md: 150 },
              width: { md: 220 },
              flex: "0 0 auto",
            }}
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
            sx={{
              minWidth: { md: 150 },
              width: { md: 220 },
              flex: "0 0 auto",
            }}
            renderInput={(params) => (
              <TextField {...params} label="Sales Order" />
            )}
          />

          <FormControl
            size="small"
            sx={{
              minWidth: { md: 150 },
              width: { md: 220 },
            }}
          >
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
        <Box sx={{ gap: 1.5, mt: 1, mb: 1, display: { xs: "flex", md: "none" } }}>
          <Tooltip title="Filter">
            <IconButton
              onClick={() => setFilterDrawerOpen(true)}
              color={isFiltered ? "primary" : "default"}
              sx={{
                border: "1px solid",
                borderColor: "divider",
                width: 40,
                height: 40,
              }}
            >
              <FilterListIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Refresh Data">
            <IconButton
              onClick={onRefresh}
              color="primary"
              sx={{
                border: "1px solid",
                borderColor: "divider",
                width: 40,
                height: 40,
              }}
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Drawer
        anchor="bottom"
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        PaperProps={{
          sx: {
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            p: 2,
            pb: 3,
          },
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 680, mx: "auto" }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Filters
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
              gap: 1.5,
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
              onChange={(_, newValue) => onFilterWorkOrder(newValue?.value ?? "")}
              options={workOrderOptions}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, value) =>
                option.value === value.value
              }
              renderInput={(params) => <TextField {...params} label="Work Order" />}
            />
            <Autocomplete<{ label: string; value: string }, false, false, false>
              disablePortal
              size="small"
              value={
                salesOrderOptions.find(
                  (option) => option.value === salesOrderFilter,
                ) ?? null
              }
              onChange={(_, newValue) => onFilterSalesOrder(newValue?.value ?? "")}
              options={salesOrderOptions}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, value) =>
                option.value === value.value
              }
              renderInput={(params) => <TextField {...params} label="Sales Order" />}
            />
            <FormControl size="small">
              <InputLabel id="mobile-filter-period-label">Period</InputLabel>
              <Select
                labelId="mobile-filter-period-label"
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
          </Box>
          <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              color="inherit"
              onClick={() => setFilterDrawerOpen(false)}
            >
              Close
            </Button>
            <Button
              fullWidth
              variant="outlined"
              color="error"
              onClick={handleReset}
              disabled={!isFiltered}
            >
              Reset
            </Button>
          </Box>
        </Box>
      </Drawer>

    </Toolbar>
  );
}

export default EnhancedTableToolbar;
