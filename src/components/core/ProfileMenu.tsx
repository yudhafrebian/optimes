"use client";

import {
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAtom, useSetAtom } from "jotai";
import { authAtom } from "@/atoms/auth.atom";
import ProfileMenuSekeleton from "../skeleton/ProfileMenuSkeleton";
import GenericDialog from "../dialog/GenericDialog";
import { assetsApi, commonApi } from "@/lib/api";
import {
  INITIAL_LOADER_DATA,
  loadedDataAtom,
  loaderAtom,
  normalizeLoaderData,
} from "@/atoms/loader.atom";
import GenericChips from "./GenericChips";
import useSWR from "swr";
import workCenterAtom from "@/atoms/wc.atom";

export function ProfileMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const router = useRouter();
  const [auth, setAuth] = useAtom(authAtom);
  const workCenterPath = useAtom(workCenterAtom);
  const setWorkCenterPath = useSetAtom(workCenterAtom);
  const [loaderData, setLoaderData] = useAtom(loadedDataAtom);
  const [loader, setLoader] = useAtom(loaderAtom);

  const fetcher = () =>
    assetsApi
      .getAssetValuesByPath(`${workCenterPath[0]}.Job Loader`)
      .then((res) => {
        const normalizedLoaderData = normalizeLoaderData(res.matches[0]?.value);
        const hasLoadedJob =
          normalizedLoaderData.id !== "" &&
          normalizedLoaderData.work_order !== "" &&
          normalizedLoaderData.work_center.code !== "";

        setLoaderData(normalizedLoaderData);
        setLoader({
          isLoaded: hasLoadedJob,
          id: hasLoadedJob ? normalizedLoaderData.id : "",
        });

        return normalizedLoaderData;
      });

  const isOperator = auth?.account_role?.label === "Operator";

  const open = Boolean(anchorEl);

  useSWR(
    isOperator && workCenterPath[0] ? ["job-loader", workCenterPath[0]] : null,
    fetcher,
    { refreshInterval: 2000, revalidateOnFocus: false },
  );

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await commonApi.accountControllerLogout();
    setAuth(null);
    setLoaderData(INITIAL_LOADER_DATA);
    setLoader({ isLoaded: false, id: "" });
    setWorkCenterPath(undefined);
    handleClose();
    router.replace("/auth/login");
  };

  if (!auth) return <ProfileMenuSekeleton />;

  return (
    <>
      {isOperator && (
        <Stack direction={"row"} gap={1} alignItems={"center"}>
          <Box
            sx={{
              bgcolor: "action.hover",
              px: 1.5,
              py: 0.5,
              border: "1px solid",
              borderColor: "gray",
              borderRadius: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="caption">Asset</Typography>
              <GenericChips
                value={workCenterPath[0] ? workCenterPath[0] : "Not Assigned"}
              />
            </Box>
          </Box>
          <Box
            sx={{
              bgcolor: "action.hover",
              px: 1.5,
              py: 0.5,
              border: "1px solid",
              borderColor: "gray",
              borderRadius: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography variant="caption">Current Job</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {loaderData.id === "" ? (
                <GenericChips size="small" value={"Offline"} />
              ) : (
                <GenericChips size="small" value={loaderData.work_order} />
              )}
              {loaderData.id !== "" && (
                <GenericChips size="small" value={loaderData.sales_order} />
              )}
            </Box>
          </Box>
        </Stack>
      )}
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
              `/dashboard/${auth?.account_role?.label.toLowerCase().split(" ").join("-")}/profile`,
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
