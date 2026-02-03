"use client";

import {
  Button,
  Grid,
  Typography,
} from "@mui/material";
import { Form, Formik, FormikProps } from "formik";
import { useState } from "react";
import { useSnackbar } from "@/hooks/useSnackbar";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import { IResetPasswordAdmin } from "@/interface/user.interface";
import { resetPasswordAdminValidationSchema } from "./validation/user.validation";
import { accountsApi } from "@/lib/api";
import { UserRowData } from "@/interface/row-table.interface";

interface ISuspendFormProps {
  data: UserRowData;
  onSuccess: (data: any) => void;
  onCancel: () => void;
}

const ResetPasswordAdminForm = ({ onSuccess, onCancel, data }: ISuspendFormProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const showSnackbar = useSnackbar();

  const onSubmit = async (values: IResetPasswordAdmin) => {
    try {
      setLoading(true);
      setErrorMessage(null);

      const res = await accountsApi.accountControllerResetPassword(data.id, {
        password_expiry_time: values.password_expiry_time,
      });

      console.log(res);

      onSuccess(res.data);
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
        password_expiry_time:"",
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

        return (
          <Form>
            <Grid container spacing={2} mt={1}>
              <Grid size={12}>
                <DateTimePicker
                  ampm={false}
                  label="Password Expiration Time"
                  value={dayjs(values.password_expiry_time)}
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
