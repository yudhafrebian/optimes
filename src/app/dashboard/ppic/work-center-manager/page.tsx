"use client";

import * as React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

interface IWorkCenterManagerPageProps {}

const WorkCenterManagerPage: React.FunctionComponent<
  IWorkCenterManagerPageProps
> = (props) => {
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <Box sx={{ position: "relative", width: "100%", height: "600px" }}>
      {isLoading && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "background.paper",
            zIndex: 1,
          }}
        >
          <CircularProgress sx={{mr:1}} />
          <Typography variant="body2">Loading...</Typography>
        </Box>
      )}

      <iframe
        src="http://192.168.68.106:3001/asset-dashboard"
        title="iFrame"
        width="100%"
        height="100%"
        scrolling="yes"
        allow="fullscreen"
        onLoad={() => setIsLoading(false)}
        style={{ border: "none" }}
      ></iframe>
    </Box>
  );
};

export default WorkCenterManagerPage;
