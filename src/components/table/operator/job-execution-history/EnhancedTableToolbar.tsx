"use client";

import {
  alpha,
  Autocomplete,
  Box,
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
import { useState } from "react";
import { ExecutionHistoryRowData } from "@/interface/row-table.interface";
import { commonApi } from "@/lib/api";
import { useAtom } from "jotai";
import workCenterAtom from "@/atoms/wc.atom";
import useSWR from "swr";

interface EnhancedTableToolbarProps {
  data: ExecutionHistoryRowData[];
  workOrderFilter: string;
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
    workOrderFilter,
    statusFilter,
    periodFilter,
    onFilterActivity,
    onFilterStatus,
    onFilterPeriod,
  } = props;
  const [filterDrawerOpen, setFilterDrawerOpen] = useState<boolean>(false);

  const [workCenter] = useAtom(workCenterAtom);

  const fetcher = () =>
    commonApi
      .jobOffsetPrinterTaiyoControllerGetAll({ work_center: workCenter })
      .then((res) => res);

  const { data: workOrder } = useSWR("workOrder", fetcher);

  const statusOptions: { label: string; value: string }[] = [
    { label: "All Status", value: "All" },
    { label: "Open", value: "open" },
    { label: "Closed", value: "closed" },
  ];

  const isFiltered =
    workOrderFilter !== "All" ||
    statusFilter !== "All" ||
    periodFilter !== "All";

  const handleReset = () => {
    onFilterActivity("All");
    onFilterStatus("All");
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
          Job Execution History
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
          {/* <Autocomplete<{ label: string; value: string }, false, false, false>
            disablePortal
            size="small"
            value={
              workOrder?.find(
                (option) => option.work_order === workOrderFilter,
              ) ?? null
            }
            onChange={(_, newValue) =>
              onFilterActivity(newValue?.value ?? "All")
            }
            options={workOrder?.map((option) => ({
              label: option.work_order,
              value: option.work_order,
            }))}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            sx={{ minWidth: 300 }}
            renderInput={(params) => <TextField {...params} label="Activity" />}
          /> */}

          {/* <Autocomplete<{ label: string; value: string }, false, false, false>
            disablePortal
            size="small"
            value={
              statusOptions.find((option) => option.value === statusFilter) ??
              null
            }
            onChange={(_, newValue) => onFilterStatus(newValue?.value ?? "All")}
            options={statusOptions}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            sx={{ minWidth: 220 }}
            renderInput={(params) => <TextField {...params} label="Status" />}
          /> */}

          <FormControl size="small" sx={{ minWidth: 220 }}>
            <InputLabel id="filter-status-label">Status</InputLabel>
            <Select
              labelId="filter-status-label"
              label="Period"
              value={periodFilter}
              onChange={(e) => onFilterStatus(e.target.value)}
            >
              {statusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

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
        <Box
          sx={{ gap: 1.5, mt: 1, mb: 1, display: { xs: "flex", md: "none" } }}
        >
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
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, minmax(0, 1fr))",
              },
              gap: 1.5,
            }}
          >
            <Autocomplete<{ label: string; value: string }, false, false, false>
              disablePortal
              size="small"
              value={
                statusOptions.find((option) => option.value === statusFilter) ??
                null
              }
              onChange={(_, newValue) =>
                onFilterStatus(newValue?.value ?? "All")
              }
              options={statusOptions}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, value) =>
                option.value === value.value
              }
              renderInput={(params) => <TextField {...params} label="Status" />}
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
                {periodOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
            <IconButton
              onClick={handleReset}
              color="error"
              disabled={!isFiltered}
              sx={{ bgcolor: (theme) => alpha(theme.palette.error.main, 0.1) }}
            >
              <RestartAltIcon />
            </IconButton>
            <Box sx={{ flexGrow: 1 }} />
            <Typography
              component="button"
              onClick={() => setFilterDrawerOpen(false)}
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
                font: "inherit",
              }}
            >
              Close
            </Typography>
          </Box>
        </Box>
      </Drawer>
    </Toolbar>
  );
}

export default EnhancedTableToolbar;
