"use client";

import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik, FormikProps } from "formik";
import { loginValidationSchema } from "./validation/auth.validation";
import { IAuthRegister } from "@/interface/auth.interface";
import { apiClient } from "@/utils/apiHelper";
import { useEffect, useState } from "react";
import { randomPassword } from "@/utils/passwordGenerator";
import { IEditUser, UserRole } from "@/interface/user.interface";
import { editValidationSchema } from "./validation/user.validation";
import { useSnackbar } from "@/hooks/useSnackbar";

interface IEditFormProps {
  data: {
    id: string;
    username: string;
    role: string;
  };
  onSuccess: () => void;
  onCancel: () => void;
}

const EditForm = ({ data, onSuccess, onCancel }: IEditFormProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const showSnackbar = useSnackbar();

  const onSubmit = async (values: IEditUser) => {
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await apiClient.patch("/user/edit", {
        id: data.id,
        role: values.role,
      });
      onSuccess();
      showSnackbar("User updated successfully", "success");
    } catch (error: any) {
      console.log(error);
      setErrorMessage(
        error.response?.data?.message || "An unexpected error occurred",
      );
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        role: data.role,
      }}
      validationSchema={editValidationSchema}
      onSubmit={onSubmit}
    >
      {(props: FormikProps<IEditUser>) => {
        const { errors, touched, values, handleBlur, handleChange } = props;

        return (
          <Form>
            <Grid container spacing={2} marginTop={1}>
              <Grid size={12}>
                <FormControl
                  fullWidth
                  error={touched.role && Boolean(errors.role)}
                >
                  <InputLabel id="role-label">Role</InputLabel>
                  <Select
                    labelId="role-label"
                    id="role"
                    name="role"
                    value={values.role}
                    label="Role"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <MenuItem value="operator">Operator</MenuItem>
                    <MenuItem value="ppic">PPIC</MenuItem>
                    <MenuItem value="maintenance">Maintenance</MenuItem>
                    <MenuItem value="administrator">Administrator</MenuItem>
                    <MenuItem value="maintenance_administrator">
                      Maintenance Administrator
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {errorMessage && (
                <Grid size={12}>
                  <Typography color="error" variant="body2">
                    {errorMessage}
                  </Typography>
                </Grid>
              )}
              <Grid container size={12}>
                <Grid size={6}>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={onCancel}
                    fullWidth
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid size={6}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading}
                    loading={loading}
                  >
                    {loading ? "Updating..." : "Update"}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default EditForm;
