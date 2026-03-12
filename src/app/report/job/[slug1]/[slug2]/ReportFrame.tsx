"use client";

import * as React from "react";

interface ReportFrameProps {
  url: string;
  autoPrint?: boolean;
  mode?: "embed" | "image";
}

const ReportFrame: React.FC<ReportFrameProps> = ({
  url,
  autoPrint = false,
  mode = "embed",
}) => {
  const hasPrintedRef = React.useRef(false);

  const handleLoad = React.useCallback(() => {
    if (!autoPrint || hasPrintedRef.current) {
      return;
    }

    hasPrintedRef.current = true;
    window.setTimeout(() => {
      window.print();
    }, 300);
  }, [autoPrint]);

  if (mode === "image") {
    return (
      <img
        src={url}
        alt="Job Report"
        onLoad={handleLoad}
        style={{
          display: "block",
          width: "100%",
          height: "auto",
        }}
      />
    );
  }

  return (
    <iframe
      src={url}
      title="Job Report"
      width="100%"
      height="4200px"
      scrolling="no"
      allow="fullscreen"
      onLoad={handleLoad}
      style={{ border: 0 }}
    />
  );
};

export default ReportFrame;
