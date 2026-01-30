"use client";

import { Button, Grid, TextField, Typography } from "@mui/material";
import { Form, Formik, FormikProps } from "formik";
import { apiClient } from "@/utils/apiHelper";
import { useState } from "react";
import { useSnackbar } from "@/hooks/useSnackbar";
import { IDisableUser } from "@/interface/user.interface";
import { disableValidationSchema } from "./validation/user.validation";
import { UserRowData } from "@/interface/row-table.interface";
import { accountsApi } from "@/lib/api";

interface IDisableFormProps {
  data: UserRowData;
  onSuccess: (data: any) => void;
  onCancel: () => void;
}

const DisableForm = ({ onSuccess, onCancel, data }: IDisableFormProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const showSnackbar = useSnackbar();

  const onSubmit = async (values: IDisableUser) => {
    try {
      setLoading(true);
      setErrorMessage(null);

      const payload = {
        id: data.id,
        reason: values.reason,
      };

      await accountsApi.accountControllerDisable(payload.id);

      onSuccess(payload);
      showSnackbar("User disabled successful", "success");
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message || "An unexpected error occurred",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik<IDisableUser>
      initialValues={{
        reason: "",
      }}
      validationSchema={disableValidationSchema}
      onSubmit={onSubmit}
    >
      {(props: FormikProps<IDisableUser>) => {
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
                <TextField
                  id="reason"
                  name="reason"
                  label="Disable Reason"
                  fullWidth
                  multiline
                  rows={4}
                  value={values.reason}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.reason && Boolean(errors.reason)}
                  helperText={touched.reason && errors.reason}
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
                    {loading ? "Disabling..." : "Disable"}
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

export default DisableForm;
