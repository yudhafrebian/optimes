import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { usePathname } from "next/navigation";
import {
  ColumnId,
  Data,
  EnhancedTableProps,
  headCells,
  reportHeadCells,
} from "./DynamicTableHeadCells";

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;

  const pathname = usePathname();
  const isJobManagement = pathname.startsWith("/dashboard/ppic/job-management");

  const filteredHeadcell = isJobManagement
    ? headCells
    : reportHeadCells;

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

        {filteredHeadcell.map((headCell) => {
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
                headCell.label
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
