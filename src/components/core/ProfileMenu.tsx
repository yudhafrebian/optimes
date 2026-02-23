"use client";

import {
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Typography,
  Box,
  Button,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { authAtom } from "@/atoms/auth.atom";
import ProfileMenuSekeleton from "../skeleton/ProfileMenuSkeleton";
import GenericDialog from "../dialog/GenericDialog";
import { accountsApi } from "@/lib/api";
import WarningIcon from "@mui/icons-material/Warning";
import Link from "next/link";

export function ProfileMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const router = useRouter();
  const [auth, setAuth] = useAtom(authAtom);

  const isOperator = auth?.account_role?.label === "Operator";

  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await accountsApi.accountControllerLogout();
    setAuth(null);
    handleClose();
    router.replace("/auth/login");
  };

  if (!auth) return <ProfileMenuSekeleton />;

  return (
    <>
      {/* {isOperator && (
        <Link href={"#"} target="_blank">
          <Button variant="contained" color="error" startIcon={<WarningIcon />}>
            Report Trouble
          </Button>
        </Link>
      )} */}
      <Box
        onClick={handleOpen}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          cursor: "pointer",
          px: 1.5,
          py: 0.5,
          borderRadius: "12px",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            bgcolor: "action.hover",
          },
          "&:active": {
            transform: "scale(0.98)",
          },
        }}
      >
        {/* Nama & Role */}
        <Box sx={{ display: { xs: "none", md: "block" }, textAlign: "right" }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 600, color: "text.primary" }}
          >
            {auth.username}
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: "text.secondary", display: "block" }}
          >
            {auth.account_role?.label || ""}
          </Typography>
        </Box>

        <Avatar
          sx={{
            width: 36,
            height: 36,
            bgcolor: "primary.main",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          {auth.username.charAt(0).toUpperCase()}
        </Avatar>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            router.push(
              `/dashboard/${auth?.account_role?.label.toLowerCase()}/profile`,
            );
          }}
        >
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>

        <MenuItem
          onClick={() => setOpenDialog(true)}
          sx={{ color: "error.main" }}
        >
          <ListItemIcon>
            <LogoutIcon fontSize="small" color="error" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      <GenericDialog
        open={openDialog}
        positiveText="Logout"
        onClose={() => setOpenDialog(false)}
        title="Logout"
        content="Are you sure you want to logout?"
        onConfirm={handleLogout}
        onRefresh={() => {}}
      />
    </>
  );
}
