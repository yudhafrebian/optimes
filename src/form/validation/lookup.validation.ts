import * as Yup from "yup";

export const lookupValidationSchema = Yup.object().shape({
  code: Yup.string().required("Code is required"),
  label: Yup.string().required("Label is required"),
});
