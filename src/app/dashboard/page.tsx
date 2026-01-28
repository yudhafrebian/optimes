"use client";

import { useEffect } from "react";
import { useAtom } from "jotai";
import { authAtom } from "@/atoms/auth.atom";
import { useRouter } from "next/navigation";

export default function DashboardIndex() {
  const [auth] = useAtom(authAtom);
  const router = useRouter();

  useEffect(() => {
    if (auth?.role) {
      router.replace(`/dashboard/${auth.role}`);
    }
  }, [auth]);

  return null;
}
