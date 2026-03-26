"use client";
import { authAtom } from "@/atoms/auth.atom";
import { loadedDataAtom, loaderAtom } from "@/atoms/loader.atom";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import { useAtom } from "jotai";
import Link from "next/link";
import * as React from "react";

const OperatorPage = () => {
  const [loaderData] = useAtom(loadedDataAtom);
  const [loaded] = useAtom(loaderAtom);
  const [auth] = useAtom(authAtom);
  const wo = loaderData.work_order;
  const wc = loaderData.work_center.code;
  const opName = auth?.full_name?.trim();

  if (!loaded.isLoaded) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: "calc(100vh - 220px)", py: 2 }}
      >
        <Grid size={{ xs: 12, sm: 10, md: 8, lg: 6 }}>
          <Paper
            variant="outlined"
            sx={{
              p: { xs: 3, sm: 4 },
              borderRadius: 3,
              textAlign: "center",
              bgcolor: "grey.100",
            }}
          >
            <Stack spacing={2} alignItems="center">
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  bgcolor: "warning.lighter",
                  color: "warning.dark",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <PendingActionsOutlinedIcon sx={{ fontSize: 34 }} />
              </Box>

              <Typography variant="h5" fontWeight={700}>
                Load Job First
              </Typography>

              <Typography variant="body2" color="text.secondary">
                There are no active jobs. Select a job from the Job List first
                to view the operator dashboard.
              </Typography>

              <Button
                component={Link}
                href="/dashboard/operator/job-list"
                variant="contained"
              >
                Go to Job List
              </Button>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    );
  }

  if (!opName) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: "calc(100vh - 220px)", py: 2 }}
      >
        <Typography variant="body2" color="text.secondary">
          Loading dashboard data...
        </Typography>
      </Grid>
    );
  }

  return (
    <Paper variant="outlined">
      <iframe
        // style="border:1px #FFFFFF none"
        src={`http://192.168.68.99:3002/d/taiyooperatormesdashboard-1/embed?wo=${wo}&wc=${wc}&operator=${opName}`}
        title="iFrame"
        width="100%"
        height="700px"
        scrolling="yes"
        frameBorder="no"
        allow="fullscreen"
      ></iframe>
    </Paper>
  );
};

export default OperatorPage;
