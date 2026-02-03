import RegisterForm from "@/form/RegisterForm";
import {
  alpha,
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import GenericModal from "@/components/modal/GenericModal";
import SuccessRegistrationView from "@/components/view/SuccessRegistrationView";
import { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface EnhancedTableToolbarProps {
  numSelected?: number;
  workFilter: string;
  salesFilter: string;
  equipmentFilter: string;
  operator_1Filter: string;
  operator_2Filter: string;
  statusFilter: string;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  onSearch: (value: string) => void;
  onFilterWork: (work: string) => void;
  onFilterSales: (sales: string) => void;
  onFilterEquipment: (equipment: string) => void;
  onFilterOperator_1: (operator_1: string) => void;
  onFilterOperator_2: (operator_1: string) => void;
  onFilterStatus: (status: string) => void;
  onFilterDate: (start: Dayjs | null, end: Dayjs | null) => void;
  onRefresh: () => void;
  onDelete: () => void;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const {
    numSelected,
    onRefresh,
    onFilterWork,
    onFilterSales,
    onFilterEquipment,
    onFilterOperator_1,
    onFilterOperator_2,
    onSearch,
    workFilter,
    salesFilter,
    equipmentFilter,
    operator_1Filter,
    operator_2Filter,
    statusFilter,
    onFilterStatus,
    startDate,
    endDate,
    onFilterDate,
    onDelete,
  } = props;
  const [open, setOpen] = useState<boolean>(false);
  const [step, setStep] = useState<"form" | "success">("form");
  const [userData, setUserData] = useState<any>({});
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleOpen = () => {
    setStep("form");
    setOpen(true);
  };

  const handleSuccess = (data: any) => {
    setUserData(data);
    setStep("success");
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => setStep("form"), 300);
  };

  const isFiltered =
    workFilter !== "All" ||
    salesFilter !== "All" ||
    equipmentFilter !== "All" ||
    operator_1Filter !== "All" ||
    operator_2Filter !== "All" ||
    statusFilter !== "All" ||
    startDate !== null ||
    endDate !== null;

  const handleReset = () => {
    onFilterWork("All");
    onFilterSales("All");
    onFilterEquipment("All");
    onFilterOperator_1("All");
    onFilterOperator_2("All");
    onFilterStatus("All");
    onFilterDate(null, null);
    onSearch("");
  };
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(searchTerm);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, onSearch]);

  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        (numSelected ?? 0) > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity,
            ),
        },
      ]}
    >
      {(numSelected ?? 0) ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Grid container size={12}>
          <Grid size={12}>
            <Box
              sx={{
                p: 2,
                display: "flex",
                gap: 2,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {/* Search Bar */}
              {/* <TextField
                size="small"
                placeholder="Search username..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ flexGrow: 1, minWidth: "100px", maxWidth: "300px" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              /> */}

              <FormControl size="small" sx={{ minWidth: "150px" }}>
                <InputLabel id="work-order-label">Work Order</InputLabel>
                <Select
                  labelId="work-order-label"
                  label="Work Order"
                  defaultValue="All"
                  value={workFilter}
                  onChange={(e) => onFilterWork(e.target.value)}
                >
                  <MenuItem value="All">All Work Order</MenuItem>
                  <MenuItem value="WO-20260112">WO-20260112</MenuItem>
                  <MenuItem value="WO-20260113"> WO-20260113</MenuItem>
                  <MenuItem value="WO-20260114">WO-20260114</MenuItem>
                  <MenuItem value="WO-20260115">WO-20260115</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: "150px" }}>
                <InputLabel id="sales-order-label">Sales Order</InputLabel>
                <Select
                  labelId="sales-order-label"
                  label="Sales Order"
                  defaultValue="All"
                  value={salesFilter}
                  onChange={(e) => onFilterSales(e.target.value)}
                >
                  <MenuItem value="All">All Sales Order</MenuItem>
                  <MenuItem value="SO-20260112">SO-20260112</MenuItem>
                  <MenuItem value="SO-20260113"> SO-20260113</MenuItem>
                  <MenuItem value="SO-20260114">SO-20260114</MenuItem>
                  <MenuItem value="SO-20260115">SO-20260115</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: "150px" }}>
                <InputLabel id="equipment-label">Equipment</InputLabel>
                <Select
                  labelId="equipment-label"
                  label="Equipment"
                  defaultValue="All"
                  value={equipmentFilter}
                  onChange={(e) => onFilterEquipment(e.target.value)}
                >
                  <MenuItem value="All">All Equipment</MenuItem>
                  <MenuItem value="offset-printer-1">Offset Printer 1</MenuItem>
                  <MenuItem value="offset-printer-2">Offset Printer 2</MenuItem>
                  <MenuItem value="offset-printer-3">Offset Printer 3</MenuItem>
                  <MenuItem value="offset-printer-4">Offset Printer 4</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: "150px" }}>
                <InputLabel id="filter-status-label">Status</InputLabel>
                <Select
                  labelId="filter-status-label"
                  label="Status"
                  value={statusFilter}
                  onChange={(e) => onFilterStatus(e.target.value)}
                >
                  <MenuItem value="All">All Status</MenuItem>
                  <MenuItem value="scheduled">Scheduled</MenuItem>
                  <MenuItem value="released">Released</MenuItem>
                  <MenuItem value="running">Running</MenuItem>
                  <MenuItem value="suspended">Suspended</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                  <MenuItem value="cancelled">Cancelled</MenuItem>
                  <MenuItem value="closed">Closed</MenuItem>
                </Select>
              </FormControl>

              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={(newValue) => onFilterDate(newValue, endDate)}
                  slotProps={{
                    textField: { size: "small", sx: { width: 170 } },
                  }}
                />
                <Typography variant="body2">to</Typography>
                <DatePicker
                  label="End Date"
                  value={endDate}
                  minDate={startDate || undefined}
                  onChange={(newValue) => onFilterDate(startDate, newValue)}
                  slotProps={{
                    textField: { size: "small", sx: { width: 170 } },
                  }}
                />
              </Box>

              <FormControl size="small" sx={{ minWidth: "150px" }}>
                <InputLabel id="operator-1-label">Operator 1</InputLabel>
                <Select
                  labelId="operator-1-label"
                  label="Operator 1"
                  defaultValue="All"
                  value={operator_1Filter}
                  onChange={(e) => onFilterOperator_1(e.target.value)}
                >
                  <MenuItem value="All">All Operator 1</MenuItem>
                  <MenuItem value="Jack Smith">Jack Smith</MenuItem>
                  <MenuItem value="John Doe">John Doe</MenuItem>
                  <MenuItem value="Jane Doe">Jane Doe</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: "150px" }}>
                <InputLabel id="operator-2-label">Operator 2</InputLabel>
                <Select
                  labelId="operator-2-label"
                  label="Operator 2"
                  defaultValue="All"
                  value={operator_2Filter}
                  onChange={(e) => onFilterOperator_2(e.target.value)}
                >
                  <MenuItem value="All">All Operator 2</MenuItem>
                  <MenuItem value="Jack Smith">Jack Smith</MenuItem>
                  <MenuItem value="John Doe">John Doe</MenuItem>
                  <MenuItem value="Jane Doe">Jane Doe</MenuItem>
                </Select>
              </FormControl>

              {isFiltered && (
                <Tooltip title="Reset Filters">
                  <IconButton
                    onClick={handleReset}
                    color="error"
                    sx={{
                      bgcolor: (theme) => alpha(theme.palette.error.main, 0.1),
                      "&:hover": {
                        bgcolor: (theme) =>
                          alpha(theme.palette.error.main, 0.2),
                      },
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
                  sx={{
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpen}
              >
                Add Account
              </Button>
            </Box>
          </Grid>
        </Grid>
      )}
      {(numSelected ?? 0) > 0 && (
        <Tooltip title="Delete">
          <IconButton onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}

      <GenericModal
        open={open}
        onClose={handleClose}
        title={
          step === "form"
            ? "Create New Account"
            : "Account Created Successfully"
        }
        maxWidth={step === "form" ? 550 : 500}
      >
        {step === "form" ? (
          <RegisterForm
            onSuccess={(data) => {
              handleSuccess(data);
              onRefresh();
            }}
            onCancel={handleClose}
          />
        ) : (
          <SuccessRegistrationView data={userData} onClose={handleClose} />
        )}
      </GenericModal>
    </Toolbar>
  );
}

export default EnhancedTableToolbar;
