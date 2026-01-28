import { Avatar, Box, Skeleton } from "@mui/material";

const ProfileMenuSekeleton = () => {
  return (
    <Box
      sx={{ display: "flex", alignItems: "center", gap: 1.5, px: 1.5, py: 0.5 }}
    >
      <Box sx={{ display: { xs: "none", md: "block" }, textAlign: "right" }}>
        <Skeleton
          variant="text"
          width={80}
          height={20}
          animation="wave"
          sx={{ borderRadius: 1 }}
        />
        <Skeleton
          variant="text"
          width={50}
          height={15}
          animation="wave"
          sx={{ borderRadius: 1, ml: "auto" }}
        />
      </Box>
      <Skeleton variant="circular" animation="wave">
        <Avatar sx={{ width: 36, height: 36 }} />
      </Skeleton>
    </Box>
  );
};

export default ProfileMenuSekeleton;
