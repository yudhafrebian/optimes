import { LookupResponseDto } from "@/api-client";
import GenericChips from "@/components/core/GenericChips";
import { useSnackbar } from "@/hooks/useSnackbar";
import { lookupApi } from "@/lib/api";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import { Form, Formik, FormikProps, useFormikContext } from "formik";
import * as React from "react";
import { createJobValidationSchema } from "./validation/job.validation";
import { JobRowData } from "@/interface/row-table.interface";

interface ICreateJobFormProps {
  data: JobRowData;
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
  work_center: string;
  due_date?: string;
  job_priority: string; // Isinya: { label: "High", code: "HIGH", ... }
  notes?: string;
}

const FormObserver: React.FunctionComponent<{
  onChange: (values: CreateJobFormValues) => void;
}> = ({ onChange }) => {
  const { values } = useFormikContext<CreateJobFormValues>();

  React.useEffect(() => {
    onChange(values);
  }, [onChange, values]);

  return null;
};



const EditJobForm: React.FunctionComponent<ICreateJobFormProps> = ({
  onCancel,
  onSuccess,
  initialValues,
  onValuesChange,
  data,
}) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [workCenter, setWorkCenter] = React.useState<LookupResponseDto[]>([]);
  const [quantityUnit, setQuantityUnit] = React.useState<LookupResponseDto[]>([]);
  const [priority, setPriority] = React.useState<LookupResponseDto[]>([]);
  console.log(data);

  const defaultJobFormValues: CreateJobFormValues = {
    sales_order: data.sales_order,
    work_order: data.work_order,
    work_center: String(data.work_center.id) ,
    quantity_order: data.quantity_order,
    quantity_unit: String(data.quantity_unit.id),
    planned_start_time: data.planned_start_time,
    due_date: data.due_date,
    job_priority: String(data.job_priority.id),
    notes: data.notes,
  };

  const showSnackbar = useSnackbar();

  const onSubmit = async (values: CreateJobFormValues) => {
    try {
      setLoading(true);
      const dataValues = {
        ...values,
        id: data.id,
      };
      console.log(dataValues);

      onSuccess(dataValues);
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
        const [workCenter, quantityUnit, priority] = await Promise.all([
          lookupApi.lookupControllerFindAll("WORK_CENTER"),
          lookupApi.lookupControllerFindAll("QUANTITY_UNIT"),
          lookupApi.lookupControllerFindAll("JOB_PRIORITY"),
        ]);
        setWorkCenter(workCenter.data);
        setQuantityUnit(quantityUnit.data);
        setPriority(priority.data);
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

        const plannedStart = values.planned_start_time
          ? dayjs(values.planned_start_time)
          : null;

        return (
          <Form style={{ display: "flex", gap: 20 }}>
            {onValuesChange && <FormObserver onChange={onValuesChange} />}
            <Box sx={{ flex: 1 }}>
              <Grid container size={6} spacing={2}>
                <Grid size={12}>
                  <TextField
                    fullWidth
                    disabled
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
                    disabled
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
                    <InputLabel id="work_center">Machine</InputLabel>
                    <Select
                      labelId="work_center"
                      id="work_center"
                      name="work_center"
                      value={values.work_center}
                      label="Machine"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.work_center && Boolean(errors.work_center)}
                    >
                      {workCenter.map((option) => (
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
                          {quantityUnit.map((option) => (
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
                    value={plannedStart}
                    onChange={(value) => {
                      setFieldValue(
                        "planned_start_time",
                        value ? value.toDate() : null,
                      );

                      if (
                        value &&
                        values.due_date &&
                        dayjs(values.due_date).isBefore(value)
                      ) {
                        setFieldValue("due_date", null);
                      }
                    }}
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
                    minDateTime={plannedStart ?? undefined}
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
                      {priority.map((option) => (
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
                    disabled
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
                        {loading ? "Updating..." : "Update"}
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

export default EditJobForm;
