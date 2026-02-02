"use client";

import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
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
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { accountsApi } from "@/lib/api";
import { ChangePasswordDto } from "@/api-client";
import { getCriteria } from "@/lib/criteria";

const ResetPassword = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [auth, setAuth] = useAtom(authAtom);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const showSnackbar = useSnackbar();
  const pathname = usePathname();
  const router = useRouter();
  console.log(auth?.account_role?.label.toLowerCase());

  const isForceChange = pathname === "/change-password";

  const dynamicValidationSchema = Yup.object().shape({
    currentPassword: isForceChange
      ? Yup.string().notRequired()
      : Yup.string().required("Old Password is required"),
    newPassword: Yup.string()
      .min(12, "New Password must be at least 12 characters")
      .matches(/[A-Z]/, "Must contain at least one uppercase letter")
      .matches(/[a-z]/, "Must contain at least one lowercase letter")
      .matches(/[0-9]/, "Must contain at least one number")
      .matches(/[@$!%*?&#_]/, "Must contain at least one special character")
      .notOneOf(
        [Yup.ref("currentPassword")],
        "New password cannot be the same as old",
      )
      .required("New Password is required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const onSubmit = async (
    values: ChangePasswordDto,
    actions: FormikHelpers<IChangePassword>,
  ) => {
    try {
      setLoading(true);
      if (!auth?.id) throw new Error("User ID is required");
      await accountsApi.accountControllerChangePassword(auth.id, {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      showSnackbar("Password updated successfully", "success");

      if (auth) {
        setAuth({
          ...auth,
          must_change_password: false,
        });
      }

      actions.resetForm();

      if (isForceChange) {
        router.replace(`/dashboard/${auth?.account_role?.label.toLowerCase()}`);
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
        currentPassword: "",
        newPassword: "",
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

        const criteria = getCriteria(props.values.newPassword);
        return (
          <Form>
            <Grid container spacing={2} marginTop={1}>
              {!isForceChange && (
                <Grid size={12}>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    error={touched.currentPassword && !!errors.currentPassword}
                  >
                    <InputLabel htmlFor="currentPassword">Old Password</InputLabel>
                    <OutlinedInput
                      id="currentPassword"
                      name="currentPassword"
                      label="Old Password"
                      type={showPassword ? "text" : "password"}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.currentPassword}
                      error={touched.currentPassword && !!errors.currentPassword}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  {touched.currentPassword && errors.currentPassword && (
                    <Typography variant="body2" color="error">
                      {errors.currentPassword}
                    </Typography>
                  )}
                </Grid>
              )}

              <Grid size={12}>
                <FormControl
                  fullWidth
                  variant="outlined"
                  error={touched.newPassword && !!errors.newPassword}
                >
                  <InputLabel htmlFor="newPassword">New Password</InputLabel>
                  <OutlinedInput
                    id="newPassword"
                    name="newPassword"
                    label="New Password"
                    type={showNewPassword ? "text" : "password"}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.newPassword}
                    error={touched.newPassword && !!errors.newPassword}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          edge="end"
                        >
                          {showNewPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                {touched.newPassword && errors.newPassword && (
                  <Typography variant="body2" color="error">
                    {errors.newPassword}
                  </Typography>
                )}
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
                <FormControl
                  fullWidth
                  variant="outlined"
                  error={touched.confirm_password && !!errors.confirm_password}
                >
                  <InputLabel htmlFor="confirm_password">
                    Confirm Password
                  </InputLabel>
                  <OutlinedInput
                    id="confirm_password"
                    name="confirm_password"
                    label="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.confirm_password}
                    error={
                      touched.confirm_password && !!errors.confirm_password
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                {touched.confirm_password && errors.confirm_password && (
                  <Typography variant="body2" color="error">
                    {errors.confirm_password}
                  </Typography>
                )}
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
