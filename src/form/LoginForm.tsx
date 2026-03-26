"use client";
import {
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
import { Form, Formik, FormikProps } from "formik";
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
import {  commonApi } from "@/lib/api";
import { LoginDto } from "@/api/generated/common-service";
import { passwordAtom } from "@/atoms/password.atom";

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const setAuth = useSetAtom(authAtom);
  const setPassword = useSetAtom(passwordAtom);
  const router = useRouter();
  const showSnackbar = useSnackbar();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (values: LoginDto) => {
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await commonApi.accountControllerLogin(values);
      setAuth({
        id: res.id,
        username: res.username,
        full_name: res.full_name,
        email: res.email,
        phone_number: res.phone_number,
        account_role: {
          code: res.account_role?.code || "",
          label: res.account_role?.label || "",
          description: res.account_role?.description || "",
          id: res.account_role?.id || 0,
          lookup_type: res.account_role?.lookup_type || "",
          sort_order: res.account_role?.sort_order || 0,
          is_active: res.account_role?.is_active || false,
        },
        account_type: {
          code: res.account_type?.code || "",
          label: res.account_type?.label || "",
          description: res.account_type?.description || "",
          id: res.account_type?.id || 0,
          lookup_type: res.account_type?.lookup_type || "",
          sort_order: res.account_type?.sort_order || 0,
          is_active: res.account_type?.is_active || false,
        },
        account_lifecycle: {
          code: res.account_lifecycle?.code || "",
          label: res.account_lifecycle?.label || "",
          description: res.account_lifecycle?.description || "",
          id: res.account_lifecycle?.id || 0,
          lookup_type: res.account_lifecycle?.lookup_type || "",
          sort_order: res.account_lifecycle?.sort_order || 0,
          is_active: res.account_lifecycle?.is_active || false,
        },
        account_expiry_date: res.account_expiry_date,
        password_last_changed: res.password_last_changed,
        password_expiry_time: res.password_expiry_time,
        must_change_password: res.must_change_password,
        last_login_time: res.last_login_time,
      });

      setPassword(values.password);

      if (res.must_change_password) {
        router.replace("/change-password");
      } else {
        router.replace(
          `/dashboard/${res.account_role?.label.toLocaleLowerCase()}`,
        );
        showSnackbar(`Login successful, welcome ${res.full_name}`, "success");
      }
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message || "Login failed, Something went wrong",
      );
      console.log(error);
      showSnackbar(error.response?.data?.message || "Login failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={loginValidationSchema}
      onSubmit={onSubmit}
    >
      {(props: FormikProps<LoginDto>) => {
        const { errors, touched, handleBlur, handleChange } = props;
        return (
          <Form>
            <Typography
              variant="h5"
              component="div"
              textAlign={"center"}
              fontWeight={600}
            >
              LOGIN
            </Typography>
            <Grid container spacing={2} marginTop={1}>
              <Grid size={12}>
                <TextField
                  id="username"
                  label="Username"
                  name="username"
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={props.values.username}
                  error={touched.username && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Grid>
              <Grid size={12}>
                <FormControl
                  variant="outlined"
                  fullWidth
                  error={touched.password && Boolean(errors.password)}
                >
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <OutlinedInput
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={props.values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Password"
                    startAdornment={
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {touched.password && errors.password && (
                    <Typography
                      variant="caption"
                      color="error"
                      sx={{ ml: 2, mt: 0.5 }}
                    >
                      {errors.password}
                    </Typography>
                  )}
                </FormControl>
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
                  loading={loading}
                  loadingPosition="end"
                  endIcon={<LoginIcon />}
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
