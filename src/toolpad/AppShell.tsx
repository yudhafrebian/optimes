"use client";

import { ReactNode, useEffect } from "react";
import { PageContainer } from "@toolpad/core/PageContainer";
import { NextAppProvider } from "@toolpad/core/nextjs";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { usePathname } from "next/navigation";
import { branding } from "./branding";
import { ProfileMenu } from "@/components/core/ProfileMenu";
import { authAtom } from "@/atoms/auth.atom";
import { useAtom } from "jotai";
import { apiClient } from "@/utils/apiHelper";
import theme from "@/theme";
import { navigationByRole } from "./navigation";
import { GlobalSnackbar } from "@/components/core/GlobalSnackbar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export function AppShell({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useAtom(authAtom);
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!auth) {
          const res = await apiClient.get("/auth/me");
          setAuth({
            id: res.data.id,
            username: res.data.username,
            role: res.data.role,
          });
        }
      } catch (error) {}
    };
    checkAuth();
  }, [pathname, auth, setAuth]);

  // Mengambil role dari URL (misal: /dashboard/administrator/...)
  const role = pathname.split("/")[2];
  const navigation =
    navigationByRole[role as keyof typeof navigationByRole] ?? [];

  return (
    <NextAppProvider theme={theme} branding={branding} navigation={navigation}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DashboardLayout
          slots={{
            toolbarActions: ProfileMenu,
          }}
        >
          <PageContainer>{children}</PageContainer>
        </DashboardLayout>
        <GlobalSnackbar />
      </LocalizationProvider>
    </NextAppProvider>
  );
}
