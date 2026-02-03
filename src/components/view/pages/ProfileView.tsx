"use client";
import { authAtom } from "@/atoms/auth.atom";
import GenericChips from "@/components/core/GenericChips";
import GenericModal from "@/components/modal/GenericModal";
import ProfileSkeleton from "@/components/skeleton/ProfilePageSkeleton";
import ResetPassword from "@/form/ChangePasswordForm";
import EditProfileForm from "@/form/EditProfile";
import EditIcon from "@mui/icons-material/Edit";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

const ProfileView = () => {
  const [auth] = useAtom(authAtom);
  const [mounted, setMounted] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted || !auth) {
    return <ProfileSkeleton />;
  }

  const formatDate = (date: string | null | undefined) => {
    if (!mounted || !date) return "N/A";
    return dayjs(date).format("HH:mm:ss - DD/MM/YYYY");
  };

  return (
    <>
      <Card sx={{ mb: 2 }}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", gap: 4 }}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                bgcolor: "primary.main",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                fontSize: "4rem",
              }}
            >
              {auth?.username?.charAt(0).toUpperCase()}
            </Avatar>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography variant="h5" fontWeight={600}>
                {auth?.full_name}
              </Typography>
              <Typography variant="body1" fontWeight={500}>
                {auth.email || auth.username}
              </Typography>
              <Box>
                <GenericChips
                  value={auth?.account_lifecycle.label || ""}
                  variant="outlined"
                />
              </Box>
            </Box>
          </Box>
          <Box>
            <Button
              onClick={() => setOpen(true)}
              variant="contained"
              startIcon={<EditIcon />}
            >
              Edit Profile
            </Button>
          </Box>
        </CardContent>
      </Card>
      <Grid container spacing={2} alignItems={"stretch"}>
        <Grid size={6}>
          <Card sx={{ height: "100%" }}>
            <CardHeader
              title="User Profile"
              titleTypographyProps={{
                variant: "h6",
              }}
            />
            <Divider />
            <CardContent>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box>
                  <Typography color="#6B7280">FULL NAME</Typography>
                  <Typography fontWeight={"600"}>{auth?.full_name}</Typography>
                </Box>
                <Box>
                  <Typography color="#6B7280">USERNAME</Typography>
                  <Typography fontWeight={"600"}>{auth.username}</Typography>
                </Box>
                <Box>
                  <Typography color="#6B7280">EMAIL</Typography>
                  <Typography fontWeight={"600"}>
                    {auth.email || "N/A"}
                  </Typography>
                </Box>
                <Box>
                  <Typography color="#6B7280">PHONE</Typography>
                  <Typography fontWeight={"600"}>
                    {auth.phone_number || "N/A"}
                  </Typography>
                </Box>
                <Box>
                  <Typography color="#6B7280">ROLE</Typography>
                  <GenericChips
                    value={auth?.account_role?.label || ""}
                    variant="filled"
                  />
                </Box>
                <Box>
                  <Typography color="#6B7280">ACCOUNT TYPE</Typography>
                  <Typography fontWeight={"600"}>
                    {auth.account_type.label}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={6}>
          <Card sx={{ height: "100%" }}>
            <CardHeader
              title="Security Information"
              titleTypographyProps={{
                variant: "h6",
              }}
            />
            <Divider />
            <CardContent>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box>
                  <Typography color="#6B7280">PASSWORD LAST CHANGED</Typography>
                  <Typography fontWeight={"600"}>
                    {formatDate(auth.password_last_changed)}
                  </Typography>
                </Box>
                <Box>
                  <Typography color="#6B7280">PASSWORD EXPIRY TIME</Typography>
                  <Typography fontWeight={"600"}>
                    {auth.password_expiry_time
                      ? dayjs(auth.password_expiry_time).format(
                          "HH:mm - DD/MM/YYYY",
                        )
                      : "N/A"}
                  </Typography>
                </Box>
                <Box>
                  <Typography color="#6B7280">MUST CHANGE PASSWORD</Typography>
                  <GenericChips
                    value={auth.must_change_password ? "YES" : "NO"}
                    variant="filled"
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={6}>
          <Card sx={{ height: "100%" }}>
            <CardHeader
              title="Activity Information"
              titleTypographyProps={{
                variant: "h6",
              }}
            />
            <Divider />
            <CardContent>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box>
                  <Typography color="#6B7280">LAST LOGIN TIME</Typography>
                  <Typography fontWeight={"600"}>
                    {formatDate(auth.last_login_time)}
                  </Typography>
                </Box>
                <Box>
                  <Typography color="#6B7280">ACCOUNT STATUS</Typography>
                  <GenericChips
                    value={auth.account_lifecycle.label || ""}
                    variant="outlined"
                  />
                </Box>
                <Box>
                  <Typography color="#6B7280">ACCOUNT EXPIRY DATE</Typography>
                  <Typography fontWeight={"600"}>
                    {auth.password_expiry_time
                      ? dayjs(auth.password_expiry_time).format(
                          "HH:mm:ss - DD/MM/YYYY",
                        )
                      : "N/A"}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={6}>
          <Card sx={{ height: "100%" }}>
            <CardHeader
              title="Change Password"
              titleTypographyProps={{
                variant: "h6",
              }}
            />
            <Divider />
            <CardContent>
              <ResetPassword />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <GenericModal
        open={open}
        onClose={() => setOpen(false)}
        title="Edit Profile"
      >
        <EditProfileForm
          onSuccess={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        />
      </GenericModal>
    </>
  );
};

export default ProfileView;
