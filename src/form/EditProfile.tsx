"use client";

import {
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik, FormikProps } from "formik";
import { useState } from "react";
import {
  editProfileValidationSchema,
} from "./validation/user.validation";
import { useSnackbar } from "@/hooks/useSnackbar";
import { commonApi } from "@/lib/api";
import { EditAccountDto } from "@/api/generated/common-service";
import { useAtom } from "jotai";
import { authAtom } from "@/atoms/auth.atom";

interface IEditFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const EditProfileForm = ({ onSuccess, onCancel }: IEditFormProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [auth, setAuth] = useAtom(authAtom);

  const showSnackbar = useSnackbar();

  const onSubmit = async (values: EditAccountDto) => {
    try {
      setLoading(true);
      setErrorMessage(null);
      const id = auth?.id;

      if (!id) throw new Error("User ID is required");

      await commonApi.accountControllerEditAccount(id, values);

      if(auth){
        setAuth({
          ...auth,
          username: values.username ?? "",
          email: values.email ?? "",
          full_name: values.full_name ?? "",
          phone_number: values.phone_number ?? "",
        });
      }

      onSuccess();
      showSnackbar("Profile updated successfully", "success");
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
    <Formik<EditAccountDto>
      enableReinitialize
      initialValues={{
        username: auth?.username ?? "",
        email: auth?.email ?? "",
        full_name: auth?.full_name ?? "",
        phone_number: auth?.phone_number ?? "",
      }}
      validationSchema={editProfileValidationSchema}
      onSubmit={onSubmit}
    >
      {(props: FormikProps<EditAccountDto>) => {
        const { errors, touched, values, handleBlur, handleChange } = props;

        return (
          <Form>
            <Grid container spacing={2} marginTop={1}>
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.username && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="full_name"
                  value={values.full_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.full_name && Boolean(errors.full_name)}
                  helperText={touched.full_name && errors.full_name}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone_number"
                  value={values.phone_number}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.phone_number && Boolean(errors.phone_number)}
                  helperText={touched.phone_number && errors.phone_number}
                />
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

export default EditProfileForm;
