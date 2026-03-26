"use client";

import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Form, Formik, FormikProps } from "formik";
import { useEffect, useState } from "react";
import { editValidationSchema } from "./validation/user.validation";
import { useSnackbar } from "@/hooks/useSnackbar";
import { commonApi } from "@/lib/api";
import { EditRoleDto, LookupResponseDto } from "@/api/generated/common-service";
import { useAtom } from "jotai";
import { authAtom } from "@/atoms/auth.atom";

interface IEditFormProps {
  data: {
    id: string;
    username: string;
    role: string;
  };
  onSuccess: () => void;
  onCancel: () => void;
}

const EditForm = ({ data, onSuccess, onCancel }: IEditFormProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [roles, setRoles] = useState<LookupResponseDto[]>([]);
  const [roleId, setRoleId] = useState<string>("");

  const auth = useAtom(authAtom);

  const showSnackbar = useSnackbar();

  const fetchRoles = async () => {
    try {
      const res = await commonApi.lookupControllerFindAll({ type: "ACCOUNT_ROLE" });
      setRoles(res);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchId = async () => {
    try {
      const res = await commonApi.accountControllerGetById(data.id);
      setRoleId(String(res.account_role?.id));
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (values: EditRoleDto) => {
    try {
      setLoading(true);
      setErrorMessage(null);

      if (auth[0]?.id === data.id) {
        showSnackbar("Cannot Change Role of Yourself", "error");
        return;
      }
      if (roleId === "9") {
        showSnackbar("Cannot Change Role of Administrator", "error");
        return;
      }

       await commonApi.accountControllerEditRole(data.id, {
        roleLookupId: values.roleLookupId,
      });


      onSuccess();
      showSnackbar("User updated successfully", "success");
    } catch (error: any) {
      console.log(error);
      setErrorMessage(
        error.response?.data?.message || "An unexpected error occurred",
      );
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  const filteredRole = roles.filter((role) => role.code !== "ADMINISTRATOR")

  useEffect(() => {
    fetchRoles();
    fetchId();
  }, [fetchId]);

  return (
    <Formik
      enableReinitialize
      initialValues={{
        roleLookupId: roleId || "",
      }}
      validationSchema={editValidationSchema}
      onSubmit={onSubmit}
    >
      {(props: FormikProps<EditRoleDto>) => {
        const { errors, touched, values, handleBlur, handleChange } = props;

        return (
          <Form>
            <Grid container spacing={2} marginTop={1}>
              <Grid size={12}>
                <FormControl
                  fullWidth
                  error={touched.roleLookupId && Boolean(errors.roleLookupId)}
                >
                  <InputLabel id="roleLookupId-label">Role</InputLabel>
                  <Select
                    labelId="roleLookupId-label"
                    id="roleLookupId"
                    name="roleLookupId"
                    value={values.roleLookupId}
                    label="Role"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={!roleId && roles.length === 0}
                  >
                    {filteredRole .map((role) => (
                      <MenuItem key={role.id} value={role.id}>
                        {role.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              {errorMessage && (
                <Grid size={12}>
                  <Typography color="error" variant="body2">
                    {errorMessage}
                  </Typography>
                </Grid>
              )}
              <Grid container size={12} spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={onCancel}
                    fullWidth
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading}
                    loading={loading}
                  >
                    {loading ? "Updating..." : "Update"}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default EditForm;
