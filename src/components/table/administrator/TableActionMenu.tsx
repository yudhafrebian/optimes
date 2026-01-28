// components/table/AccountActionMenu.tsx
"use client";
import * as React from "react";
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import PersonIcon from "@mui/icons-material/Person";
import LockResetIcon from "@mui/icons-material/LockReset";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from '@mui/icons-material/Info';
import { UserRowData } from "./types";




interface TableActionMenuProps {
  anchorEl: HTMLElement | null;
  activeRow: UserRowData | null;
  onClose: () => void;
  onEdit: (row: UserRowData) => void;
  onDisable: (row: UserRowData) => void;
}

const TableActionMenu: React.FC<TableActionMenuProps> = ({
  anchorEl,
  activeRow,
  onClose,
  onEdit,
  onDisable,
}) => {
  const open = Boolean(anchorEl);

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem
        onClick={() => {
          console.log("Account Detail Clicked", activeRow)
          onClose();
        }}
      >
        <ListItemIcon>
          <InfoIcon fontSize="small" color="primary" />
        </ListItemIcon>
        <ListItemText>Account Detail</ListItemText>
      </MenuItem>

      <MenuItem
        onClick={() => {
          if (activeRow) onEdit(activeRow);
          onClose();
        }}
      >
        <ListItemIcon>
          <EditIcon fontSize="small" color="primary" />
        </ListItemIcon>
        <ListItemText>Edit Role</ListItemText>
      </MenuItem>

      <MenuItem
        onClick={() => {
          console.log("Reset Password clicked", activeRow);
          onClose();
        }}
      >
        <ListItemIcon>
          <LockResetIcon fontSize="small" color="secondary" />
        </ListItemIcon>
        <ListItemText>Reset Password</ListItemText>
      </MenuItem>

      {activeRow?.status === "Active" ? (
        <MenuItem
          sx={{ color: "error.main" }}
          onClick={() => {
            if (activeRow) onDisable(activeRow);
            onClose();
          }}
        >
          <ListItemIcon>
            <PersonOffIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Disable Account</ListItemText>
        </MenuItem>
      ) : (
        <MenuItem
          sx={{ color: "success.main" }}
          onClick={() => {
            // Anda bisa menambahkan onEnable jika fungsinya berbeda
            if (activeRow) onDisable(activeRow);
            onClose();
          }}
        >
          <ListItemIcon>
            <PersonIcon fontSize="small" color="success" />
          </ListItemIcon>
          <ListItemText>Enable Account</ListItemText>
        </MenuItem>
      )}
   
      <MenuItem
        sx={{ color: "error.main" }}
        onClick={() => {
          console.log("Delete Account clicked", activeRow);
          onClose();
        }}
      >
        <ListItemIcon>
          <DeleteIcon fontSize="small" color="error" />
        </ListItemIcon>
        <ListItemText>Delete Account</ListItemText>
      </MenuItem>
    </Menu>
  );
};

export default TableActionMenu;
