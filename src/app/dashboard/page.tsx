"use client";

import { useEffect } from "react";
import { useAtom } from "jotai";
import { authAtom } from "@/atoms/auth.atom";
import { useRouter } from "next/navigation";

export default function DashboardIndex() {
  const [auth] = useAtom(authAtom);
  const router = useRouter();

  useEffect(() => {
    if (auth?.account_role?.label) {
      router.replace(`/dashboard/${auth.account_role.label.toLowerCase()}`);
    }
  }, [auth, router]);

  return null;
}
