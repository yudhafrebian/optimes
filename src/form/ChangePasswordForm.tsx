"use client";

import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useAtom, useSetAtom } from "jotai";
import { authAtom } from "@/atoms/auth.atom";
import { usePathname, useRouter } from "next/navigation";
import { resetPasswordValidationSchema } from "./validation/user.validation";
import { IChangePassword } from "@/interface/user.interface";
import { useSnackbar } from "@/hooks/useSnackbar";
import * as Yup from "yup";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

const getCriteria = (password: string) => [
  { label: "Min. 12 Character", valid: password.length >= 12 },
  { label: "Min. 1 Uppercase (A-Z)", valid: /[A-Z]/.test(password) },
  { label: "Min. 1 Lowercase (a-z)", valid: /[a-z]/.test(password) },
  { label: "Min. 1 Number (0-9)", valid: /[0-9]/.test(password) },
  { label: "Min. 1 Symbol (@$!%*?&#_)", valid: /[@$!%*?&#_]/.test(password) },
];

const ResetPassword = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [auth, setAuth] = useAtom(authAtom);

  const showSnackbar = useSnackbar();
  const pathname = usePathname();
  const router = useRouter();

  const isForceChange = pathname === "/change-password";

  console.log(isForceChange)
  const dynamicValidationSchema = Yup.object().shape({
    old_password: isForceChange 
      ? Yup.string().notRequired() 
      : Yup.string().required("Old Password is required"),
    new_password: Yup.string()
      .min(12, "New Password must be at least 12 characters")
      .matches(/[A-Z]/, "Must contain at least one uppercase letter")
      .matches(/[a-z]/, "Must contain at least one lowercase letter")
      .matches(/[0-9]/, "Must contain at least one number")
      .matches(/[@$!%*?&#_]/, "Must contain at least one special character")
      .notOneOf([Yup.ref("old_password")], "New password cannot be the same as old")
      .required("New Password is required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("new_password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

 const onSubmit = async (values: IChangePassword, actions: FormikHelpers<IChangePassword>) => {
    try {
      setLoading(true);
      // await apiClient.post("/auth/change-password", values);

      showSnackbar("Password updated successfully", "success");
      
      if (auth) {
        setAuth({
          ...auth,
          security: {
            ...auth.security,
            must_change_password: false
          }
        });
      }

      actions.resetForm();

      if (isForceChange) {
        Cookies.set("userId", String(auth?.id));
        Cookies.set("userRole", String(auth?.role));
        router.replace(`/dashboard/${auth?.role}`);
      }

    } catch (error: any) {
      setErrorMessage(error.response.data.message);
      showSnackbar(error.response.data.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{
        old_password: "",
        new_password: "",
        confirm_password: "",
      }}
      validateOnMount
      validateOnChange
      validateOnBlur
      validationSchema={dynamicValidationSchema}
      validationContext={{ isForceChange }}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {(props: FormikProps<IChangePassword>) => {
        const { values, errors, touched, handleBlur, handleChange } = props;

        const criteria = getCriteria(props.values.new_password);
        return (
          <Form>
            <Grid container spacing={2} marginTop={1}>
              {!isForceChange && (
                <Grid size={12}>
                  <TextField
                    id="old_password"
                    name="old_password"
                    label="Old Password"
                    type="password"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.old_password}
                    error={touched.old_password && !!errors.old_password}
                    helperText={touched.old_password && errors.old_password}
                  />
                </Grid>
              )}

              <Grid size={12}>
                <TextField
                  id="new_password"
                  label="New Password"
                  type="password"
                  required
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={props.values.new_password}
                  error={touched.new_password && !!errors.new_password}
                  helperText={touched.new_password && errors.new_password}
                />
              </Grid>

              <Grid size={12}>
                <Box
                  sx={{
                    p: 1,
                    bgcolor: "#f8f9fa",
                    borderRadius: 1,
                    border: "1px solid #e0e0e0",
                  }}
                >
                  <Typography
                    variant="caption"
                    fontWeight="bold"
                    color="textSecondary"
                    gutterBottom
                  >
                    PASSWORD REQUIREMENTS:
                  </Typography>
                  <Grid container spacing={1}>
                    {criteria.map((item, index) => (
                      <Grid
                        size={6}
                        key={index}
                        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                      >
                        {item.valid ? (
                          <CheckCircleOutlineIcon
                            sx={{ fontSize: 16, color: "green" }}
                          />
                        ) : (
                          <RadioButtonUncheckedIcon
                            sx={{ fontSize: 16, color: "gray" }}
                          />
                        )}
                        <Typography
                          variant="caption"
                          sx={{
                            color: item.valid ? "green" : "text.secondary",
                            transition: "0.3s",
                          }}
                        >
                          {item.label}
                        </Typography>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Grid>

              <Grid size={12}>
                <TextField
                  id="confirm_password"
                  label="Confirm Password"
                  type="password"
                  required
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={props.values.confirm_password}
                  error={touched.confirm_password && !!errors.confirm_password}
                  helperText={
                    touched.confirm_password && errors.confirm_password
                  }
                />
              </Grid>
              {errorMessage && (
                <Grid size={12}>
                  <Typography color="error" variant="body2">
                    {errorMessage}
                  </Typography>
                </Grid>
              )}
              <Grid size={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  disabled={loading ? true : false}
                >
                  {loading ? "Changing Password..." : "Change Password"}
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ResetPassword;
