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
  lifecycle: string;
  account_type: string;
  account_expiry_date: string;
  password_last_changed: string;
  password_expiry_time: string;
  must_change_password: boolean;
  last_login: string;
}

type Order = "asc" | "desc";
type ColumnId = keyof Data | "actions";

interface EnhancedTableProps {
  // numSelected, onSelectAllClick, dan rowCount dihapus
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => void;
  order: Order;
  orderBy: keyof Data;
}

interface HeadCell {
  disablePadding: boolean;
  id: ColumnId;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "full_name",
    numeric: false,
    disablePadding: false, // Ubah ke false karena checkbox sudah tidak ada
    label: "Full Name",
  },
  {
    id: "username",
    numeric: false,
    disablePadding: false,
    label: "Username",
  },
  { id: "role", numeric: true, disablePadding: false, label: "Role" },
  { id: "lifecycle", numeric: true, disablePadding: false, label: "Lifecycle" },
  {
    id: "account_type",
    numeric: true,
    disablePadding: false,
    label: "Account Type",
  },
  {
    id: "account_expiry_date",
    numeric: true,
    disablePadding: false,
    label: "Account Expiry Date",
  },
  {
    id: "password_last_changed",
    numeric: true,
    disablePadding: false,
    label: "Password Last Changed",
  },
  {
    id: "password_expiry_time",
    numeric: true,
    disablePadding: false,
    label: "Password Expiry Time",
  },
  {
    id: "must_change_password",
    numeric: true,
    disablePadding: false,
    label: "Must Change Password",
  },
  {
    id: "last_login",
    numeric: true,
    disablePadding: false,
    label: "Last Login",
  },
  { id: "actions", numeric: false, disablePadding: false, label: "Actions" },
];

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler =
    (property: ColumnId) => (event: React.MouseEvent<unknown>) => {
      if (property !== "actions") {
        onRequestSort(event, property as keyof Data);
      }
    };

  return (
    <TableHead>
      <TableRow>
        {/* TableCell Checkbox dihapus dari sini */}

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
                bgcolor: "#F8F9FA",
                color: "#475569",
                borderBottom: "2px solid #E2E8F0",
                py: 2,
              }}
            >
              {isAction ? (
                headCell.label // Menampilkan label "Actions" tanpa sort link
              ) : (
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
