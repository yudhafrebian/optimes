"use client";
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';

const OperatorPage= () => {
  const pathname = usePathname();
  const navigate = useRouter();
  React.useEffect(() => {
    if (pathname !== '/') {
      navigate.replace('/dashboard/operator/job-execution');
    }
  },[pathname, navigate]);
  return (
    <div>
      <h1>Operator Dashboard</h1>
    </div>
  );
};

export default OperatorPage;
