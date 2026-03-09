"use client";
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useSnackbar } from "@/hooks/useSnackbar";
import { commonApi } from "@/lib/api";
import { CreateLookupDto } from "@/api/generated/common-service";
import { lookupValidationSchema } from "./validation/lookup.validation";
import { LookupResponseDto } from "@/api-client";

interface EditEventLookupFormProps {
  onSuccess: () => void;
  data: LookupResponseDto;
}

const EditEventLookupForm = ({ onSuccess, data }: EditEventLookupFormProps) => {
  const showSnackbar = useSnackbar();
  const normalizeCode = data.code.split("/")[0];
  const normalizeLabel = data.label.split(" - ").slice(-1)[0];

  const handleEditEvent = async (values: CreateLookupDto) => {
    try {
      const labelTrimer = values.label.trim().replace(/\s+/g, "");
      const codeBuilder = `${values.code}/${labelTrimer}`;
      const labelBuilder = `${values.code} - ${values.label}`;
      const payload = {
        lookup_type: values.lookup_type,
        code: codeBuilder,
        label: labelBuilder,
        description: values.description,
        is_active: true,
      };
      console.log(payload);

      await commonApi.lookupControllerUpdate(String(data.id), payload);

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
        code: normalizeCode,
        label: normalizeLabel,
        description: data.description,
      }}
      validationSchema={lookupValidationSchema}
      onSubmit={(values) => handleEditEvent(values)}
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

export default EditEventLookupForm;
