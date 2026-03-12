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
  registerValidationSchema,
} from "./validation/auth.validation";
import { useEffect, useState } from "react";
import { useSnackbar } from "@/hooks/useSnackbar";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import { CreateAccountDto, LookupResponseDto } from "@/api/generated/common-service";
import { commonApi } from "@/lib/api";

interface IRegisterFormProps {
  onSuccess: (data: any) => void;
  onCancel: () => void;
}

const RegisterForm = ({ onSuccess, onCancel }: IRegisterFormProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [role, setRole] = useState<LookupResponseDto[]>([]);
  const [accountType, setAccountType] = useState<LookupResponseDto[]>([]);

  const fetchSelector = async () => {
    const role = await commonApi.lookupControllerFindAll({ type: "ACCOUNT_ROLE" });
    const accountType = await commonApi.lookupControllerFindAll({ type: "ACCOUNT_TYPE" });
    setRole(role);
    setAccountType(accountType);
  };

  const showSnackbar = useSnackbar();

  const onSubmit = async (values: CreateAccountDto) => {
    try {
      setLoading(true);
      setErrorMessage(null);
      console.log(values);

      const res = await commonApi.accountControllerCreate(values);

      onSuccess(res);
      showSnackbar("Registration successful", "success");
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message || "An unexpected error occurred",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSelector();
  }, []);

  return (
    <Formik<CreateAccountDto>
      initialValues={{
        username: "",
        full_name: "",
        phone_number: "",
        email: "",
        account_type: "" as any,
        account_role: "" as any,
        account_expiry_date: "",
        password_expiry_time: "",
      }}
      validationSchema={registerValidationSchema}
      onSubmit={onSubmit}
    >
      {(props: FormikProps<CreateAccountDto>) => {
        const {
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          setFieldValue,
        } = props;

        console.log(errors)

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
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    id="phone_number"
                    name="phone_number"
                    label="Phone Number"
                    fullWidth
                    value={values.phone_number}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.phone_number && Boolean(errors.phone_number)}
                    helperText={touched.phone_number && errors.phone_number}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    id="email"
                    name="email"
                    label="email"
                    fullWidth
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Grid>
              </Grid>

              <Grid size={12}>
                <FormControl
                  fullWidth
                  error={touched.account_role && Boolean(errors.account_role)}
                >
                  <InputLabel id="account_role-label">Role</InputLabel>
                  <Select
                    labelId="account_role-label"
                    id="account_role"
                    name="account_role"
                    value={values.account_role}
                    label="Role"
                    onChange={handleChange}
                  >
                    {role.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.account_role && errors.account_role && (
                    <Typography
                      variant="caption"
                      color="error"
                      sx={{ ml: 2, mt: 0.5 }}
                    >
                      {errors.account_role}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid container size={12} spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormControl
                    fullWidth
                    error={touched.account_type && Boolean(errors.account_type)}
                  >
                    <InputLabel id="account_type-label">
                      Account Type
                    </InputLabel>
                    <Select
                      labelId="account_type-label"
                      id="account_type"
                      name="account_type"
                      value={values.account_type}
                      label="Account Type"
                      onChange={(e) => {
                        const value = e.target.value;
                        setFieldValue("account_type", value);

                        if (value === 6) {
                          setFieldValue("account_expiry_date", null);
                        }
                      }}
                    >
                      {accountType.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.label}
                        </MenuItem>
                      ))}
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
                <Grid size={{ xs: 12, sm: 6 }}>
                  <DateTimePicker
                    ampm={false}
                    disabled={values.account_type === 6 || !values.account_type}
                    label="Account Expiration Date"
                    minDateTime={dayjs(new Date())}
                    value={
                      values.account_expiry_date
                        ? dayjs(values.account_expiry_date)
                        : null
                    }
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
                <Grid size={12}>
                  <DateTimePicker
                    ampm={false}
                    label="Password Expiration Time"
                    minDateTime={dayjs(new Date())}
                    value={
                      values.password_expiry_time
                        ? dayjs(values.password_expiry_time)
                        : null
                    }
                    onChange={(value) =>
                      setFieldValue(
                        "password_expiry_time",
                        value ? value.toDate() : null,
                      )
                    }
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error:
                          touched.password_expiry_time &&
                          Boolean(errors.password_expiry_time),
                        helperText:
                          touched.password_expiry_time &&
                          (errors.password_expiry_time as string),
                      },
                    }}
                  />
                </Grid>
              </Grid>

              {errorMessage && (
                <Grid size={12}>
                  <Typography color="error" variant="body2">
                    {errorMessage}
                  </Typography>
                </Grid>
              )}

              <Grid container size={12} spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={onCancel}
                    fullWidth
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
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
