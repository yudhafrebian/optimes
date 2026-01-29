import { Box, Card, CardContent, Divider, Grid, Skeleton } from "@mui/material";

const ProfileSkeleton = () => {
  return (
    <Box sx={{ width: "100%" }}>
      {/* Header Card Skeleton */}
      <Card sx={{ mb: 2 }}>
        <CardContent sx={{ display: "flex", gap: 4, alignItems: "center" }}>
          <Skeleton variant="circular" width={100} height={100} />
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width="30%" height={40} />
            <Skeleton variant="text" width="20%" height={30} />
            <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
              <Skeleton variant="rounded" width={80} height={32} />
              <Skeleton variant="text" width={120} height={32} />
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Grid Content Skeleton */}
      <Grid container spacing={2}>
        {[1, 2, 3, 4].map((item) => (
          <Grid size={6} key={item}>
            <Card sx={{ height: "100%" }}>
              <Box sx={{ p: 2 }}>
                <Skeleton variant="text" width="50%" height={30} />
              </Box>
              <Divider />
              <CardContent>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  {[1, 2, 3].map((line) => (
                    <Box key={line}>
                      <Skeleton variant="text" width="40%" height={20} />
                      <Skeleton variant="text" width="70%" height={25} />
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProfileSkeleton;
