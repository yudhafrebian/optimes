import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";

interface Data {
  id: string;
  username: string;
  full_name: string;
  role: string;
  status: string;
  password_status: "normal" | "temporary" | "expired";
  last_login: string;
  created_date: string;
}

type Order = "asc" | "desc";
type ColumnId = keyof Data | "actions";

interface EnhancedTableProps {
  numSelected?: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => void;
  onSelectAllClick?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: keyof Data;
  rowCount: number;
}

interface HeadCell {
  disablePadding: boolean;
  id: ColumnId;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "Employee ID",
  },
  {
    id: "full_name",
    numeric: false,
    disablePadding: true,
    label: "Full Name",
  },
  {
    id: "username",
    numeric: false,
    disablePadding: true,
    label: "Username",
  },
  {
    id: "role",
    numeric: true,
    disablePadding: false,
    label: "Role",
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "password_status",
    numeric: true,
    disablePadding: false,
    label: "Password Status",
  },
  {
    id: "last_login",
    numeric: true,
    disablePadding: false,
    label: "Last Login",
  },
  {
    id: "created_date",
    numeric: true,
    disablePadding: false,
    label: "Created Date",
  },
  {
    id: "actions",
    numeric: false,
    disablePadding: false,
    label: "",
  },
];

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: ColumnId) => (event: React.MouseEvent<unknown>) => {
      if (property !== "actions") {
        onRequestSort(event, property as keyof Data);
      }
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => {
          const isAction = headCell.id === "actions";

          return (
            <TableCell
              key={headCell.id}
              align="left"
              padding={headCell.disablePadding ? "none" : "normal"}
              sx={{
                fontWeight: 700,
                fontSize: "0.875rem",
                bgcolor: "#F8F9FA", // Warna abu-abu muda yang modern
                color: "#475569", // Warna teks slate
                borderBottom: "2px solid #E2E8F0", // Garis bawah lebih tegas
                py: 2, // Padding vertikal agar header lebih lega
              }}
            >
              {isAction ? null : (
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              )}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}

export default EnhancedTableHead;
