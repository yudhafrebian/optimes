"use client";
import WarningIcon from "@mui/icons-material/Warning";
import { Box, Button, Typography } from "@mui/material";
import * as React from "react";
import GenericChips from "../core/GenericChips";
import dayjs from "dayjs";
import { valueConverter } from "@/utils/valueConverter";
import { useSnackbar } from "@/hooks/useSnackbar";
import { commonApi } from "@/lib/api";
import {
  CreateJobOffsetPrinterTaiyoDto,
  LookupResponseDto,
  UpdateJobOffsetPrinterTaiyoDto,
} from "@/api/generated/common-service";

type EditJobConfirmationData = UpdateJobOffsetPrinterTaiyoDto & {
  id: string;
  work_order: string;
  sales_order: string;
  quantity_order: number;
  quantity_unit: number;
  work_center: number;
  planned_start_time: string;
  job_priority: number;
};

type IJobConfirmationViewProps =
  | {
      data: CreateJobOffsetPrinterTaiyoDto;
      type: "create";
      onBack: () => void;
      onSuccess: () => void;
    }
  | {
      data: EditJobConfirmationData;
      type: "edit";
      onBack: () => void;
      onSuccess: () => void;
    };

const JobConfirmationView: React.FunctionComponent<IJobConfirmationViewProps> = (
  props,
) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [workCenter, setWorkCenter] = React.useState<LookupResponseDto>();
  const [quantityUnit, setQuantityUnit] = React.useState<LookupResponseDto>();
  const [jobPriority, setJobPriority] = React.useState<LookupResponseDto>();
  const showSnackbar = useSnackbar();

  const onSubmit = async () => {
    try {
      setLoading(true);
      if (props.type === "create") {
        await commonApi.jobOffsetPrinterTaiyoControllerCreate(props.data);
      } else {
        await commonApi.jobOffsetPrinterTaiyoControllerUpdate(
          props.data.id,
          props.data,
        );
      }

      props.onSuccess();
      if (props.type === "create") {
        showSnackbar("Job created successfully", "success");
      } else {
        showSnackbar("Job updated successfully", "success");
      }
    } catch (error: any) {
      console.log(error);
      showSnackbar(error.response.data.message, "error");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const getMachineId = async () => {
      try {
        const [workCenterRes, quantityUnitRes, jobPriorityRes] =
          await Promise.all([
            commonApi.lookupControllerFindOne(props.data.work_center.toString()),
            commonApi.lookupControllerFindOne(props.data.quantity_unit.toString()),
            commonApi.lookupControllerFindOne(props.data.job_priority.toString()),
          ]);
        setWorkCenter(workCenterRes);
        setQuantityUnit(quantityUnitRes);
        setJobPriority(jobPriorityRes);
      } catch (error: any) {
        console.log(error);
        showSnackbar(error.response.data.message, "error");
      }
    };
    getMachineId();
  }, [
    props.data.job_priority,
    props.data.quantity_unit,
    props.data.work_center,
    showSnackbar,
  ]);

  return (
    <Box>
      <Typography>Please check carefully the job data below: </Typography>
      <Box
        sx={{
          bgcolor: "#f5f5f5",
          p: 2,
          my: 2,
          borderRadius: 2,
          border: "1px dashed #ccc",
        }}
      >
        <Typography variant="body2">
          <strong>Work Order:</strong> {props.data.work_order}
        </Typography>
        <Typography variant="body2">
          <strong>Sales Order:</strong> {props.data.sales_order}
        </Typography>
        <Typography variant="body2">
          <strong>Machine:</strong> {workCenter?.label ?? "N/A"}
        </Typography>
        <Typography variant="body2">
          <strong>Quantity Order:</strong> {props.data.quantity_order}
        </Typography>
        <Typography variant="body2">
          <strong>Quantity Unit:</strong>{" "}
          {valueConverter(String(quantityUnit?.label ?? "N/A"), "unit")}
        </Typography>
        <Typography variant="body2">
          <strong>Planned Start Time:</strong>{" "}
          {dayjs(props.data.planned_start_time).format("HH:mm:ss - DD/MM/YYYY")}
        </Typography>
        <Typography variant="body2">
          <strong>Due Date:</strong>{" "}
          {props.data.due_date
            ? dayjs(props.data.due_date).format("HH:mm:ss - DD/MM/YYYY")
            : "N/A"}
        </Typography>
        <Box sx={{ display: "flex", gap: 2, my: 1 }}>
          <Typography variant="body2">
            <strong>Job Priority:</strong>
          </Typography>
          <GenericChips
            value={
              valueConverter(String(jobPriority?.label ?? "N/A"), "priority") ??
              "-"
            }
            variant="filled"
          />
        </Box>
        <Typography variant="body2">
          <strong>Note:</strong> {props.data.notes}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <WarningIcon sx={{ color: "warning.main" }} />
        <Typography color="warning">
          If you already sure, please click confirm.
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
        <Button
          fullWidth
          variant="outlined"
          color="error"
          onClick={props.onBack}
        >
          Back
        </Button>
        <Button fullWidth variant="contained" onClick={onSubmit}>
          {loading ? "Confirming..." : "Confirm"}
        </Button>
      </Box>
    </Box>
  );
};

export default JobConfirmationView;
