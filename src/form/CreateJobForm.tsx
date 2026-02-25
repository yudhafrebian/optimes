import {
  CreateJobOffsetPrinterTaiyoDto,
  LookupResponseDto,
} from "@/api/generated/common-service";
import GenericChips from "@/components/core/GenericChips";
import { useSnackbar } from "@/hooks/useSnackbar";
import { commonApi } from "@/lib/api";
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
  Typography,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import { Form, Formik, FormikProps, useFormikContext } from "formik";
import * as React from "react";
import { createJobValidationSchema } from "./validation/job.validation";

interface ICreateJobFormProps {
  onSuccess: (data: any) => void;
  onCancel: () => void;
  initialValues?: CreateJobOffsetPrinterTaiyoDto;
  onValuesChange?: (values: CreateJobOffsetPrinterTaiyoDto) => void;
}

export const defaultJobFormValues: CreateJobOffsetPrinterTaiyoDto = {
  sales_order: "",
  work_order: "",
  work_center: 0,
  quantity_order: 1,
  quantity_unit: 0,
  planned_start_time: "",
  due_date: "",
  job_priority: 0,
  notes: "",
};

const FormObserver: React.FunctionComponent<{
  onChange: (values: CreateJobOffsetPrinterTaiyoDto) => void;
}> = ({ onChange }) => {
  const { values } = useFormikContext<CreateJobOffsetPrinterTaiyoDto>();

  React.useEffect(() => {
    onChange(values);
  }, [onChange, values]);

  return null;
};

const CreateJobForm: React.FunctionComponent<ICreateJobFormProps> = ({
  onCancel,
  onSuccess,
  initialValues,
  onValuesChange,
}) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [workCenter, setWorkCenter] = React.useState<LookupResponseDto[]>([]);
  const [quantityUnit, setQuantityUnit] = React.useState<LookupResponseDto[]>([]);
  const [priority, setPriority] = React.useState<LookupResponseDto[]>([]);
  const showSnackbar = useSnackbar();

  const onSubmit = async (values: CreateJobOffsetPrinterTaiyoDto) => {
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
        const [workCenter, quantityUnit, priority] = await Promise.all([
          commonApi.lookupControllerFindAll({ type: "WORK_CENTER" }),
          commonApi.lookupControllerFindAll({ type: "QUANTITY_UNIT" }),
          commonApi.lookupControllerFindAll({ type: "JOB_PRIORITY" }),
        ]);
        setWorkCenter(workCenter);
        setQuantityUnit(quantityUnit);
        setPriority(priority);
      } catch (error: any) {
        console.log(error);
        showSnackbar(error.response.data.details[0].message, "error");
      }
    };

    fetchUserOptions();
  }, []);
  return (
    <Formik<CreateJobOffsetPrinterTaiyoDto>
      initialValues={initialValues ?? defaultJobFormValues}
      validationSchema={createJobValidationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {(prop: FormikProps<CreateJobOffsetPrinterTaiyoDto>) => {
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
                    <InputLabel id="work_center">Work Center</InputLabel>
                    <Select
                      labelId="work_center"
                      id="work_center"
                      name="work_center"
                      value={values.work_center}
                      label="Work Center"
                      onChange={(event) =>
                        setFieldValue("work_center", Number(event.target.value))
                      }
                      onBlur={handleBlur}
                      error={touched.work_center && Boolean(errors.work_center)}
                    >
                      <MenuItem value={0} disabled>
                        Select Work Center
                      </MenuItem>
                      {workCenter.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    <Typography variant="caption" color="error">
                      {touched.work_center && errors.work_center}
                    </Typography>
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
                          onChange={(event) =>
                            setFieldValue(
                              "quantity_unit",
                              Number(event.target.value),
                            )
                          }
                          error={
                            touched.quantity_unit &&
                            Boolean(errors.quantity_unit)
                          }
                        >
                          <MenuItem value={0} disabled>
                            Select Quantity Unit
                          </MenuItem>
                          {quantityUnit.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                              {option.label} ({option.code})
                            </MenuItem>
                          ))}
                        </Select>
                        <Typography variant="caption" color="error">
                          {touched.quantity_unit && errors.quantity_unit}
                        </Typography>
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
                      onChange={(event) =>
                        setFieldValue("job_priority", Number(event.target.value))
                      }
                      error={
                        touched.job_priority && Boolean(errors.job_priority)
                      }
                    >
                      <MenuItem value={0} disabled>
                        Select Priority
                      </MenuItem>
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
