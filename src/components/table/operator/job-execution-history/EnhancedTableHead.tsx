import { ExecutionHistoryRowData } from "@/interface/row-table.interface";
import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";

type Order = "asc" | "desc";
type ColumnId = keyof ExecutionHistoryRowData;

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: ColumnId,
  ) => void;
  order: Order;
  orderBy: ColumnId;
}

interface HeadCell {
  id: ColumnId;
  label: string;
}

const headCells: readonly HeadCell[] = [
  { id: "event_path", label: "Event Path" },
  { id: "start_ts", label: "Start Time" },
  { id: "end_ts", label: "End Time" },
  { id: "status", label: "Status" },
  { id: "notes_on_open", label: "Note on Open" },
  { id: "notes_on_close", label: "Note on Close" },
];

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler =
    (property: ColumnId) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            sx={{
              fontWeight: 700,
              fontSize: "0.875rem",
              bgcolor: "#F8F9FA",
              color: "#475569",
              borderBottom: "2px solid #E2E8F0",
              py: 2,
            }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default EnhancedTableHead;
