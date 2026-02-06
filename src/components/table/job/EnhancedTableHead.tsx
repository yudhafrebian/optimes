import { AccountResponseDto, LookupResponseDto } from "@/api-client";
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
  work_order: string;
  sales_order: string;
  machine_id: LookupResponseDto;              // Isinya: { label: "Offset Printer 1", code: "OFFSET_PRINTER_1", ... }
  quantity_order: number;
  quantity_unit: LookupResponseDto;           // Isinya: { label: "BK", code: "BK", ... }
  planned_start_time: string;
  release_date?: string;
  due_date: string;
  job_priority: LookupResponseDto;            // Isinya: { label: "High", code: "HIGH", ... }
  job_lifecycle_state: LookupResponseDto;     // Isinya: { label: "Created", code: "CREATED", ... }
  notes: string;
}

type Order = "asc" | "desc";
type ColumnId = keyof Data | "actions";

interface EnhancedTableProps {
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
    id: "machine_id",
    numeric: false,
    disablePadding: false,
    label: "Machine",
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
    id: "due_date",
    numeric: false,
    disablePadding: false,
    label: "Due Date",
  },
  {
    id: "release_date",
    numeric: false,
    disablePadding: false,
    label: "Release Date",
  },
  {
    id: "job_lifecycle_state",
    numeric: false,
    disablePadding: false,
    label: "Job Lifecycle State",
  },
  {
    id: "job_priority",
    numeric: false,
    disablePadding: false,
    label: "Job Priority",
  },
  {
    id: "notes",
    numeric: false,
    disablePadding: false,
    label: "Notes",
  },
  {
    id: "actions",
    numeric: false,
    disablePadding: false,
    label: "Actions",
  },
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
