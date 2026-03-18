"use client";

import * as React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

interface ReportFrameProps {
  url: string;
  autoPrint?: boolean;
  mode?: "embed" | "image";
  delay?: number;
  pageTitle?: string;
}

const ReportFrame: React.FC<ReportFrameProps> = ({
  url,
  autoPrint = false,
  mode = "embed",
  delay = 30000,
  pageTitle = "ReportFrame Title Test",
}) => {
  const hasPrintedRef = React.useRef(false);
  const [resourceLoaded, setResourceLoaded] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const safeDelay = Number.isFinite(delay) && delay > 0 ? delay : 30000;

  React.useEffect(() => {
    const previousTitle = document.title;
    document.title = pageTitle;

    return () => {
      document.title = previousTitle;
    };
  }, [pageTitle]);

  React.useEffect(() => {
    hasPrintedRef.current = false;
    setResourceLoaded(false);
    setProgress(0);

    const startedAt = Date.now();
    const intervalId = window.setInterval(() => {
      const elapsed = Date.now() - startedAt;
      const nextProgress = Math.min((elapsed / safeDelay) * 100, 95);
      setProgress(nextProgress);
    }, 100);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [url, autoPrint, mode, safeDelay]);

  const handleLoad = React.useCallback(() => {
    setResourceLoaded(true);
    setProgress(100);
  }, []);

  React.useEffect(() => {
    if (!autoPrint || hasPrintedRef.current || !resourceLoaded) {
      return;
    }

    hasPrintedRef.current = true;
    window.setTimeout(() => {
      window.print();
    }, 300);
  }, [autoPrint, resourceLoaded]);


  const estimatedSeconds = Math.max(
    0,
    Math.ceil(((100 - progress) / 100) * safeDelay / 1000),
  );
  const loadingLabel =
    resourceLoaded
      ? "Finalizing report..."
      : `Loading report...`;
  const progressValue = Math.round(progress);
  const loadingIndicator = (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 1.5,
        zIndex: 1,
      }}
    >
      <Box sx={{ position: "relative", display: "inline-flex", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress variant="determinate" value={progress} size={56} />
        <Box
          sx={{
            inset: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="caption" fontWeight={600}>
            {progressValue}%
          </Typography>
        </Box>
      </Box>
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        {loadingLabel}
      </Typography>
    </Box>
  );

  if (mode === "image") {
    return (
      <Box sx={{ width: "100%", position: "relative", minHeight: "100vh" }}>
        {!resourceLoaded && loadingIndicator}
        <img
          src={url}
          alt="Job Report"
          onLoad={handleLoad}
          style={{
            display: "block",
            width: "100%",
            height: "auto",
            opacity: resourceLoaded ? 1 : 0,
            transition: "opacity 0.2s ease",
          }}
        />
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", position: "relative", minHeight: "100vh" }}>
      {/* {!resourceLoaded && loadingIndicator} */}
      <iframe
        src={url}
        title="Job Report"
        width="100%"
        height="4800px"
        scrolling="no"
        allow="fullscreen"
        // onLoad={handleLoad}
        // style={{
        //   border: 0,
        //   opacity: resourceLoaded ? 1 : 0,
        //   transition: "opacity 0.2s ease",
        // }}
      />
    </Box>
  );
};

export default ReportFrame;
