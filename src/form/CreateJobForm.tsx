import { AccountResponseDto, LookupResponseDto } from "@/api-client";
import GenericChips from "@/components/core/GenericChips";
import { useSnackbar } from "@/hooks/useSnackbar";
import { accountsApi, lookupApi } from "@/lib/api";
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import { Form, Formik, FormikProps, useFormikContext } from "formik";
import * as React from "react";
import { createJobValidationSchema } from "./validation/job.validation";
import { error } from "console";

interface ICreateJobFormProps {
  onSuccess: (data: any) => void;
  onCancel: () => void;
  initialValues?: CreateJobFormValues;
  onValuesChange?: (values: CreateJobFormValues) => void;
}

export interface CreateJobFormValues {
  work_order: string;
  sales_order: string;
  quantity_order: number;
  quantity_unit: string; // Isinya: { label: "BK", code: "BK", ... }
  planned_start_time: string;
  machine_id: string;
  due_date?: string;
  job_priority: string; // Isinya: { label: "High", code: "HIGH", ... }
  notes?: string;
}

export const defaultJobFormValues: CreateJobFormValues = {
  sales_order: "",
  work_order: "",
  machine_id: "",
  quantity_order: 1,
  quantity_unit: "",
  planned_start_time: "",
  due_date: "",
  job_priority: "",
  notes: "",
};

const FormObserver: React.FunctionComponent<{
  onChange: (values: CreateJobFormValues) => void;
}> = ({ onChange }) => {
  const { values } = useFormikContext<CreateJobFormValues>();

  React.useEffect(() => {
    onChange(values);
  }, [onChange, values]);

  return null;
};

export const quantityUnitOptions: LookupResponseDto[] = [
  {
    id: 101,
    lookup_type: "QUANTITY_UNIT",
    code: "BK",
    label: "Book",
    is_active: true,
  },
  {
    id: 102,
    lookup_type: "QUANTITY_UNIT",
    code: "EA",
    label: "Each",
    is_active: true,
  },
];

export const priorityOptions: LookupResponseDto[] = [
  {
    id: 1,
    lookup_type: "JOB_PRIORITY",
    code: "HIGH",
    label: "High",
    is_active: true,
  },
  {
    id: 2,
    lookup_type: "JOB_PRIORITY",
    code: "MEDIUM",
    label: "Medium",
    is_active: true,
  },
  {
    id: 3,
    lookup_type: "JOB_PRIORITY",
    code: "LOW",
    label: "Low",
    is_active: true,
  },
];

const CreateJobForm: React.FunctionComponent<ICreateJobFormProps> = ({
  onCancel,
  onSuccess,
  initialValues,
  onValuesChange,
}) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [machineOptions, setMachineOptions] = React.useState<
    LookupResponseDto[]
  >([]);
  const showSnackbar = useSnackbar();

  const onSubmit = async (values: CreateJobFormValues) => {
    try {
      setLoading(true);
      console.log(values);

      onSuccess(values);
    } catch (error: any) {
      console.log(error);
      showSnackbar(error.response.data.message, "error");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const fetchUserOptions = async () => {
      try {
        const res = await lookupApi.lookupControllerFindAll("MACHINE_LIST");

        setMachineOptions(res.data);
      } catch (error: any) {
        console.log(error);
        showSnackbar(error.response.data.message, "error");
      }
    };

    fetchUserOptions();
  }, []);
  return (
    <Formik<CreateJobFormValues>
      initialValues={initialValues ?? defaultJobFormValues}
      validationSchema={createJobValidationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {(prop: FormikProps<CreateJobFormValues>) => {
        const {
          values,
          touched,
          errors,
          handleBlur,
          handleChange,
          setFieldValue,
        } = prop;

        return (
          <Form style={{ display: "flex", gap: 20 }}>
            {onValuesChange && <FormObserver onChange={onValuesChange} />}
            <Box sx={{ flex: 1 }}>
              <Grid container size={6} spacing={2}>
                <Grid size={12}>
                  <TextField
                    fullWidth
                    id="sales_order"
                    name="sales_order"
                    label="Sales Order"
                    value={values.sales_order}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.sales_order && Boolean(errors.sales_order)}
                    helperText={touched.sales_order && errors.sales_order}
                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    fullWidth
                    id="work_order"
                    name="work_order"
                    label="Work Order"
                    value={values.work_order}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.work_order && Boolean(errors.work_order)}
                    helperText={touched.work_order && errors.work_order}
                  />
                </Grid>
                <Grid size={12}>
                  <FormControl fullWidth>
                    <InputLabel id="machine_id">Machine</InputLabel>
                    <Select
                      labelId="machine_id"
                      id="machine_id"
                      name="machine_id"
                      value={values.machine_id}
                      label="Machine"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.machine_id && Boolean(errors.machine_id)}
                    >
                      {machineOptions.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid size={12}>
                  <Grid container spacing={2}>
                    <Grid size={8}>
                      <TextField
                        fullWidth
                        id="quantity_order"
                        name="quantity_order"
                        label="Quantity Order"
                        type="number"
                        inputProps={{ min: 1, style: { textAlign: "right" } }}
                        value={values.quantity_order}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          touched.quantity_order &&
                          Boolean(errors.quantity_order)
                        }
                        helperText={
                          touched.quantity_order && errors.quantity_order
                        }
                      />
                    </Grid>
                    <Grid size={4}>
                      <FormControl fullWidth>
                        <InputLabel id="quantity_unit">
                          Quantity Unit
                        </InputLabel>
                        <Select
                          labelId="quantity_unit"
                          id="quantity_unit"
                          name="quantity_unit"
                          value={values.quantity_unit}
                          label="Quantity Unit"
                          onChange={handleChange}
                          error={
                            touched.quantity_unit &&
                            Boolean(errors.quantity_unit)
                          }
                        >
                          {quantityUnitOptions.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                              {option.label} ({option.code})
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid size={12}>
                  <DateTimePicker
                    ampm={false}
                    label="Planned Date"
                    value={
                      values.planned_start_time
                        ? dayjs(values.planned_start_time)
                        : null
                    }
                    onChange={(value) =>
                      setFieldValue(
                        "planned_start_time",
                        value ? value.toDate() : null,
                      )
                    }
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error:
                          touched.planned_start_time &&
                          Boolean(errors.planned_start_time),
                        helperText:
                          touched.planned_start_time &&
                          (errors.planned_start_time as string),
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Box>

            <Divider orientation="vertical" flexItem />

            <Box sx={{ flex: 1 }}>
              <Grid container size={6} spacing={2}>
                <Grid size={12}>
                  <DateTimePicker
                    ampm={false}
                    label="Due Date"
                    value={values.due_date ? dayjs(values.due_date) : null}
                    onChange={(value) =>
                      setFieldValue("due_date", value ? value.toDate() : null)
                    }
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: touched.due_date && Boolean(errors.due_date),
                        helperText:
                          touched.due_date && (errors.due_date as string),
                      },
                    }}
                  />
                </Grid>

                <Grid size={12}>
                  <FormControl fullWidth>
                    <InputLabel id="job_priority">Priority</InputLabel>
                    <Select
                      labelId="job_priority"
                      id="job_priority"
                      name="job_priority"
                      value={values.job_priority}
                      label="Priority"
                      onChange={handleChange}
                      error={
                        touched.job_priority && Boolean(errors.job_priority)
                      }
                    >
                      {priorityOptions.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          <GenericChips value={option.label} variant="filled" />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid size={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Note"
                    name="notes"
                    value={values.notes}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.notes && Boolean(errors.notes)}
                    helperText={touched.notes && errors.notes}
                  />
                </Grid>
                <Grid size={12}>
                  <Grid container spacing={2}>
                    <Grid size={6}>
                      <Button
                        variant="outlined"
                        color="error"
                        fullWidth
                        onClick={onCancel}
                      >
                        Cancel
                      </Button>
                    </Grid>
                    <Grid size={6}>
                      <Button variant="contained" fullWidth type="submit">
                        {loading ? "Creating..." : "Create"}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CreateJobForm;
