"use client";
import { authAtom } from '@/atoms/auth.atom';
import ResetPassword from '@/form/ChangePasswordForm';
import { Card, CardContent, CardHeader, Grid } from '@mui/material';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


const ChangePasswordView= () => {
    const [auth] = useAtom(authAtom);
    const router = useRouter();

useEffect(() => {
    // PROTEKSI:
    // Jika auth tidak ada (belum login) -> balik ke login
    if (!auth) {
      router.replace("/auth/login");
      return;
    }

    // Jika sudah login tapi must_change_password-nya false
    // (artinya dia mencoba nembak URL manual padahal tidak wajib ganti)
    if (auth?.security?.must_change_password === false) {
      router.replace(`/dashboard/${auth.role}`);
    }
  }, [auth, router]);

  if (!auth || auth?.security?.must_change_password === false) {
    return null; // Atau loading spinner agar tidak ada flash konten
  }
  return (
     <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Card
        sx={{
          padding: 2,
          minWidth: 300,
          maxWidth: 400,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <CardHeader title="Change Password" />
        <CardContent>
          <ResetPassword />
        </CardContent>
      </Card>
    </Grid>
  )
};

export default ChangePasswordView;
