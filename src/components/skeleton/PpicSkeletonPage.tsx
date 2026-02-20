import {
  Box,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const PpicSkeletonPage = () => {
  return (
    <Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: 2,
          mb: 2,
        }}
      >
        {Array.from({ length: 4 }).map((_, idx) => (
          <Paper key={idx} sx={{ p: 2, borderRadius: 2 }}>
            <Skeleton variant="text" width="45%" height={26} />
            <Skeleton variant="text" width="70%" height={40} />
            <Skeleton variant="text" width="60%" />
          </Paper>
        ))}
      </Box>

      <Paper sx={{ width: "100%", mb: 2, boxShadow: 3, overflow: "hidden" }}>
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Skeleton variant="text" width={180} height={40} />
          <Box sx={{ display: "flex", gap: 1 }}>
            <Skeleton variant="rounded" width={44} height={36} />
            <Skeleton variant="rounded" width={120} height={36} />
            <Skeleton variant="rounded" width={110} height={36} />
          </Box>
        </Box>

        <Box
          sx={{ px: 2, pb: 2, display: "flex", gap: 1.5, overflowX: "auto" }}
        >
          {Array.from({ length: 6 }).map((_, idx) => (
            <Skeleton key={idx} variant="rounded" width={150} height={40} />
          ))}
        </Box>

        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {Array.from({ length: 11 }).map((_, idx) => (
                  <TableCell key={idx}>
                    <Skeleton variant="text" width="70%" />
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.from({ length: 5 }).map((_, rowIdx) => (
                <TableRow key={rowIdx}>
                  {Array.from({ length: 11 }).map((_, cellIdx) => (
                    <TableCell key={cellIdx}>
                      <Skeleton variant="text" width="85%" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default PpicSkeletonPage;
