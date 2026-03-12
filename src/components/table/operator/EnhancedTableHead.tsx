import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { OperatorRowData } from "@/interface/row-table.interface";

type Order = "asc" | "desc";
type ColumnId = keyof OperatorRowData | "actions";

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof OperatorRowData,
  ) => void;
  order: Order;
  orderBy: keyof OperatorRowData;
}

interface HeadCell {
  disablePadding: boolean;
  id: ColumnId;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "actions",
    numeric: false,
    disablePadding: false,
    label: "Actions",
  },
  {
    id: "job_lifecycle_state",
    numeric: false,
    disablePadding: false,
    label: "Job Lifecycle State",
  },
  {
    id: "work_order",
    numeric: false,
    disablePadding: false,
    label: "Work Order",
  },
  {
    id: "sales_order",
    numeric: false,
    disablePadding: false,
    label: "Sales Order",
  },
  {
    id: "quantity_order",
    numeric: false,
    disablePadding: false,
    label: "Quantity Order",
  },
  {
    id: "planned_start_time",
    numeric: false,
    disablePadding: false,
    label: "Planned Start Time",
  },
  {
    id: "release_date",
    numeric: false,
    disablePadding: false,
    label: "Release Date",
  },
  {
    id: "notes",
    numeric: false,
    disablePadding: false,
    label: "Notes",
  },
];

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler =
    (property: ColumnId) => (event: React.MouseEvent<unknown>) => {
      if (property !== "actions") {
        onRequestSort(event, property as keyof OperatorRowData);
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
