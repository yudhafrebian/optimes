"use client";
import Cookies from "js-cookie";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { Form, Formik, FormikProps } from "formik";
import { loginValidationSchema } from "./validation/auth.validation";
import { IAuthLogin } from "@/interface/auth.interface";
import { apiClient } from "@/utils/apiHelper";
import { useState } from "react";
import { useSetAtom } from "jotai";
import { authAtom } from "@/atoms/auth.atom";
import { useRouter } from "next/navigation";
import { useSnackbar } from "@/hooks/useSnackbar";

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const setAuth = useSetAtom(authAtom);
  const router = useRouter();
  const showSnackbar = useSnackbar();

  const onSubmit = async (values: IAuthLogin) => {
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await apiClient.post("/auth/login", values);

      const { role, id, security } = res.data;

      setAuth({
        id: id,
        username: res.data.username,
        role: role,
        full_name: res.data.full_name,
        site: res.data.site,
        area: res.data.area,
        status: res.data.status,
        security: {
          must_change_password: security.must_change_password,
          password_status: security.password_status,
          password_expiry_time: security.password_expiry_time,
          password_last_changed: security.password_last_changed,
        },
        account_info: {
          account_expiry_date: res.data.account_info.account_expiry_date,
          account_type: res.data.account_info.account_type,
          last_login: res.data.account_info.last_login,
        },
      });

      if (security.must_change_password) {
        router.replace("/change-password");
      } else {
        router.replace(`/dashboard/${role}`);
        Cookies.set("userId", id, { expires: 1 });
        Cookies.set("userRole", role, { expires: 1 });
        showSnackbar(`Login successful, welcome ${res.data.full_name}`, "success");
      }
      
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Login failed");
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
      {(props: FormikProps<IAuthLogin>) => {
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
                  required
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={props.values.username}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  required
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={props.values.password}
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
