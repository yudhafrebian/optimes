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
import { useEffect, useState, useRef } from "react";
import { assignValidationSchema } from "./validation/user.validation";
import { useSnackbar } from "@/hooks/useSnackbar";
import { assetsApi, commonApi } from "@/lib/api";
import { LookupResponseDto } from "@/api/generated/common-service";
import { useAtom } from "jotai";
import { authAtom, loggingOutAtom } from "@/atoms/auth.atom";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import workCenterAtom from "@/atoms/wc.atom";

interface IChooseWorkCenterFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

interface FormValues {
  workCenterCode: string;
}

const ChooseWorkCenterForm = () =>
  // {  onSuccess, onCancel }: IChooseWorkCenterFormProps
  {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [workCenter, setWorkCenter] = useState<LookupResponseDto[]>([]);
    const [roleId, setRoleId] = useState<string>("");

    const [auth, setAuth] = useAtom(authAtom);
    const [isLoggingOut, setIsLoggingOut] = useAtom(loggingOutAtom);
    const [assignWorkCenter, setAssignWorkCenter] = useAtom(workCenterAtom);
    const router = useRouter();
    const isMountedRef = useRef(true);
    console.log(auth);

    const showSnackbar = useSnackbar();

    const fetchWorkCenter = async () => {
      try {
        const res = await commonApi.lookupControllerFindAll({
          type: "WORK_CENTER",
        });
        setWorkCenter(res);
      } catch (error) {
        console.log(error);
      }
    };

    const handleGoBack = async () => {
      setAuth(null);
      await commonApi.accountControllerLogout();
      setIsLoggingOut(true);
      router.replace("/auth/login");
    };

    const onSubmit = async (values: FormValues) => {
      try {
        setLoading(true);
        setErrorMessage(null);
        if (!auth) {
          throw new Error("User ID is required");
        }
        const res = await assetsApi.setAssetValuesByPath(
          `${values.workCenterCode}.Machine Operator`,
          {
            value: {
              value: auth.id,
              label: auth.full_name,
            },
          },
        );

        Cookies.set("work-center-selected", values.workCenterCode);
        setAssignWorkCenter(values.workCenterCode);

        showSnackbar("Work Center assigned successfully", "success");
        // Router.replace akan unmount component, jadi set loading false dulu
        if (isMountedRef.current) {
          setLoading(false);
        }
        router.replace(
          `/dashboard/${auth.account_role?.label.toLocaleLowerCase()}`,
        );
        console.log("login success");
      } catch (error: any) {
        console.log(error);
        setErrorMessage(
          error.response?.data?.message || "An unexpected error occurred",
        );
        if (isMountedRef.current) {
          setLoading(false);
        }
      }
    };

    useEffect(() => {
      fetchWorkCenter();

      return () => {
        isMountedRef.current = false;
      };
    }, []);

    return (
      <Formik
        enableReinitialize
        initialValues={{
          workCenterCode: "",
        }}
        validationSchema={assignValidationSchema}
        onSubmit={onSubmit}
      >
        {(props: FormikProps<FormValues>) => {
          const { errors, touched, values, handleBlur, handleChange } = props;

          return (
            <Form>
              <Grid container spacing={2} marginTop={1}>
                <Grid size={12}>
                  <FormControl
                    fullWidth
                    error={
                      touched.workCenterCode && Boolean(errors.workCenterCode)
                    }
                  >
                    <InputLabel id="workCenterCode-label">
                      Work Center
                    </InputLabel>
                    <Select
                      labelId="workCenterCode-label"
                      id="workCenterCode"
                      name="workCenterCode"
                      value={values.workCenterCode}
                      label="Role"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={!roleId && workCenter.length === 0}
                    >
                      {workCenter.map((wc) => (
                        <MenuItem key={wc.id} value={wc.code}>
                          {wc.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                {errors.workCenterCode && touched.workCenterCode && (
                  <Grid size={12}>
                    <Typography color="error" variant="body2">
                      {errors.workCenterCode}
                    </Typography>
                  </Grid>
                )}
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
                      onClick={handleGoBack}
                      fullWidth
                    >
                      Back
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
                      {loading ? "Assigning..." : "Assign"}
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

export default ChooseWorkCenterForm;
