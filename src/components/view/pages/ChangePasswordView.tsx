"use client";
import { authAtom, loggingOutAtom } from "@/atoms/auth.atom";
import ResetPassword from "@/form/ChangePasswordForm";
import { accountsApi } from "@/lib/api";
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
    await accountsApi.accountControllerLogout();
    setAuth(null);

    router.replace("/auth/login");
  };

  useEffect(() => {
    const checkAuth = async () => {
      if (auth || isLoggingOut) return; 
      try {
        if (!auth) {
          const res = await accountsApi.accountControllerValidate();
          setAuth({
            id: res.data.id,
            username: res.data.username,
            full_name: res.data.full_name,
            email: res.data.email,
            phone_number: res.data.phone_number,
            account_role: {
              code: res.data.account_role?.code || "",
              label: res.data.account_role?.label || "",
              description: res.data.account_role?.description || "",
              id: res.data.account_role?.id || 0,
              lookup_type: res.data.account_role?.lookup_type || "",
              sort_order: res.data.account_role?.sort_order || 0,
              is_active: res.data.account_role?.is_active || false,
            },
            account_type: {
              code: res.data.account_type?.code || "",
              label: res.data.account_type?.label || "",
              description: res.data.account_type?.description || "",
              id: res.data.account_type?.id || 0,
              lookup_type: res.data.account_type?.lookup_type || "",
              sort_order: res.data.account_type?.sort_order || 0,
              is_active: res.data.account_type?.is_active || false,
            },
            account_lifecycle: {
              code: res.data.account_lifecycle?.code || "",
              label: res.data.account_lifecycle?.label || "",
              description: res.data.account_lifecycle?.description || "",
              id: res.data.account_lifecycle?.id || 0,
              lookup_type: res.data.account_lifecycle?.lookup_type || "",
              sort_order: res.data.account_lifecycle?.sort_order || 0,
              is_active: res.data.account_lifecycle?.is_active || false,
            },
            account_expiry_date: res.data.account_expiry_date,
            password_last_changed: res.data.password_last_changed,
            password_expiry_time: res.data.password_expiry_time,
            must_change_password: res.data.must_change_password,
            last_login_time: res.data.last_login_time,
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
