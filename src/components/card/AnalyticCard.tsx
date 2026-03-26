"use client";

import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";

interface IAnalyticCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  iconColor?: string;
  iconBackgroundColor?: string;
}

import * as React from "react";

const AnalyticCard: React.FunctionComponent<IAnalyticCardProps> = (props) => {
  const {
    title,
    value,
    icon,
    iconColor = "primary.main",
    iconBackgroundColor,
  } = props;
  const theme = useTheme();

  const defaultIconColor = theme.palette.text.primary;
  const defaultBgColor = theme.palette.grey[500];

  // Ambil warna dari palet tema / hex, dengan fallback aman jika key tidak ditemukan.
  const resolveColor = (colorStr: string | undefined, fallback: string) => {
    if (!colorStr) return fallback;

    const parts = colorStr.split(".");
    if (parts.length === 2) {
      const [group, shade] = parts;
      const paletteGroup = (theme.palette as any)[group];
      if (paletteGroup?.[shade]) {
        return paletteGroup[shade];
      }
      return fallback;
    }

    return colorStr;
  };

  const baseIconColor = resolveColor(iconColor, defaultIconColor);
  const baseBgColor = resolveColor(iconBackgroundColor ?? iconColor, defaultBgColor);

  return (
    <Card sx={{ borderRadius: 1, bgcolor: baseBgColor }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid size={4}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: { xs: 38, sm: 48 },
                height: { xs: 38, sm: 48 },
                borderRadius: 2,
                bgcolor: "white",
                border: `1px solid ${alpha(baseBgColor, 0.1)}`,
              }}
            >
              {React.isValidElement(icon)
                ? React.cloneElement(icon as React.ReactElement<any>, {
                    sx: {
                      ...(icon.props as { sx?: Record<string, unknown> }).sx,
                      fontSize: { xs: 20, sm: 28 },
                      color: baseIconColor,
                    },
                  })
                : icon}
            </Box>
          </Grid>
          <Grid size={8}>
            <Box>
              <Typography variant="body2" color="white">
                {title}
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: "bold", color: "white" }}>
                {value}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AnalyticCard;
