"use client";

import { ReactNode } from "react";
import { AppShell } from "@/toolpad/AppShell";

export default function DashboardShell({ children }: { children: ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
