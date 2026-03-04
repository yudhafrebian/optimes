"use client";
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';
import PpicSkeletonPage from "@/components/skeleton/PpicSkeletonPage";

const AdministratorPage= () => {
  const pathname = usePathname();
  const navigate = useRouter();
  React.useEffect(() => {
    if (pathname !== '/') {
      navigate.replace('/dashboard/administrator/account-management');
    }
  }, [pathname, navigate]);
  return (
    <PpicSkeletonPage />
  );
};

export default AdministratorPage;
