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
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

import DeleteIcon from "@mui/icons-material/Delete";

import CancelIcon from '@mui/icons-material/Cancel';
import { JobRowData } from "@/interface/row-table.interface";

interface TableActionMenuProps {
  anchorEl: HTMLElement | null;
  activeRow: JobRowData | null;
  onClose: () => void;
  onEdit: (row: JobRowData) => void;
  onCancel: (row: JobRowData) => void;
  onForceCancel: (row: JobRowData) => void;
  onRelease: (row: JobRowData) => void;
  onComplete: (row: JobRowData) => void;
  onDelete: (row: JobRowData) => void;
}

const TableActionMenu: React.FC<TableActionMenuProps> = ({
  anchorEl,
  activeRow,
  onClose,
  onEdit,
  onCancel,
  onRelease,
  onComplete,
  onForceCancel,
  onDelete,
}) => {
  const open = Boolean(anchorEl);
  const status = activeRow?.job_lifecycle_state.label?.toLowerCase();
  const isScheduled = status === "scheduled";
  const isCompleted = status === "completed";
  const isRunning = status === "running";
  const isReleased = status === "released";
  const canEditOrDelete = isScheduled;
  const canCancel = isReleased || isRunning ;

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      {isScheduled && (
        <MenuItem
          onClick={() => {
            if (activeRow) onRelease(activeRow);
            onClose();
          }}
        >
          <ListItemIcon>
            <PlayCircleIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <ListItemText>Release Job</ListItemText>
        </MenuItem>
      )}
      {canEditOrDelete && (
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
      {canCancel && (
        <MenuItem
          sx={{ color: "error.main" }}
          onClick={() => {
            if (activeRow) isRunning ? onForceCancel(activeRow) : onCancel(activeRow);
            onClose();
          }}
        >
          <ListItemIcon>
            <CancelIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>{isRunning ? "Force Cancel Job" : "Cancel Job"}</ListItemText>
        </MenuItem>
      )}
      {/* {isRunning && (
        <MenuItem disabled>
          <ListItemIcon>
            <BlockIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>No Action</ListItemText>
        </MenuItem>
      )} */}

      {canEditOrDelete && (
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
      )}
    </Menu>
  );
};

export default TableActionMenu;
