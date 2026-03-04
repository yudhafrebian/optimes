"use client";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";

import PpicSkeletonPage from "@/components/skeleton/PpicSkeletonPage";

const DashboardPage = () => {
  const pathname = usePathname();
  const navigate = useRouter();

  React.useEffect(() => {
    if (pathname !== "/") {
      navigate.replace("/dashboard/head-of-production/work-center-manager");
    }
  }, [pathname, navigate]);

  return <PpicSkeletonPage />;
};

export default DashboardPage;
