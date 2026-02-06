"use client";

import {
  alpha,
  Autocomplete,
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DescriptionIcon from "@mui/icons-material/Description";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import GenericModal from "@/components/modal/GenericModal";
import { lookupApi } from "@/lib/api";
import { LookupResponseDto } from "@/api-client";
import CreateJobForm, {
  CreateJobFormValues,
  defaultJobFormValues,
  priorityOptions,
} from "@/form/CreateJobForm";
import JobConfirmationView from "@/components/view/JobConfirmationView";
import ImportForm from "@/form/ImportForm";
import { useSnackbar } from "@/hooks/useSnackbar";
import { usePathname } from "next/navigation";

interface EnhancedTableToolbarProps {
  workOrderFilter: string;
  salesOrderFilter: string;
  machineFilter: string;
  plannedDateFilter: string;
  lifecycleFilter: string;
  priorityFilter: string;
  onSearch: (value: string) => void;
  onFilterWorkOrder: (workOrder: string) => void;
  onFilterSalesOrder: (salesOrder: string) => void;
  onFilterMachine: (machine: string) => void;
  onFilterPlannedDate: (plannedDate: string) => void;
  onFilterLifecycle: (lifecycle: string) => void;
  onFilterPriority: (priority: string) => void;
  onRefresh: () => void;
}

const workOrderOptions = [
  { label: "All Work Order", value: "All" },
  { label: "WO/2026/02/002", value: "WO/2026/02/002" },
  { label: "WO/2026/02/003", value: "WO/2026/02/003" },
  { label: "WO/2026/02/004", value: "WO/2026/02/004" },
  { label: "WO/2026/02/005", value: "WO/2026/02/005" },
  { label: "WO/2026/02/006", value: "WO/2026/02/006" },
];

const salesOrderOptions = [
  { label: "All Sales Order", value: "All" },
  { label: "SO/MKT/2026/012", value: "SO/MKT/2026/012" },
  { label: "SO/MKT/2026/015", value: "SO/MKT/2026/015" },
  { label: "SO/MKT/2026/020", value: "SO/MKT/2026/020" },
  { label: "SO/MKT/2026/022", value: "SO/MKT/2026/022" },
  { label: "SO/MKT/2026/025", value: "SO/MKT/2026/025" },
];

const lifecycleOptions = [
  { label: "Scheduled", value: "Scheduled" },
  { label: "Running", value: "Running" },
  { label: "Released", value: "Released" },
  { label: "Completed", value: "Completed" },
  { label: "Suspended", value: "Suspended" },
];

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const {
    onRefresh,
    onSearch,
    workOrderFilter,
    salesOrderFilter,
    machineFilter,
    plannedDateFilter,
    lifecycleFilter,
    priorityFilter,
    onFilterWorkOrder,
    onFilterSalesOrder,
    onFilterMachine,
    onFilterPlannedDate,
    onFilterLifecycle,
    onFilterPriority,
  } = props;

  const [open, setOpen] = useState<boolean>(false);
  const [step, setStep] = useState<"form" | "success">("form");
  const [jobData, setJobData] =
    useState<CreateJobFormValues>(defaultJobFormValues);
  const [draftJobData, setDraftJobData] =
    useState<CreateJobFormValues>(defaultJobFormValues);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [machine, setMachine] = useState<LookupResponseDto[]>([]);
  const [importOpen, setImportOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const pathname = usePathname();
  const isJobManagement = pathname.startsWith("/dashboard/ppic/job-management");
  const showSnackbar = useSnackbar();

  const handleOpen = () => {
    setStep("form");
    setOpen(true);
  };

  const handleSuccess = (data: any) => {
    setJobData(data);
    setStep("success");
  };

  const handleClose = () => {
    setOpen(false);
    setDraftJobData(defaultJobFormValues);
    setTimeout(() => setStep("form"), 300);
  };

  const handleBack = () => {
    setStep("form");
  };

  const isFiltered =
    workOrderFilter !== "All" ||
    salesOrderFilter !== "All" ||
    machineFilter !== "All" ||
    plannedDateFilter !== "" ||
    lifecycleFilter !== "All" ||
    priorityFilter !== "All";

  const handleReset = () => {
    onFilterWorkOrder("All");
    onFilterSalesOrder("All");
    onFilterMachine("All");
    onFilterPlannedDate("");
    onFilterLifecycle("All");
    onFilterPriority("All");
    onSearch("");
    setSearchTerm(""); // Reset local search state juga
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(searchTerm);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, onSearch]);

  useEffect(() => {
    const fetchFilter = async () => {
      try {
        const [machinesRes] = await Promise.all([
          lookupApi.lookupControllerFindAll("MACHINE_LIST"),
        ]);
        setMachine(machinesRes.data);
      } catch (error) {
        console.error("Failed to fetch filters:", error);
      }
    };
    fetchFilter();
  }, []);

  const handleImportSubmit = async (file: File) => {
    try {
      setLoading(true);
      showSnackbar("Import started", "info");
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          console.log("Import file:", file);
          resolve();
        }, 1500);
      });
      showSnackbar("Import completed", "success");
      setImportOpen(false);
      onRefresh();
    } catch (error) {
      console.error("Import failed:", error);
      showSnackbar("Import failed", "error");
    } finally {
      setLoading(false);
    }
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
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            marginBottom: 2,
          }}
        >
          <Typography variant="h5" fontWeight={500}>
            Job List
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Tooltip title="Refresh Data">
              <IconButton
                onClick={onRefresh}
                color="primary"
                sx={{ border: "1px solid", borderColor: "divider" }}
              >
                <RefreshIcon />
              </IconButton>
            </Tooltip>
            {isJobManagement && (
              <Button
                variant="contained"
                startIcon={<DescriptionIcon />}
                color="success"
                onClick={() => setImportOpen(true)}
              >
                Import Excel
              </Button>
            )}
            {isJobManagement && (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpen}
              >
                Add Job
              </Button>
            )}
          </Box>
        </Box>
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
            sx={{ minWidth: 150 }}
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
            sx={{ minWidth: 150 }}
            renderInput={(params) => (
              <TextField {...params} label="Sales Order" />
            )}
          />

          <FormControl size="small" sx={{ minWidth: "150px" }}>
            <InputLabel id="filter-machine-label">Machine</InputLabel>
            <Select
              labelId="filter-machine-label"
              label="Machine"
              value={machineFilter}
              onChange={(e) => onFilterMachine(e.target.value)}
            >
              <MenuItem value="All">All Machine</MenuItem>
              {machine.map((t) => (
                <MenuItem key={t.code} value={t.label}>
                  {t.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <DatePicker
            label="Planned Date"
            value={plannedDateFilter ? dayjs(plannedDateFilter) : null}
            onChange={(value) =>
              onFilterPlannedDate(value ? value.format("YYYY-MM-DD") : "")
            }
            slotProps={{
              textField: {
                size: "small",
                sx: { width: 150 },
              },
            }}
          />
          {/* Filter Lifecycle */}
          <FormControl size="small" sx={{ minWidth: "150px" }}>
            <InputLabel id="filter-lifecycle-label">Lifecycle</InputLabel>
            <Select
              labelId="filter-lifecycle-label"
              label="Lifecycle"
              value={lifecycleFilter}
              onChange={(e) => onFilterLifecycle(e.target.value)}
            >
              <MenuItem value="All">All Lifecycle</MenuItem>
              {lifecycleOptions.map((l) => (
                <MenuItem key={l.value} value={l.value}>
                  {l.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* Filter Type */}
          <FormControl size="small" sx={{ minWidth: "150px" }}>
            <InputLabel id="filter-priority-label">Priority</InputLabel>
            <Select
              labelId="filter-priority-label"
              label="Priority"
              value={priorityFilter}
              onChange={(e) => onFilterPriority(e.target.value)}
            >
              <MenuItem value="All">All Priority</MenuItem>
              {priorityOptions.map((t) => (
                <MenuItem key={t.code} value={t.label}>
                  {t.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* Reset Action */}
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
        </Box>
      </Box>

      <GenericModal
        open={open}
        onClose={handleClose}
        title={step === "form" ? "Create Job" : "Create Job Confirmation"}
        maxWidth={step === "form" ? 1000 : 400}
      >
        {step === "form" ? (
          <CreateJobForm
            onCancel={handleClose}
            onSuccess={(data) => {
              handleSuccess(data);
            }}
            initialValues={draftJobData}
            onValuesChange={setDraftJobData}
          />
        ) : (
          <JobConfirmationView
            data={jobData}
            onBack={handleBack}
            onSuccess={() => {
              handleClose();
            }}
            type="create"
          />
        )}
      </GenericModal>

      <GenericModal
        open={importOpen}
        onClose={() => setImportOpen(false)}
        title="Import Job File"
        maxWidth={600}
      >
        {loading && <LinearProgress />}
        <ImportForm
          onSubmit={handleImportSubmit}
          onCancel={() => setImportOpen(false)}
        />
      </GenericModal>
    </Toolbar>
  );
}

export default EnhancedTableToolbar;
