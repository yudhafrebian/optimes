"use client";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";


import PpicSkeletonPage from "@/components/skeleton/PpicSkeletonPage";

const PpicPage = () => {
  const pathname = usePathname();
  const navigate = useRouter();

  React.useEffect(() => {
    if (pathname !== "/") {
      navigate.replace("/dashboard/ppic/job-management");
    }
  }, [pathname, navigate]);

  return (
    <PpicSkeletonPage />
  );
};

export default PpicPage;
