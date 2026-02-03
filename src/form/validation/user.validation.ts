import * as Yup from "yup";

export const editValidationSchema = Yup.object().shape({
  roleLookupId: Yup.string().required("Role is required"),
});

export const editProfileValidationSchema = Yup.object().shape({
  full_name: Yup.string()
    .min(2, "Full name must be at least 2 characters")
    .required("Full name is required"),
  username: Yup.string()
    .min(4, "Username must be at least 4 characters")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email address"),
  phone_number: Yup.string(),
});

export const disableValidationSchema = Yup.object().shape({
  reason: Yup.string().required("Reason is required"),
});

export const resetPasswordAdminValidationSchema = Yup.object().shape({
  password_expiry_time: Yup.date().required("Password expiry date is required"),
});

export const resetPasswordValidationSchema = Yup.object().shape({
  old_password: Yup.string().when("$isForceChange", {
    is: (val: any) => val === false, // Gunakan fungsi untuk mengecek nilainya
    then: (schema) => schema.required("Old Password is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  new_password: Yup.string()
    .min(12, "New Password must be at least 12 characters")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/[0-9]/, "Must contain at least one number")
    .matches(
      /[!@#$%^&*_]/,
      "Must contain at least one special character (!@#$%^&*_)",
    )
    .notOneOf(
      [Yup.ref("old_password")],
      "New password cannot be the same as the old password",
    )
    .required("New Password is required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("new_password")], "Passwords must match")
    .required("Confirm Password is required"),
});
