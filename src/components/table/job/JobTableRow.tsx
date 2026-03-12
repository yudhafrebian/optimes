"use client";
import * as React from "react";
import {
  TableRow,
  TableCell,
  IconButton,
  Dialog,
  CircularProgress,
  Box,
  Tooltip,
  Typography,
  GlobalStyles,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import GenericChips from "@/components/core/GenericChips";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from "dayjs";
import { JobRowData } from "@/interface/row-table.interface";
import { usePathname } from "next/navigation";

interface JobTableRowProps {
  row: JobRowData;
  onOpenMenu: (
    event: React.MouseEvent<HTMLButtonElement>,
    row: JobRowData,
  ) => void;
}

const JobTableRow: React.FC<JobTableRowProps> = ({ row, onOpenMenu }) => {
  const pathname = usePathname();
  const isJobManagement = pathname.startsWith("/dashboard/ppic/job-management");
  const theme = useTheme();
  const status = row.job_lifecycle_state?.label?.toLowerCase() ?? "";
  const machineLabel = row.work_center?.label ?? "-";
  const quantityUnitLabel = row.quantity_unit?.label ?? "-";
  const lifecycleLabel = row.job_lifecycle_state?.label ?? "-";
  const priorityLabel = row.job_priority?.label ?? "-";
  const quantityOrder = row.quantity_order ?? "-";
  const [printPreviewOpen, setPrintPreviewOpen] = React.useState(false);
  const [isImageLoaded, setIsImageLoaded] = React.useState(false);
  const hasPrintedRef = React.useRef(false);
  const downloadUrl = `http://192.168.68.9:3000/api/render-image?wo=${row.work_order}&wc=${row.work_center.code}&ev=Setup&slug=taiyojobreport`;

  const getRowBg = (opacity: number) => {
    const map: Record<string, string> = {
      completed: alpha(theme.palette.success.light, opacity),
      released: alpha(theme.palette.primary.light, opacity),
      scheduled: alpha(theme.palette.grey[500], opacity),
      created: alpha(theme.palette.info.light, opacity),
      "on hold": alpha(theme.palette.warning.light, opacity),
      suspended: alpha(theme.palette.warning.light, opacity),
      running: alpha(theme.palette.secondary.light, opacity),
      disabled: alpha(theme.palette.error.light, opacity),
      cancelled: alpha(theme.palette.error.light, opacity),
    };
    return map[status] ?? "transparent";
  };

  const handleDownloadDirect = () => {
    hasPrintedRef.current = false;
    setIsImageLoaded(false);
    setPrintPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setPrintPreviewOpen(false);
    setIsImageLoaded(false);
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);

    if (hasPrintedRef.current) {
      return;
    }

    hasPrintedRef.current = true;
    window.setTimeout(() => {
      window.print();
    }, 300);
  };

  return (
    <>
      <GlobalStyles
        styles={{
          "@media print": {
            "body *": {
              visibility: "hidden",
            },
            ".job-report-print-root, .job-report-print-root *": {
              visibility: "visible",
            },
            ".job-report-print-root": {
              position: "fixed",
              inset: 0,
              backgroundColor: "#fff",
              margin: 0,
              padding: 0,
              zIndex: 9999,
            },
            ".job-report-print-toolbar": {
              display: "none",
            },
            ".job-report-print-image": {
              width: "100%",
              height: "auto",
            },
          },
        }}
      />
      <TableRow
        hover
        tabIndex={-1}
        key={row.work_order}
        sx={{
          cursor: "default",
          "&:last-child td, &:last-child th": { border: 0 },
          backgroundColor: getRowBg(0.14),
          "&.MuiTableRow-hover:hover": { backgroundColor: getRowBg(0.24) },
        }}
      >
        {!isJobManagement && (
          <TableCell>
            <Box>
              <Tooltip title="View Job Report" placement="top">
                <IconButton
                  color="primary"
                  size="small"
                  disabled={status === "cancelled"}
                  onClick={() =>
                    window.open(
                      `/report/job/${row.work_order}/${row.work_center.code}`,
                    )
                  }
                >
                  <VisibilityIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Download Job Report" placement="top">
                <IconButton
                  color="secondary"
                  size="small"
                  disabled={status === "cancelled"}
                  onClick={handleDownloadDirect}
                >
                  <DownloadIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </TableCell>
        )}

        <TableCell align="left" padding="normal" sx={{ minWidth: 200 }}>
          <GenericChips value={lifecycleLabel} variant="outlined" />
        </TableCell>

        <TableCell
          component="th"
          scope="row"
          padding="normal"
          sx={{ minWidth: 250, fontWeight: 500 }}
        >
          {row.work_order}
        </TableCell>

        <TableCell align="left" padding="normal" sx={{ minWidth: 200 }}>
          {row.sales_order}
        </TableCell>

        <TableCell align="left" padding="normal" sx={{ minWidth: 200 }}>
          {machineLabel}
        </TableCell>

        <TableCell
          align="left"
          padding="normal"
          sx={{ textTransform: "capitalize", minWidth: 200 }}
        >
          {quantityOrder} {quantityUnitLabel}
        </TableCell>

        <TableCell align="left" padding="normal" sx={{ minWidth: 200 }}>
          {dayjs(row.planned_start_time).isValid()
            ? dayjs(row.planned_start_time).format("HH:mm:ss - DD/MM/YYYY")
            : "-"}
        </TableCell>

        <TableCell align="left" padding="normal" sx={{ minWidth: 200 }}>
          {dayjs(row.due_date).isValid()
            ? dayjs(row.due_date).format("HH:mm:ss - DD/MM/YYYY")
            : "-"}
        </TableCell>

        <TableCell align="left" padding="normal" sx={{ minWidth: 200 }}>
          {dayjs(row.release_date).isValid()
            ? dayjs(row.release_date).format("HH:mm:ss - DD/MM/YYYY")
            : "-"}
        </TableCell>

        {!isJobManagement ? (
          <TableCell align="left" padding="normal" sx={{ minWidth: 200 }}>
            {dayjs(row.completed_date).isValid()
              ? dayjs(row.completed_date).format("HH:mm:ss - DD/MM/YYYY")
              : "-"}
          </TableCell>
        ) : null}

        <TableCell align="left" padding="normal" sx={{ minWidth: 200 }}>
          <GenericChips value={priorityLabel} variant="filled" />
        </TableCell>

        <TableCell
          align="left"
          padding="normal"
          sx={{ textTransform: "capitalize", minWidth: 200 }}
        >
          {row.notes}
        </TableCell>

        {isJobManagement && (
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
        )}
      </TableRow>
      <Dialog
        fullScreen
        open={printPreviewOpen}
        onClose={handleClosePreview}
        PaperProps={{
          className: "job-report-print-root",
          sx: {
            bgcolor: "grey.100",
          },
        }}
      >
        <Box
          className="job-report-print-toolbar"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 3,
            py: 2,
            borderBottom: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
          }}
        >
          <Box>
            <Typography variant="h6">Job Report Preview</Typography>
            <Typography variant="body2" color="text.secondary">
              {row.work_order} - {row.work_center.code}
            </Typography>
          </Box>
          <IconButton onClick={handleClosePreview}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: { xs: 1, sm: 3 },
            bgcolor: "#f3f3f3",
          }}
        >
          {!isImageLoaded && (
            <Box
              sx={{
                position: "absolute",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <CircularProgress />
              <Typography variant="body2" color="text.secondary">
                Preparing report...
              </Typography>
            </Box>
          )}
          <img
            src={downloadUrl}
            alt={`Job report ${row.work_order}`}
            onLoad={handleImageLoad}
            style={{
              display: isImageLoaded ? "block" : "none",
              maxWidth: "100%",
              height: "auto",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.16)",
              backgroundColor: "#fff",
            }}
            className="job-report-print-image"
          />
        </Box>
      </Dialog>
    </>
  );
};

export default React.memo(JobTableRow);
