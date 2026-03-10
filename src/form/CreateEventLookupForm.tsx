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
import LoginIcon from "@mui/icons-material/Login";
import { loginValidationSchema } from "./validation/auth.validation";
import { useState } from "react";
import { useSetAtom } from "jotai";
import { authAtom } from "@/atoms/auth.atom";
import { useRouter } from "next/navigation";
import { useSnackbar } from "@/hooks/useSnackbar";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { commonApi } from "@/lib/api";
import { CreateLookupDto } from "@/api/generated/common-service";
import { passwordAtom } from "@/atoms/password.atom";
import { lookupValidationSchema } from "./validation/lookup.validation";

interface CreateEventLookupFormProps {
  onSuccess: () => void;
}

const CreatEventLookupForm = ({ onSuccess }: CreateEventLookupFormProps) => {
  const showSnackbar = useSnackbar();

  const handleCreateEvent = async (values: CreateLookupDto) => {
    try {
      if(typeof values.label.split(" ")[0] === "number"){
       console.log(values.label = values.label.split(" ").slice(1).join(" ")) 
      }
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

      // await commonApi.lookupControllerCreate(payload);

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
