"use client";

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
} from "@mui/material";
import { useEffect, useState } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import GenericModal from "@/components/modal/GenericModal";
import SuccessRegistrationView from "@/components/view/SuccessRegistrationView";
import { commonApi } from "@/lib/api";
import { LookupResponseDto } from "@/api/generated/common-service";

interface EnhancedTableToolbarProps {
  // numSelected dihapus karena fitur select ditiadakan
  roleFilter: string;
  lifecycleFilter: string;
  typeFilter: string;
  onSearch: (value: string) => void;
  onFilterRole: (role: string) => void;
  onFilterLifecycle: (lifecycle: string) => void;
  onFilterType: (type: string) => void;
  onRefresh: () => void;
  // onDelete (bulk) dihapus
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const {
    onRefresh,
    onSearch,
    roleFilter,
    lifecycleFilter,
    typeFilter,
    onFilterRole,
    onFilterLifecycle,
    onFilterType,
  } = props;
  
  const [open, setOpen] = useState<boolean>(false);
  const [step, setStep] = useState<"form" | "success">("form");
  const [userData, setUserData] = useState<any>({});
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [roles, setRoles] = useState<LookupResponseDto[]>([]);
  const [lifecycle, setLifecycle] = useState<LookupResponseDto[]>([]);
  const [type, setType] = useState<LookupResponseDto[]>([]);

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
    roleFilter !== "All" || lifecycleFilter !== "All" || typeFilter !== "All";

  const handleReset = () => {
    onFilterRole("All");
    onFilterLifecycle("All");
    onFilterType("All");
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
        const [rolesRes, lifecycleRes, typeRes] = await Promise.all([
          commonApi.lookupControllerFindAll({ type: "ACCOUNT_ROLE" }),
          commonApi.lookupControllerFindAll({ type: "ACCOUNT_LIFECYCLE" }),
          commonApi.lookupControllerFindAll({ type: "ACCOUNT_TYPE" })
        ]);
        setRoles(rolesRes);
        setLifecycle(lifecycleRes);
        setType(typeRes);
      } catch (error) {
        console.error("Failed to fetch filters:", error);
      }
    };
    fetchFilter();
  }, []);

  return (
    <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
      <Grid container spacing={2} alignItems="center" sx={{ p: 2, width: '100%' }}>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap", width: '100%' }}>
          
          {/* Filter Role */}
          <FormControl size="small" sx={{ minWidth: "150px" }}>
            <InputLabel id="filter-role-label">Role</InputLabel>
            <Select
              labelId="filter-role-label"
              label="Role"
              value={roleFilter}
              onChange={(e) => onFilterRole(e.target.value)}
            >
              <MenuItem value="All">All Roles</MenuItem>
              {roles.map((role) => (
                <MenuItem key={role.code} value={role.label}>{role.label}</MenuItem>
              ))}
            </Select>
          </FormControl>

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
              {lifecycle.map((lc) => (
                <MenuItem key={lc.code} value={lc.label}>{lc.label}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Filter Type */}
          <FormControl size="small" sx={{ minWidth: "150px" }}>
            <InputLabel id="filter-type-label">Account Type</InputLabel>
            <Select
              labelId="filter-type-label"
              label="Account Type"
              value={typeFilter}
              onChange={(e) => onFilterType(e.target.value)}
            >
              <MenuItem value="All">All Type</MenuItem>
              {type.map((t) => (
                <MenuItem key={t.code} value={t.label}>{t.label}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Reset Action */}
          {isFiltered && (
            <Tooltip title="Reset Filters">
              <IconButton onClick={handleReset} color="error" 
                sx={{ bgcolor: (theme) => alpha(theme.palette.error.main, 0.1) }}>
                <RestartAltIcon />
              </IconButton>
            </Tooltip>
          )}

          <Box sx={{ flexGrow: 1 }} /> {/* Spacer */}

          {/* Global Actions */}
          <Tooltip title="Refresh Data">
            <IconButton onClick={onRefresh} color="primary" sx={{ border: "1px solid", borderColor: "divider" }}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>

          <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpen}>
            Add Account
          </Button>
        </Box>
      </Grid>

      <GenericModal
        open={open}
        onClose={handleClose}
        title={step === "form" ? "Create New Account" : "Account Created Successfully"}
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