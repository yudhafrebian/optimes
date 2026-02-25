"use client";
import { authAtom, loggingOutAtom } from "@/atoms/auth.atom";
import ResetPassword from "@/form/ChangePasswordForm";
import { commonApi } from "@/lib/api";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
} from "@mui/material";
import { useAtom } from "jotai";
import { useEffect } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useRouter } from "next/navigation";

const ChangePasswordView = () => {
  const [auth, setAuth] = useAtom(authAtom);

  const [isLoggingOut, setIsLoggingOut] = useAtom(loggingOutAtom);
  const router = useRouter();

  const handleGoBack = async () => {
    setIsLoggingOut(true);
    await commonApi.accountControllerLogout();
    setAuth(null);

    router.replace("/auth/login");
  };

  useEffect(() => {
    const checkAuth = async () => {
      if (auth || isLoggingOut) return; 
      try {
        if (!auth) {
          const res = await commonApi.accountControllerValidate();
          setAuth({
            id: res.id,
            username: res.username,
            full_name: res.full_name,
            email: res.email,
            phone_number: res.phone_number,
            account_role: {
              code: res.account_role?.code || "",
              label: res.account_role?.label || "",
              description: res.account_role?.description || "",
              id: res.account_role?.id || 0,
              lookup_type: res.account_role?.lookup_type || "",
              sort_order: res.account_role?.sort_order || 0,
              is_active: res.account_role?.is_active || false,
            },
            account_type: {
              code: res.account_type?.code || "",
              label: res.account_type?.label || "",
              description: res.account_type?.description || "",
              id: res.account_type?.id || 0,
              lookup_type: res.account_type?.lookup_type || "",
              sort_order: res.account_type?.sort_order || 0,
              is_active: res.account_type?.is_active || false,
            },
            account_lifecycle: {
              code: res.account_lifecycle?.code || "",
              label: res.account_lifecycle?.label || "",
              description: res.account_lifecycle?.description || "",
              id: res.account_lifecycle?.id || 0,
              lookup_type: res.account_lifecycle?.lookup_type || "",
              sort_order: res.account_lifecycle?.sort_order || 0,
              is_active: res.account_lifecycle?.is_active || false,
            },
            account_expiry_date: res.account_expiry_date,
            password_last_changed: res.password_last_changed,
            password_expiry_time: res.password_expiry_time,
            must_change_password: res.must_change_password,
            last_login_time: res.last_login_time,
          });
        }
      } catch (error) {
        console.error(error);
      }
    };
    checkAuth();
  }, [auth, setAuth, isLoggingOut]);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Card
        sx={{
          padding: 2,
          minWidth: 300,
          maxWidth: 450,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardHeader
          sx={{ textAlign: "center" }}
          subheader="Please change your password first before logging in"
          title="Change Password"
        />
        <CardContent>
          <ResetPassword />
        </CardContent>
        <CardActions>
          <Button
            onClick={handleGoBack}
            variant="outlined"
            startIcon={<ArrowBackIosIcon />}
          >
            Back
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ChangePasswordView;
