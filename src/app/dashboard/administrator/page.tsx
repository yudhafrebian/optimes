"use client";
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';

interface IAdministratorPageProps {
}

const AdministratorPage: React.FunctionComponent<IAdministratorPageProps> = (props) => {
  const pathname = usePathname();
  const navigate = useRouter();
  React.useEffect(() => {
    if (pathname !== '/') {
      navigate.replace('/dashboard/administrator/account-management');
    }
  }, []);
  return (
    <div>
      <h1>Account Management</h1>
    </div>
  );
};

export default AdministratorPage;
