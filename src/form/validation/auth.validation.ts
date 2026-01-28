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
  area: Yup.string().required("Area is required"),
  site: Yup.string().required("Site is required"),
  employment_type: Yup.string()
    .oneOf(["full_time", "temporary"])
    .required("Employment type is required"),
  password: Yup.string().required("Password is required"),
  password_status: Yup.string()
    .oneOf(["normal", "temporary", "expired"])
    .required("Password status is required"),
  role: Yup.string()
    .oneOf(["administrator", "operator", "ppic", "maintenance_administrator", "maintenance"])
    .required("Role is required"),
});
