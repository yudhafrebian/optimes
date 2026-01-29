"use client";

import {
  Button,
  Grid,
  Typography,
} from "@mui/material";
import { Form, Formik, FormikProps } from "formik";
import { useEffect, useState } from "react";
import { randomPassword } from "@/utils/passwordGenerator";
import { useSnackbar } from "@/hooks/useSnackbar";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import { IResetPasswordAdmin } from "@/interface/user.interface";
import { resetPasswordAdminValidationSchema } from "./validation/user.validation";

interface ISuspendFormProps {
  onSuccess: (data: any) => void;
  onCancel: () => void;
}

const ResetPasswordAdminForm = ({ onSuccess, onCancel }: ISuspendFormProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const showSnackbar = useSnackbar();

  const onSubmit = async (values: IResetPasswordAdmin) => {
    try {
      setLoading(true);
      setErrorMessage(null);

      const payload = {
        password: values.password,
        password_status: values.password_status,
        password_expiry_date: values.password_expiry_date,
      };

      //   await apiClient.post("/auth/register", payload);

      onSuccess(payload);
      showSnackbar("Reset Password successful", "success");
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message || "An unexpected error occurred",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik<IResetPasswordAdmin>
      initialValues={{
        password: "",
        password_status: "temporary",
        password_expiry_date: new Date(),
      }}
      validationSchema={resetPasswordAdminValidationSchema}
      onSubmit={onSubmit}
    >
      {(props: FormikProps<IResetPasswordAdmin>) => {
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
                    {loading ? "Reseting..." : "Reset"}
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

export default ResetPasswordAdminForm;
