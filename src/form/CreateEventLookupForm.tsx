"use client";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useSnackbar } from "@/hooks/useSnackbar";
import { commonApi } from "@/lib/api";
import { CreateLookupDto } from "@/api/generated/common-service";
import { lookupValidationSchema } from "./validation/lookup.validation";

interface CreateEventLookupFormProps {
  onSuccess: () => void;
}

const CreatEventLookupForm = ({ onSuccess }: CreateEventLookupFormProps) => {
  const showSnackbar = useSnackbar();

  const handleCreateEvent = async (values: CreateLookupDto) => {
    try {
      const normalizedLabel = values.label.trim().replace(/\s+/g, " ");
      const labelPrefix = Number.parseInt(normalizedLabel.split(" ")[0], 10);
      const normalLabel = normalizedLabel;

      values.label = normalizedLabel;
      if (!Number.isNaN(labelPrefix)) {
        values.label = values.label.split(" ").slice(1).join(" ");
      }
      const labelTrimer = values.label.trim().replace(/[^a-zA-Z0-9]/g, "");
      const codeBuilder = `${values.code}/${labelTrimer}`;
      const labelBuilder = `${values.code} - ${normalLabel}`;
      const payload = {
        lookup_type: values.lookup_type,
        code: codeBuilder,
        label: labelBuilder,
        description: values.description,
        is_active: true,
      };

      console.log(payload)

      await commonApi.lookupControllerCreate(payload);

      onSuccess();

      showSnackbar("Event created successfully", "success");
    } catch (error: any) {
      console.log(error);
      showSnackbar(error.response.data.message, "error");
    }
  };

  return (
    <Formik<CreateLookupDto>
      initialValues={{
        lookup_type: "TAIYO_EVENT_PALETTE",
        code: "",
        label: "",
        description: "",
      }}
      validationSchema={lookupValidationSchema}
      onSubmit={(values) => handleCreateEvent(values)}
    >
      {(props) => {
        const { errors, touched, handleBlur, handleChange, values } = props;
        return (
          <Form>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <FormControl fullWidth>
                  <InputLabel id="code" htmlFor="code">
                    Event Type
                  </InputLabel>
                  <Select
                    labelId="code"
                    id="code"
                    name="code"
                    label="Event Type"
                    value={values.code}
                    onChange={handleChange}
                  >
                    <MenuItem value="Setup">Setup</MenuItem>
                    <MenuItem value="Production">Production</MenuItem>
                    <MenuItem value="Idle">Idle</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  id="label"
                  name="label"
                  label="Label"
                  value={values.label}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.label && Boolean(errors.label)}
                  helperText={touched.label && errors.label}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  id="description"
                  name="description"
                  label="Description"
                  value={values.description ?? ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Button type="submit" variant="contained" fullWidth>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CreatEventLookupForm;
