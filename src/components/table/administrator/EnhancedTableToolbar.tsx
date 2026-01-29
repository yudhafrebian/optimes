import RegisterForm from "@/form/RegisterForm";
import {
  alpha,
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
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
  numSelected: number;
  roleFilter: string;
  statusFilter: string;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  onSearch: (value: string) => void;
  onFilterRole: (role: string) => void;
  onFilterStatus: (status: string) => void;
  onFilterDate: (start: Dayjs | null, end: Dayjs | null) => void;
  onRefresh: () => void;
  onDelete: () => void;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const {
    numSelected,
    onRefresh,
    onFilterRole,
    onSearch,
    roleFilter,
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
    roleFilter !== "All" ||
    statusFilter !== "All" ||
    startDate !== null ||
    endDate !== null;

  const handleReset = () => {
    onFilterRole("All");
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
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity,
            ),
        },
      ]}
    >
      {numSelected > 0 ? (
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
                <InputLabel id="filter-role-label">Role</InputLabel>
                <Select
                  labelId="filter-role-label"
                  label="Role"
                  defaultValue="All"
                  value={roleFilter}
                  onChange={(e) => onFilterRole(e.target.value)}
                >
                  <MenuItem value="All">All Roles</MenuItem>
                  <MenuItem value="operator">Operator</MenuItem>
                  <MenuItem value="ppic">PPIC</MenuItem>
                  <MenuItem value="maintenance">Maintenance</MenuItem>
                  <MenuItem value="administrator">Administrator</MenuItem>
                  <MenuItem value="maintenance_administrator">
                    Maintenance Administrator
                  </MenuItem>
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
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="disabled">Disabled</MenuItem>
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
      {numSelected > 0 && (
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
