import * as Yup from "yup";

export const editValidationSchema = Yup.object().shape({
  role: Yup.string()
    .oneOf(["administrator", "operator", "ppic"], "Invalid role")
    .required("Role is required"),
});