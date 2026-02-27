"use client";

import * as React from "react";
import { TableRow, TableCell } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import GenericChips from "@/components/core/GenericChips";
import { ExecutionHistoryRowData } from "@/interface/row-table.interface";
import { formatDateTime } from "@/utils/timeFormater";

interface JobHistoryTableRowProps {
  row: ExecutionHistoryRowData;
}

const JobHistoryTableRow: React.FC<JobHistoryTableRowProps> = ({ row }) => {
  const theme = useTheme();
  const status = (row.status ?? "").toLowerCase();
  const severity = (row.severity ?? "").toLowerCase();
  const eventName = row.event_path.split("/").slice(-1)[0] ?? "-";

  const getRowBg = (opacity: number) => {
    if (status === "closed") {
      return alpha(theme.palette.grey[500], opacity);
    }

    const severityMap: Record<string, string> = {
      critical: alpha(theme.palette.error.main, opacity),
      high: alpha(theme.palette.error.light, opacity),
      medium: alpha(theme.palette.warning.light, opacity),
      low: alpha(theme.palette.info.light, opacity),
      info: alpha(theme.palette.primary.light, opacity),
      other: alpha(theme.palette.grey[400], opacity),
    };

    return severityMap[severity] ?? "transparent";
  };

  return (
    <TableRow
      hover
      tabIndex={-1}
      key={row.id}
      sx={{
        cursor: "default",
        "&:last-child td, &:last-child th": { border: 0 },
        backgroundColor: getRowBg(0.08),
        "&.MuiTableRow-hover:hover": { backgroundColor: getRowBg(0.16) },
      }}
    >
      <TableCell sx={{ minWidth: 220 }}>{row.event_path}</TableCell>
      <TableCell sx={{ minWidth: 180 }}>{formatDateTime(row.start_ts)}</TableCell>
      <TableCell sx={{ minWidth: 180 }}>
        {row.end_ts ? formatDateTime(row.end_ts) : "-"}
      </TableCell>
      <TableCell sx={{ minWidth: 120 }}>
        <GenericChips variant="filled" value={row.status} />
      </TableCell>
      <TableCell sx={{ minWidth: 120 }}>
        <GenericChips value={row.severity} />
      </TableCell>
      <TableCell sx={{ minWidth: 220 }}>{row.notes_on_open || "-"}</TableCell>
      <TableCell sx={{ minWidth: 220 }}>{row.notes_on_close || "-"}</TableCell>
    </TableRow>
  );
};

export default React.memo(JobHistoryTableRow);
