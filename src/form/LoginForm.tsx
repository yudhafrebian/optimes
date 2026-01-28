"use client";

import { Button, Grid, TextField, Typography } from "@mui/material";
import { Form, Formik, FormikProps } from "formik";
import { loginValidationSchema } from "./validation/auth.validation";
import { IAuthLogin } from "@/interface/auth.interface";
import { apiClient } from "@/utils/apiHelper";
import { useState } from "react";
import { useSetAtom } from "jotai";
import { authAtom } from "@/atoms/auth.atom";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const setAuth = useSetAtom(authAtom);
  const router = useRouter();

  const onSubmit = async (values: IAuthLogin) => {
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await apiClient.post("/auth/login", values);
      const role = res.data.role;

      setAuth({ id: res.data.id, username: res.data.username, role });
      router.replace(`/dashboard/${role}`);
    } catch (error: any) {
      console.log(error);
      setErrorMessage(
        error.response?.data?.message || "An unexpected error occurred",
      );
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
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
