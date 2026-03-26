// components/table/AccountActionMenu.tsx
"use client";
import * as React from "react";
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import PersonIcon from "@mui/icons-material/Person";
import LockResetIcon from "@mui/icons-material/LockReset";
import DeleteIcon from "@mui/icons-material/Delete";
import { UserRowData } from "@/interface/row-table.interface";
import BlockIcon from "@mui/icons-material/Block";

interface TableActionMenuProps {
  anchorEl: HTMLElement | null;
  activeRow: UserRowData | null;
  onClose: () => void;
  onEdit: (row: UserRowData) => void;
  onDisable: (row: UserRowData) => void;
  onSuspend: (row: UserRowData) => void;
  onReset: (row: UserRowData) => void;
  onReactivate: (row: UserRowData) => void;
  onDelete: (row: UserRowData) => void;
}

const TableActionMenu: React.FC<TableActionMenuProps> = ({
  anchorEl,
  activeRow,
  onClose,
  onEdit,
  onDisable,
  onSuspend,
  onReset,
  onReactivate,
  onDelete,
}) => {
  const open = Boolean(anchorEl);
  const lifecycle = activeRow?.lifecycle?.toLowerCase();
  const isDisabled = lifecycle === "disabled";
  const isAdmin = activeRow?.role?.toLowerCase() === "administrator";

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      {isAdmin && (
        <MenuItem disabled>
          <ListItemIcon>
            <BlockIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>No Action</ListItemText>
        </MenuItem>
      )}

      {!isDisabled && !isAdmin && (
        <Box>
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
              if (activeRow) onReset(activeRow);
              onClose();
            }}
          >
            <ListItemIcon>
              <LockResetIcon fontSize="small" color="secondary" />
            </ListItemIcon>
            <ListItemText>Reset Password</ListItemText>
          </MenuItem>
          <Divider />
        </Box>
      )}

      {!isAdmin && (
        <>
          {!isDisabled ? (
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
                if (activeRow) onReactivate(activeRow);
                onClose();
              }}
            >
              <ListItemIcon>
                <PersonIcon fontSize="small" color="success" />
              </ListItemIcon>
              <ListItemText>Reactivate Account</ListItemText>
            </MenuItem>
          )}
          <MenuItem
            sx={{ color: "error.main" }}
            onClick={() => {
              if (activeRow) onDelete(activeRow);
              onClose();
            }}
          >
            <ListItemIcon>
              <DeleteIcon fontSize="small" color="error" />
            </ListItemIcon>
            <ListItemText>Delete Account</ListItemText>
          </MenuItem>
        </>
      )}
    </Menu>
  );
};

export default TableActionMenu;
