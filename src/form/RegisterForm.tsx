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
import {
  loginValidationSchema,
  registerValidationSchema,
} from "./validation/auth.validation";
import { IAuthRegister } from "@/interface/auth.interface";
import { apiClient } from "@/utils/apiHelper";
import { useEffect, useState } from "react";
import { randomPassword } from "@/utils/passwordGenerator";
import { useSnackbar } from "@/hooks/useSnackbar";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";

interface IRegisterFormProps {
  onSuccess: (data: any) => void;
  onCancel: () => void;
}

const RegisterForm = ({ onSuccess, onCancel }: IRegisterFormProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const showSnackbar = useSnackbar();

  const onSubmit = async (values: IAuthRegister) => {
    try {
      setLoading(true);
      setErrorMessage(null);

      const payload = {
        username: values.username,
        full_name: values.full_name,
        area: values.area,
        site: values.site,
        account_type: values.account_type,
        account_expiry_date: values.account_expiry_date,
        password_status: values.password_status,
        role: values.role,
        password: values.password,
        password_expiry_date: values.password_expiry_date,
        must_change_password: values.must_change_password,
        created_date: values.created_date,
      };

      await apiClient.post("/auth/register", payload);

      onSuccess(payload);
      showSnackbar("Registration successful", "success");
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message || "An unexpected error occurred",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik<IAuthRegister>
      initialValues={{
        username: "",
        full_name: "",
        area: "",
        site: "",
        account_type: "",
        account_expiry_date: new Date(),
        password_status: "temporary",
        role: "",
        password: "",
        password_expiry_date: new Date(),
        must_change_password: true,
        created_date: new Date(),
      }}
      validationSchema={registerValidationSchema}
      onSubmit={onSubmit}
    >
      {(props: FormikProps<IAuthRegister>) => {
        const {
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          setFieldValue,
        } = props;

        useEffect(() => {
          const generated = randomPassword(12);
          setFieldValue("password", generated);
        }, []);

        return (
          <Form>
            <Grid container spacing={2} mt={1}>
              <Grid size={12}>
                <TextField
                  id="username"
                  name="username"
                  label="Username"
                  fullWidth
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.username && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  id="full_name"
                  name="full_name"
                  label="Full Name"
                  fullWidth
                  value={values.full_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.full_name && Boolean(errors.full_name)}
                  helperText={touched.full_name && errors.full_name}
                />
              </Grid>
              <Grid container size={12} spacing={2}>
                <Grid size={6}>
                  <TextField
                    id="area"
                    name="area"
                    label="Area"
                    fullWidth
                    value={values.area}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.area && Boolean(errors.area)}
                    helperText={touched.area && errors.area}
                  />
                </Grid>

                <Grid size={6}>
                  <TextField
                    id="site"
                    name="site"
                    label="Site"
                    fullWidth
                    value={values.site}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.site && Boolean(errors.site)}
                    helperText={touched.site && errors.site}
                  />
                </Grid>
              </Grid>

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
                  >
                    <MenuItem value="operator">Operator</MenuItem>
                    <MenuItem value="ppic">PPIC</MenuItem>
                    <MenuItem value="maintenance">Maintenance</MenuItem>
                    <MenuItem value="administrator">Administrator</MenuItem>
                    <MenuItem value="maintenance_administrator">
                      Maintenance Administrator
                    </MenuItem>
                  </Select>
                  {touched.role && errors.role && (
                    <Typography
                      variant="caption"
                      color="error"
                      sx={{ ml: 2, mt: 0.5 }}
                    >
                      {errors.role}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid container size={12} spacing={2}>
                <Grid size={6}>
                  <FormControl
                    fullWidth
                    error={touched.role && Boolean(errors.role)}
                  >
                    <InputLabel id="account_type-label">
                      Account Type
                    </InputLabel>
                    <Select
                      labelId="account_type-label"
                      id="account_type"
                      name="account_type"
                      value={values.account_type}
                      label="Employment Type"
                      onChange={(e) => {
                        const value = e.target.value;
                        setFieldValue("account_type", value);

                        if (value === "permanent") {
                          setFieldValue("account_expiry_date", null);
                        }
                      }}
                    >
                      <MenuItem value="permanent">Permanent</MenuItem>
                      <MenuItem value="temporary">Temporary</MenuItem>
                    </Select>
                    {touched.account_type && errors.account_type && (
                      <Typography
                        variant="caption"
                        color="error"
                        sx={{ ml: 2, mt: 0.5 }}
                      >
                        {errors.account_type}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
                <Grid size={6}>
                  <DateTimePicker
                  ampm={false}
                    disabled={
                      values.account_type === "permanent" ||
                      !values.account_type
                    }
                    label="Account Expiration Date"
                    value={values.account_expiry_date ? dayjs(values.account_expiry_date) : null}
                    onChange={(value) =>
                      setFieldValue(
                        "account_expiry_date",
                        value ? value.toDate() : null,
                      )
                    }
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error:
                          touched.account_expiry_date &&
                          Boolean(errors.account_expiry_date),
                        helperText:
                          touched.account_expiry_date &&
                          (errors.account_expiry_date as string),
                      },
                    }}
                  />
                </Grid>
              </Grid>

              <Grid size={12}>
                <DateTimePicker
                  ampm={false}
                  label="Password Expiration Date"
                  value={dayjs(values.password_expiry_date)}
                  onChange={(value) =>
                    setFieldValue(
                      "password_expiry_date",
                      value ? value.toDate() : null,
                    )
                  }
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error:
                        touched.password_expiry_date &&
                        Boolean(errors.password_expiry_date),
                      helperText:
                        touched.password_expiry_date &&
                        (errors.password_expiry_date as string),
                    },
                  }}
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
                    {loading ? "Creating..." : "Create"}
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

export default RegisterForm;
