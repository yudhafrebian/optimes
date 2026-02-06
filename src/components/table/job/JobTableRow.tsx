"use client";
import * as React from "react";
import { TableRow, TableCell, IconButton, Button } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import GenericChips from "@/components/core/GenericChips";
import dayjs from "dayjs";
import { JobRowData } from "@/interface/row-table.interface";
import { usePathname } from "next/navigation";

interface JobTableRowProps {
  row: JobRowData;
  // isSelected, labelId, dan onSelect dihapus karena fitur select ditiadakan
  onOpenMenu: (
    event: React.MouseEvent<HTMLButtonElement>,
    row: JobRowData,
  ) => void;
}

const JobTableRow: React.FC<JobTableRowProps> = ({ row, onOpenMenu }) => {
  const pathname = usePathname();
  const isJobManagement = pathname.startsWith("/dashboard/ppic/job-management");
  return (
    <TableRow
      hover
      tabIndex={-1}
      key={row.work_order}
      sx={{
        cursor: "default",
        "&:last-child td, &:last-child th": { border: 0 },
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
        {row.machine_id.label}
      </TableCell>

      <TableCell
        align="left"
        padding="normal"
        sx={{ textTransform: "capitalize", minWidth: 200 }}
      >
        {row.quantity_order} {row.quantity_unit.label}
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
        <GenericChips value={row.job_lifecycle_state.label} variant="filled" />
      </TableCell>

      <TableCell align="left" padding="normal" sx={{ minWidth: 200 }}>
        <GenericChips value={row.job_priority.label} variant="filled" />
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
