// components/core/StatusChip.tsx
"use client";
import React from "react";
import { Chip } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";

type ChipColor =
  | "default"
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning";

interface StatusChipProps {
  value: string;
  variant?: "filled" | "outlined";
  colorMap?: Record<string, ChipColor>;
  sx?: SxProps<Theme>;
}

const defaultColorMap: Record<string, ChipColor> = {
  "active": "success",
  "running": "success",
  "released": "primary",
  "closed": "error",
  "on hold": "warning", 
  "completed": "secondary",  
  "created": "primary",     
  "scheduled": "default",  
  "urgent": "error",
  "suspended": "warning",
  "disabled": "error",
  "administrator": "primary",
  "operator": "secondary",
  "ppic": "warning",
  "maintenance administrator": "success",
  "maintenance": "default",
  "high": "error",
  "medium": "warning",
  "low": "success",
  "setup": "primary",
  "production": "success",
  "idle": "warning",
  "loaded": "secondary",
  "info": "primary",
  "open": "success",
};

const GenericChips: React.FC<StatusChipProps> = ({
  value,
  variant = "outlined",
  colorMap = {},
  sx,
}) => {
  // Gabungkan mapping default dengan mapping kustom dari props
  const combinedMap = { ...defaultColorMap, ...colorMap };

  // Ambil warna berdasarkan value (lowercase agar tidak case-sensitive)
  const statusColor = combinedMap[value.toLowerCase()] || "default";

  const formattedLabel = value.replace(/_/g, " ");
  return (
    <Chip
      label={formattedLabel}
      color={statusColor}
      size="small"
      variant={variant}
      sx={[
        {
          fontWeight: "600",
          fontSize: "0.75rem",
          textTransform: "capitalize",
          minWidth: "80px",
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    />
  );
};

export default GenericChips;
