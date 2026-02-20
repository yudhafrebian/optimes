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
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import BlockIcon from '@mui/icons-material/Block';
import DeleteIcon from "@mui/icons-material/Delete";
import { JobRowData } from "@/interface/row-table.interface";

interface TableActionMenuProps {
  anchorEl: HTMLElement | null;
  activeRow: JobRowData | null;
  onClose: () => void;
  onEdit: (row: JobRowData) => void;
  onCloseJob: (row: JobRowData) => void;
  onRelease: (row: JobRowData) => void;
  onDelete: (row: JobRowData) => void;
}

const TableActionMenu: React.FC<TableActionMenuProps> = ({
  anchorEl,
  activeRow,
  onClose,
  onEdit,
  onCloseJob,
  onRelease,
  onDelete,
}) => {
  const open = Boolean(anchorEl);
  const status = activeRow?.job_lifecycle_state.label?.toLowerCase();
  const isScheduled = status === "scheduled";
  const isCompleted = status === "completed";
  const isClosed = status === "closed";
  const isReleased = status === "released";
  const canEditOrDelete = isScheduled;
  const canClose = isReleased || isCompleted;

  

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
      {canClose && (
        <MenuItem
          sx={{ color: "error.main" }}
          onClick={() => {
            if (activeRow) onCloseJob(activeRow);
            onClose();
          }}
        >
          <ListItemIcon>
            <BlockIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Close Job</ListItemText>
        </MenuItem>
      )}

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
