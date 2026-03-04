import { Fragment, FunctionComponent } from "react";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import {
  JobOffsetPrinterTaiyoUploadPreviewResponseDto,
  LookupResponseDto,
} from "@/api/generated/common-service";
import GenericChips from "@/components/core/GenericChips";
import { commonApi } from "@/lib/api";
import { useSnackbar } from "@/hooks/useSnackbar";

interface ImportPreviewTableProps {
  data: JobOffsetPrinterTaiyoUploadPreviewResponseDto;
  onClose: () => void;
}

interface PreviewRow {
  __row?: number;
  work_order?: string;
  sales_order?: string;
  quantity_order?: number;
  quantity_unit?: number | LookupResponseDto;
  work_center?: number | LookupResponseDto;
  planned_start_time?: string;
  release_date?: string | null;
  due_date?: string | null;
  job_priority?: number | LookupResponseDto;
  notes?: string;
  attribute?: Record<string, unknown> | null;
}

interface DataPayload {
  work_order: string;
  sales_order: string;
  quantity_order: number;
  quantity_unit: number;
  work_center: number;
  planned_start_time: string;
  release_date?: string | null;
  due_date?: string | null;
  job_priority: number;
  notes?: string;
  attribute?: Record<string, unknown> | null;
}

const columns = [
  "Row",
  "Work Order",
  "Sales Order",
  "Qty Order",
  "Qty Unit",
  "Work Center",
  "Planned Start",
  "Release Date",
  "Due Date",
  "Priority",
  "Notes",
  "Attribute",
];

const ImportPreviewTable: FunctionComponent<ImportPreviewTableProps> = (
  props,
) => {
  const populatedRows = (props.data?.data?.populated ?? []) as PreviewRow[];
  const unPopulatedRows = (props.data?.data?.unpopulated ?? [])
    .map((row) => row as Record<string, unknown>)
    .map(
      (row): DataPayload => ({
        work_order: String(row.work_order ?? ""),
        sales_order: String(row.sales_order ?? ""),
        quantity_order: Number(row.quantity_order ?? 0),
        quantity_unit: Number(row.quantity_unit ?? 0),
        work_center: Number(row.work_center ?? 0),
        planned_start_time: String(row.planned_start_time ?? ""),
        release_date: (row.release_date as string | null | undefined) ?? null,
        due_date: (row.due_date as string | null | undefined) ?? null,
        job_priority: Number(row.job_priority ?? 0),
        notes: row.notes ? String(row.notes) : undefined,
        attribute: (row.attribute as Record<string, unknown> | null | undefined) ?? null,
      }),
    );

  const showSnackbar = useSnackbar();

  const formatLookup = (value?: number | LookupResponseDto): string => {
    if (typeof value === "number") return String(value);
    if (!value) return "-";
    return value.label || value.code || String(value.id) || "-";
  };

  const formatDate = (value?: string | null) => {
    if (!value) return "-";
    const date = dayjs(value);
    return date.isValid() ? date.format("YYYY-MM-DD HH:mm") : value;
  };

  const formatAttribute = (value?: Record<string, unknown> | null) => {
    if (!value || Object.keys(value).length === 0) return "-";
    return Object.entries(value)
      .map(([key, val]) => `${key}: ${String(val)}`)
      .join(", ");
  };

  const handleSubmit = async () => {
    try {
      await commonApi.jobOffsetPrinterTaiyoControllerBatchCreate(
        unPopulatedRows as unknown as Record<string, unknown>[],
      );
      showSnackbar("Job created successfully", "success");
      props.onClose();
    } catch (error: any) {
      showSnackbar(error?.response?.data?.message ?? "Import failed", "error");
    }
  };

  const renderSection = (title: string, rows: PreviewRow[]) => (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
        {title} ({rows.length})
      </Typography>
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{ overflowX: "auto", whiteSpace: "nowrap" }}
      >
        <Table size="small" sx={{ minWidth: 1200 }}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column}>{column}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  No rows
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row, index) => (
                <TableRow key={`${title}-${row.__row ?? index}`}>
                  <TableCell sx={{ minWidth: 50 }}>
                    {row.__row ?? "-"}
                  </TableCell>
                  <TableCell sx={{ minWidth: 150 }}>
                    {row.work_order ?? "-"}
                  </TableCell>
                  <TableCell sx={{ minWidth: 150 }}>
                    {row.sales_order ?? "-"}
                  </TableCell>
                  <TableCell sx={{ minWidth: 100 }}>
                    {row.quantity_order ?? "-"}
                  </TableCell>
                  <TableCell sx={{ minWidth: 90 }}>
                    {formatLookup(row.quantity_unit)}
                  </TableCell>
                  <TableCell sx={{ minWidth: 150 }}>
                    {formatLookup(row.work_center)}
                  </TableCell>
                  <TableCell sx={{ minWidth: 150 }}>
                    {formatDate(row.planned_start_time)}
                  </TableCell>
                  <TableCell sx={{ minWidth: 150 }}>
                    {formatDate(row.release_date)}
                  </TableCell>
                  <TableCell sx={{ minWidth: 150 }}>
                    {formatDate(row.due_date)}
                  </TableCell>
                  <TableCell sx={{ minWidth: 150 }}>
                    <GenericChips value={formatLookup(row.job_priority)} variant="filled"/>
                  </TableCell>
                  <TableCell sx={{ minWidth: 150 }}>
                    {row.notes ?? "-"}
                  </TableCell>
                  <TableCell sx={{ minWidth: 150 }}>
                    {formatAttribute(row.attribute)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  return (
    <Fragment>
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2">
          Total Rows: {props.data?.total_rows ?? 0}
        </Typography>
        <Typography variant="subtitle2" color="success.main">
          Valid Rows: {props.data?.valid_rows ?? 0}
        </Typography>
        <Typography variant="subtitle2" color="error.main">
          Invalid Rows: {props.data?.invalid_rows ?? 0}
        </Typography>
      </Box>

      {renderSection("Import Data", populatedRows)}
      <Button onClick={handleSubmit} variant="contained" fullWidth>
        Import Job
      </Button>
    </Fragment>
  );
};

export default ImportPreviewTable;
