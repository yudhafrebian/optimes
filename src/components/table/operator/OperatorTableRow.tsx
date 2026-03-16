"use client";
import * as React from "react";
import { TableRow, TableCell, Button } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import GenericChips from "@/components/core/GenericChips";
import dayjs from "dayjs";
import { OperatorRowData } from "@/interface/row-table.interface";
import { useAtom } from "jotai";
import { loadedDataAtom, loaderAtom } from "@/atoms/loader.atom";
import { assetsApi, commonApi } from "@/lib/api";
import GenericDialog from "@/components/dialog/GenericDialog";
import { getExecutionDialogConfig } from "@/components/dialog/executionDialogConfig";
import { useSnackbar } from "@/hooks/useSnackbar";
import { LookupResponseDto } from "@/api/generated/common-service";

interface OperatorTableRowProps {
  row: OperatorRowData;
}

const toLookupJson = (lookup: LookupResponseDto) => ({
  id: lookup.id,
  lookup_type: lookup.lookup_type,
  code: lookup.code,
  label: lookup.label,
  description: lookup.description ?? null,
  sort_order: lookup.sort_order ?? null,
  is_active: lookup.is_active,
});

const OperatorTableRow: React.FC<OperatorTableRowProps> = ({ row }) => {
  const [dialogType, setDialogType] = React.useState<
    "load" | "unload" | "completed" | null
  >(null);
  const theme = useTheme();
  const status = row.job_lifecycle_state?.label?.toLowerCase() ?? "";
  const quantityUnitLabel = row.quantity_unit?.label ?? "-";
  const lifecycleLabel = row.job_lifecycle_state?.label ?? "-";
  const quantityOrder = row.quantity_order ?? "-";

  const [loader, setLoader] = useAtom(loaderAtom);
  const [, setLoaderData] = useAtom(loadedDataAtom);
  const showSnackbar = useSnackbar();

  const isDisabled = loader.isLoaded;

  const executionDialogConfig = getExecutionDialogConfig(dialogType);

  const getRowBg = (opacity: number) => {
    const map: Record<string, string> = {
      running: alpha(theme.palette.secondary.light, opacity),
      released: alpha(theme.palette.primary.light, opacity),
      scheduled: alpha(theme.palette.grey[500], opacity),
      created: alpha(theme.palette.info.light, opacity),
      "on hold": alpha(theme.palette.warning.light, opacity),
      suspended: alpha(theme.palette.warning.light, opacity),
      completed: alpha(theme.palette.success.light, opacity),
      disabled: alpha(theme.palette.error.light, opacity),
    };
    return map[status] ?? "transparent";
  };

  const handleOpenDialog = (type: "load" | "unload" | "completed") => {
    setDialogType(type);
  };

  const handleLoadJob = async () => {
    const values = {
      items: [
        {
          path: `${row.work_center.code}.Work Order`,
          value: row.work_order,
        },
        {
          path: `${row.work_center.code}.Job Lifecycle`,
          value: "load",
        },
        {
          path: `${row.work_center.code}.Job Loader`,
          value: {
            id: row.id,
            work_center: toLookupJson(row.work_center),
            work_order: row.work_order,
            sales_order: row.sales_order,
            quantity_order: row.quantity_order,
            quantity_unit: toLookupJson(row.quantity_unit),
            planned_start_time: row.planned_start_time,
            job_lifecycle_state: "Running",
            notes: row.notes,
          }
        }
      ],
    };
    try {
      const res = await assetsApi.setAssetValuesBatch(values);
      let latestJob = row;

      if (row.job_lifecycle_state.label !== "Running") {
        latestJob = await commonApi.jobOffsetPrinterTaiyoControllerRun(row.id);
      }
      console.log(res)

      setLoader({
        isLoaded: true,
        id: row.id,
      });

      setLoaderData({
        id: latestJob.id,
        work_center: latestJob.work_center,
        work_order: latestJob.work_order,
        sales_order: latestJob.sales_order,
        quantity_order: latestJob.quantity_order,
        quantity_unit: latestJob.quantity_unit,
        planned_start_time: latestJob.planned_start_time,
        job_lifecycle_state: latestJob.job_lifecycle_state,
        notes: latestJob.notes,
      });

      showSnackbar("Job loaded successfully", "success");
    } catch (error: any) {
      console.log(error);
      showSnackbar(error.response.data.message, "error");
    }
  };

  const handleUnloadJob = async () => {
    try {
      await assetsApi.setAssetValuesByPath(
        `${row.work_center.code}.Job Lifecycle`,
        { value: "unload" },
      );

      setLoader({
        isLoaded: false,
        id: "",
      });

      setLoaderData({
        id: "",
        work_center: {
          id: 0,
          lookup_type: "",
          code: "",
          label: "",
          is_active: false,
        },
        work_order: "",
        sales_order: "",
        quantity_order: 0,
        quantity_unit: {
          id: 0,
          lookup_type: "",
          code: "",
          label: "",
          is_active: false,
        },
        planned_start_time: "",
        job_lifecycle_state: {
          id: 0,
          lookup_type: "",
          code: "",
          label: "",
          is_active: false,
        },
        notes: "",
      });

      showSnackbar("Job unloaded successfully", "success");
    } catch (error: any) {
      console.log(error);
      showSnackbar(error.response.data.message, "error");
    }
  };

  return (
    <>
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
        <TableCell align="center" sx={{ width: 50 }}>
          <Button
            size="small"
            disabled={isDisabled || row.job_lifecycle_state.label === "Running"}
            variant="contained"
            startIcon={<PlayArrowIcon />}
            onClick={() => handleOpenDialog("load")}
          >
            Load
          </Button>
        </TableCell>

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
          {dayjs(row.release_date).isValid()
            ? dayjs(row.release_date).format("HH:mm:ss - DD/MM/YYYY")
            : "-"}
        </TableCell>

        <TableCell
          align="left"
          padding="normal"
          sx={{ textTransform: "capitalize", minWidth: 200 }}
        >
          {row.notes}
        </TableCell>
      </TableRow>

      <GenericDialog
        open={
          dialogType === "load" ||
          dialogType === "unload" ||
          dialogType === "completed"
        }
        onClose={() => setDialogType(null)}
        title={executionDialogConfig.title}
        content={executionDialogConfig.content}
        positiveText={executionDialogConfig.positiveText}
        subContent={executionDialogConfig.subContent}
        onConfirm={() => {
          dialogType === "load"
            ? handleLoadJob()
            : dialogType === "unload"
              ? handleUnloadJob()
              : null;
          setDialogType(null);
        }}
        onRefresh={() => {}}
      />
    </>
  );
};

export default React.memo(OperatorTableRow);
