"use client";

import { ReactNode, useEffect } from "react";
import { PageContainer } from "@toolpad/core/PageContainer";
import { NextAppProvider } from "@toolpad/core/nextjs";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { usePathname } from "next/navigation";
import { branding } from "./branding";
import { ProfileMenu } from "@/components/core/ProfileMenu";
import { authAtom, loggingOutAtom } from "@/atoms/auth.atom";
import { useAtom } from "jotai";
import theme from "@/theme";
import { navigationByRole } from "./navigation";
import { GlobalSnackbar } from "@/components/core/GlobalSnackbar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { accountsApi } from "@/lib/api";
import JobExecutionHeader from "@/components/header/job-execution/Header";
import { Box } from "@mui/material";
import JobEventHeader from "@/components/header/job-event/Header";

export function AppShell({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useAtom(authAtom);

  const isLoggingOut = useAtom(loggingOutAtom)[0];
  const pathname = usePathname();

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
      } catch (error: any) {
        if (error?.response?.status === 401) {
          return;
        }
        console.error(error);
      }
    };
    checkAuth();
  }, [pathname, auth, setAuth, isLoggingOut]);

  const role = pathname.split("/")[2];
  const navigation =
    navigationByRole[role as keyof typeof navigationByRole] ?? [];
  const isJobExecution = pathname.startsWith(
    "/dashboard/operator/job-execution",
  );
  const isJobEvent = pathname.startsWith("/dashboard/operator/job-event");
  const isJobEventHistory = pathname.startsWith(
    "/dashboard/operator/job-event-history",
  );

  return (
    <NextAppProvider theme={theme} branding={branding} navigation={navigation}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DashboardLayout
          slots={{
            toolbarActions: ProfileMenu,
          }}
        >
          {isJobExecution ? (
            <Box sx={{ px: 0 }}>
              <JobExecutionHeader />
              <Box sx={{ px: { xs: 2, sm: 3 } }}>{children}</Box>
            </Box>
          ) : isJobEvent ? (
            <Box sx={{ px: 0 }}>
              <JobEventHeader />
              <Box sx={{ px: { xs: 2, sm: 3 } }}>{children}</Box>
            </Box>
          ) : (
            <PageContainer>{children}</PageContainer>
          )}
        </DashboardLayout>
        <GlobalSnackbar />
      </LocalizationProvider>
    </NextAppProvider>
  );
}
