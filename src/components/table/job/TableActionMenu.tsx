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
import DeleteIcon from "@mui/icons-material/Delete";
import { JobRowData } from "@/interface/row-table.interface";

interface TableActionMenuProps {
  anchorEl: HTMLElement | null;
  activeRow: JobRowData | null;
  onClose: () => void;
  onEdit: (row: JobRowData) => void;
  onDisable: (row: JobRowData) => void;
  onEnable: (row: JobRowData) => void;
  onDelete: (row: JobRowData) => void;
}

const TableActionMenu: React.FC<TableActionMenuProps> = ({
  anchorEl,
  activeRow,
  onClose,
  onEdit,
  onDisable,
  onEnable,
  onDelete,
}) => {
  const open = Boolean(anchorEl);
  const status = activeRow?.job_lifecycle_state.label?.toLowerCase();
  const isDisabled = status === "disabled";
  const isScheduled = status === "scheduled";
  const isReleased = status === "released";
  const canEdit = isScheduled || isReleased;

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      {canEdit && (
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
            <ListItemText>Edit Job</ListItemText>
          </MenuItem>
          <Divider />
        </Box>
      )}

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
          <ListItemText>Disable Job</ListItemText>
        </MenuItem>
      ) : (
        <MenuItem
          sx={{ color: "success.main" }}
          onClick={() => {
            if (activeRow) onEnable(activeRow);
            onClose();
          }}
        >
          <ListItemIcon>
            <PersonIcon fontSize="small" color="success" />
          </ListItemIcon>
          <ListItemText>Enable Job</ListItemText>
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
        <ListItemText>Delete Job</ListItemText>
      </MenuItem>
    </Menu>
  );
};

export default TableActionMenu;
