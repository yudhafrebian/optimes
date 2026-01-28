// components/core/StatusChip.tsx
"use client";
import React from "react";
import { Chip } from "@mui/material";

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
}

const defaultColorMap: Record<string, ChipColor> = {
  active: "success",
  disabled: "warning",

  administrator: "primary",
  operator: "secondary",
  ppic: "warning",
  maintenance_administrator: "success",
  maintenance: "default"
};

const GenericChips: React.FC<StatusChipProps> = ({
  value,
  variant = "outlined",
  colorMap = {},
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
      sx={{
        fontWeight: "600",
        fontSize: "0.75rem",
        textTransform: "capitalize",
        minWidth: "80px",
      }}
    />
  );
};

export default GenericChips;
