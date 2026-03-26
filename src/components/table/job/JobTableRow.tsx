"use client";
import * as React from "react";
import { TableRow, TableCell, IconButton, Box, Tooltip } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import GenericChips from "@/components/core/GenericChips";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";
import dayjs from "dayjs";
import { JobRowData } from "@/interface/row-table.interface";
import { usePathname } from "next/navigation";

interface JobTableRowProps {
  row: JobRowData;
  onOpenMenu: (
    event: React.MouseEvent<HTMLButtonElement>,
    row: JobRowData,
  ) => void;
}

const JobTableRow: React.FC<JobTableRowProps> = ({ row, onOpenMenu }) => {
  const pathname = usePathname();
  const isJobManagement = pathname.startsWith("/dashboard/ppic/job-management");
  const theme = useTheme();
  const status = row.job_lifecycle_state?.label?.toLowerCase() ?? "";
  const machineLabel = row.work_center?.label ?? "-";
  const quantityUnitLabel = row.quantity_unit?.label ?? "-";
  const lifecycleLabel = row.job_lifecycle_state?.label ?? "-";
  const priorityLabel = row.job_priority?.label ?? "-";
  const quantityOrder = row.quantity_order ?? "-";

  const getRowBg = (opacity: number) => {
    const map: Record<string, string> = {
      completed: alpha(theme.palette.success.light, opacity),
      released: alpha(theme.palette.primary.light, opacity),
      scheduled: alpha(theme.palette.grey[500], opacity),
      created: alpha(theme.palette.info.light, opacity),
      "on hold": alpha(theme.palette.warning.light, opacity),
      suspended: alpha(theme.palette.warning.light, opacity),
      running: alpha(theme.palette.secondary.light, opacity),
      disabled: alpha(theme.palette.error.light, opacity),
      cancelled: alpha(theme.palette.error.light, opacity),
    };
    return map[status] ?? "transparent";
  };

  const handleDownloadDirect = () => {
    const reportUrl = `/report/job/${row.work_order}/${row.work_center.code}?print=1&source=image&delayMs=30000`;
    window.open(reportUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <TableRow
      hover
      tabIndex={-1}
      key={row.work_order}
      sx={{
        cursor: "default",
        "&:last-child td, &:last-child th": { border: 0 },
        backgroundColor: getRowBg(0.14),
        "&.MuiTableRow-hover:hover": { backgroundColor: getRowBg(0.24) },
      }}
    >
      {isJobManagement ? (
        <TableCell align="center" sx={{ width: 50 }}>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onOpenMenu(e, row);
            }}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </TableCell>
      ) : (
        <TableCell>
          <Box>
            <Tooltip title="View Job Report" placement="top">
              <IconButton
                color="primary"
                size="small"
                onClick={() =>
                  window.open(
                    `/report/job/${row.work_order}/${row.work_center.code}`,
                  )
                }
              >
                <VisibilityIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Download Job Report" placement="top">
              <IconButton
                color="secondary"
                size="small"
                onClick={handleDownloadDirect}
              >
                <DownloadIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </TableCell>
      )}

      <TableCell align="left" padding="normal" sx={{ minWidth: 200 }}>
        <GenericChips value={lifecycleLabel} variant="outlined" />
      </TableCell>

      <TableCell
        component="th"
        scope="row"
        padding="normal"
        sx={{ minWidth: 250, fontWeight: 500 }}
      >
        {row.work_order}
      </TableCell>

      <TableCell align="left" padding="normal" sx={{ minWidth: 200 }}>
        {row.sales_order}
      </TableCell>

      <TableCell align="left" padding="normal" sx={{ minWidth: 200 }}>
        {machineLabel}
      </TableCell>

      <TableCell
        align="left"
        padding="normal"
        sx={{ textTransform: "capitalize", minWidth: 200 }}
      >
        {quantityOrder} {quantityUnitLabel}
      </TableCell>

      <TableCell align="left" padding="normal" sx={{ minWidth: 200 }}>
        {dayjs(row.planned_start_time).isValid()
          ? dayjs(row.planned_start_time).format("HH:mm:ss - DD/MM/YYYY")
          : "-"}
      </TableCell>

      <TableCell align="left" padding="normal" sx={{ minWidth: 200 }}>
        {dayjs(row.due_date).isValid()
          ? dayjs(row.due_date).format("HH:mm:ss - DD/MM/YYYY")
          : "-"}
      </TableCell>

      <TableCell align="left" padding="normal" sx={{ minWidth: 200 }}>
        {dayjs(row.release_date).isValid()
          ? dayjs(row.release_date).format("HH:mm:ss - DD/MM/YYYY")
          : "-"}
      </TableCell>

      {!isJobManagement ? (
        <TableCell align="left" padding="normal" sx={{ minWidth: 200 }}>
          {dayjs(row.completed_date).isValid()
            ? dayjs(row.completed_date).format("HH:mm:ss - DD/MM/YYYY")
            : "-"}
        </TableCell>
      ) : null}

      <TableCell align="left" padding="normal" sx={{ minWidth: 200 }}>
        <GenericChips value={priorityLabel} variant="filled" />
      </TableCell>

      <TableCell
        align="left"
        padding="normal"
        sx={{ textTransform: "capitalize", minWidth: 200 }}
      >
        {row.notes}
      </TableCell>

      {/* {isJobManagement && (
        <TableCell align="center" sx={{ width: 50 }}>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onOpenMenu(e, row);
            }}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </TableCell>
      )} */}
    </TableRow>
  );
};

export default React.memo(JobTableRow);
