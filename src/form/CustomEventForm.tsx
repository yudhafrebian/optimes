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
import LoginIcon from '@mui/icons-material/Login';
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
import { commonApi } from "@/lib/api";
import { LoginDto } from "@/api/generated/common-service";
import { passwordAtom } from "@/atoms/password.atom";

interface IFormValue {
    label: string
}

const CustomEventForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const setAuth = useSetAtom(authAtom);
  const setPassword = useSetAtom(passwordAtom)
  const router = useRouter();
  const showSnackbar = useSnackbar();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (values: IFormValue) => {
    try {
      setLoading(true);
      setErrorMessage(null);
      
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Login failed, Something went wrong");
      console.log(error);
      showSnackbar(error.response?.data?.message || "Login failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{
        label: "",
      }}
      validationSchema={null}
      onSubmit={onSubmit}
    >
      {(props: FormikProps<IFormValue>) => {
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
                  id="label"
                  label="Label"
                  name="label"
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={props.values.label}
                  error={touched.label && Boolean(errors.label)}
                  helperText={touched.label && errors.label}
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

export default CustomEventForm;
