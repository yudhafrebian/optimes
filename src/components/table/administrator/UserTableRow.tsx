"use client";
import * as React from "react";
import { TableRow, TableCell, IconButton, alpha, useTheme } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import GenericChips from "@/components/core/GenericChips";
import dayjs from "dayjs";
import { UserRowData } from "@/interface/row-table.interface";

interface UserTableRowProps {
  row: UserRowData;
  // isSelected, labelId, dan onSelect dihapus karena fitur select ditiadakan
  onOpenMenu: (
    event: React.MouseEvent<HTMLButtonElement>,
    row: UserRowData,
  ) => void;
}

const UserTableRow: React.FC<UserTableRowProps> = ({
  row,
  onOpenMenu,
}) => {
  const theme = useTheme();
  const role = row.role.toLowerCase();
  const getRowBg = (opacity: number) => {
      const map: Record<string, string> = {
        "head of production": alpha(theme.palette.success.light, opacity),
        administrator: alpha(theme.palette.primary.light, opacity),
        ppic: alpha(theme.palette.warning.light, opacity),
        operator: alpha(theme.palette.secondary.light, opacity),
      };
      return map[role] ?? "transparent";
    };
  return (
    <TableRow
      hover
      tabIndex={-1}
      key={row.id}
      sx={{ 
        cursor: "default", // Diubah ke default karena klik row tidak lagi memilih checkbox
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
        {row.full_name}
      </TableCell>
      
      <TableCell
        align="left"
        padding="normal"
        sx={{ minWidth: 200 }}
      >
        {row.username}
      </TableCell>

      <TableCell
        align="left"
        padding="normal"
        sx={{ minWidth: 200 }}
      >
        <GenericChips value={row.role} variant="filled" />
      </TableCell>

      <TableCell align="left" padding="normal">
        <GenericChips value={row.lifecycle} />
      </TableCell>

      <TableCell
        align="left"
        padding="normal"
        sx={{ textTransform: "capitalize", minWidth: 200 }}
      >
        {row.account_type}
      </TableCell>

      <TableCell
        align="left"
        padding="normal"
        sx={{ minWidth: 200 }}
      >
        {dayjs(row.account_expiry_date).isValid()
          ? dayjs(row.account_expiry_date).format("HH:mm:ss - DD/MM/YYYY")
          : "-"}
      </TableCell>

      <TableCell
        align="left"
        padding="normal"
        sx={{ minWidth: 200 }}
      >
        {dayjs(row.password_last_changed).isValid()
          ? dayjs(row.password_last_changed).format("HH:mm:ss - DD/MM/YYYY")
          : "-"}
      </TableCell>

      <TableCell
        align="left"
        padding="normal"
        sx={{ minWidth: 200 }}
      >
        {dayjs(row.password_expiry_time).isValid()
          ? dayjs(row.password_expiry_time).format("HH:mm:ss - DD/MM/YYYY")
          : "-"}
      </TableCell>

      <TableCell
        align="left"
        padding="normal"
        sx={{ minWidth: 200 }}
      >
        {row.must_change_password ? "Yes" : "No"}
      </TableCell>

      <TableCell
        align="left"
        padding="normal"
        sx={{ minWidth: 150 }}
      >
        {dayjs(row.last_login).isValid()
          ? dayjs(row.last_login).format("HH:mm:ss - DD/MM/YYYY")
          : "-"}
      </TableCell>

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
    </TableRow>
  );
};

export default React.memo(UserTableRow);