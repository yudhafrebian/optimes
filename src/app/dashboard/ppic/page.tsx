"use client";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";

const PpicPage = () => {
  const pathname = usePathname();
  const navigate = useRouter();
  React.useEffect(() => {
    if (pathname !== "/") {
      navigate.replace("/dashboard/ppic/job-management");
    }
  }, [pathname, navigate]);
  return (
    <div>
      <h1>PPIC Dashboard</h1>
    </div>
  );
};

export default PpicPage;
