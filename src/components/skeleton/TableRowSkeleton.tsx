import { TableRow, TableCell, Skeleton } from "@mui/material";

interface TableRowSkeletonProps {
  rows?: number;
}

const TableRowSkeleton = ({ rows = 5 }: TableRowSkeletonProps) => {
  return (
    <>
      {Array.from(new Array(rows)).map((_, index) => (
        <TableRow key={index}>
          {/* Checkbox Column */}
          <TableCell padding="checkbox">
            <Skeleton variant="rectangular" width={20} height={20} sx={{ borderRadius: 0.5 }} />
          </TableCell>
          
          {/* ID Column */}
          <TableCell sx={{ minWidth: 150 }}>
            <Skeleton variant="text" width="80%" />
          </TableCell>

          {/* Full Name Column */}
          <TableCell sx={{ minWidth: 250 }}>
            <Skeleton variant="text" width="90%" />
          </TableCell>

          {/* Username Column */}
          <TableCell sx={{ minWidth: 200 }}>
            <Skeleton variant="text" width="70%" />
          </TableCell>
          
          {/* Role (Chip) Column */}
          <TableCell sx={{ minWidth: 200 }}>
            <Skeleton variant="rectangular" width={100} height={24} sx={{ borderRadius: 4 }} />
          </TableCell>

          {/* Status (Chip) Column */}
          <TableCell>
            <Skeleton variant="rectangular" width={80} height={24} sx={{ borderRadius: 4 }} />
          </TableCell>

          {/* Password Status Column */}
          <TableCell sx={{ minWidth: 200 }}>
            <Skeleton variant="text" width="60%" />
          </TableCell>

          {/* Last Login Column */}
          <TableCell sx={{ minWidth: 150 }}>
            <Skeleton variant="text" width="80%" />
          </TableCell>

          {/* Created Date Column */}
          <TableCell>
            <Skeleton variant="text" width="70%" />
          </TableCell>
          
          {/* Action Column */}
          <TableCell align="center">
            <Skeleton variant="circular" width={32} height={32} sx={{ mx: "auto" }} />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default TableRowSkeleton;