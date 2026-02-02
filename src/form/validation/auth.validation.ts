import * as Yup from "yup";

export const loginValidationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

export const registerValidationSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, "Username must be at least 4 characters")
    .required("Username is required"),
  full_name: Yup.string()
    .min(2, "Full name must be at least 2 characters")
    .required("Full name is required"),
  account_type: Yup.string().required("Employment type is required"),
  account_role: Yup.string().required("Role is required"),
  password_expiry_time: Yup.string().required(
    "Password expiry time is required",
  ),
});
