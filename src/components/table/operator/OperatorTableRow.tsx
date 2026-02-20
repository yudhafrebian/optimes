"use client";
import * as React from "react";
import { TableRow, TableCell, Button } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import GenericChips from "@/components/core/GenericChips";
import dayjs from "dayjs";
import { OperatorRowData } from "@/interface/row-table.interface";
import { useAtom } from "jotai";
import loaderAtom from "@/atoms/loader.atom";

interface OperatorTableRowProps {
  row: OperatorRowData;
}

const OperatorTableRow: React.FC<OperatorTableRowProps> = ({
  row,
}) => {
  const theme = useTheme();
  const status = row.job_lifecycle_state?.label?.toLowerCase() ?? "";
  const quantityUnitLabel = row.quantity_unit?.label ?? "-";
  const lifecycleLabel = row.job_lifecycle_state?.label ?? "-";
  const quantityOrder = row.quantity_order ?? "-";

  const [loader] = useAtom(loaderAtom);

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
      <TableCell align="center" sx={{ width: 50 }}>
        <Button size="small" disabled={loader} variant="contained" startIcon={<PlayArrowIcon />}>Load</Button>
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
        <GenericChips value={lifecycleLabel} variant="outlined" />
      </TableCell>

      <TableCell
        align="left"
        padding="normal"
        sx={{ textTransform: "capitalize", minWidth: 200 }}
      >
        {row.notes}
      </TableCell>
    </TableRow>
  );
};

export default React.memo(OperatorTableRow);
