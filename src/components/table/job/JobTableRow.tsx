"use client";
import * as React from "react";
import { TableRow, TableCell, IconButton, Button } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import GenericChips from "@/components/core/GenericChips";
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
      running: alpha(theme.palette.success.light, opacity),
      released: alpha(theme.palette.primary.light, opacity),
      scheduled: alpha(theme.palette.grey[500], opacity),
      created: alpha(theme.palette.info.light, opacity),
      "on hold": alpha(theme.palette.warning.light, opacity),
      suspended: alpha(theme.palette.warning.light, opacity),
      completed: alpha(theme.palette.secondary.light, opacity),
      disabled: alpha(theme.palette.error.light, opacity),
      closed: alpha(theme.palette.error.light, opacity),
    };
    return map[status] ?? "transparent";
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
      {/* TableCell padding="checkbox" dan Checkbox dihapus dari sini */}

      <TableCell
        component="th"
        scope="row"
        padding="normal" // Diubah dari "none" ke "normal" agar ada jarak di pinggir kiri
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

      <TableCell align="left" padding="normal" sx={{ minWidth: 200 }}>
        <GenericChips value={lifecycleLabel} variant="outlined" />
      </TableCell>

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

      <TableCell align="center" sx={{ width: 50 }}>
        {isJobManagement ? (
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onOpenMenu(e, row);
            }}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
        ) : (
          <Button
            variant="contained"
            onClick={() => window.open(`/report/job/${row.id}`)}
          >
            Get Report
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};

export default React.memo(JobTableRow);
