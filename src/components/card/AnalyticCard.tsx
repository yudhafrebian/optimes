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

  // Fungsi pembantu untuk mengambil warna dari palet tema atau string hex
  const resolveColor = (colorStr: string) => {
    const parts = colorStr.split(".");
    // Cek apakah ini path palet (misal: 'success.light')
    if (parts.length === 2) {
      const [group, shade] = parts;
      return (theme.palette as any)[group]?.[shade] || colorStr;
    }
    return colorStr;
  };

  const baseIconColor = resolveColor(iconColor);
  const baseBgColor = resolveColor(iconBackgroundColor || iconColor);

  return (
    <Card sx={{ borderRadius: 1 }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid size={4}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                aspectRatio: "1/1",
                borderRadius: 2,
                p: 1.5,
                // Sekarang alpha() menerima warna HEX murni dari tema
                bgcolor: alpha(baseBgColor, 0.15),
                border: `1px solid ${alpha(baseBgColor, 0.2)}`,
              }}
            >
              {React.isValidElement(icon)
                ? React.cloneElement(icon as React.ReactElement<any>, {
                    sx: {
                      width: "100%",
                      height: "100%",
                      color: baseIconColor,
                    },
                  })
                : icon}
            </Box>
          </Grid>
          <Grid size={8}>
            <Box>
              <Typography variant="body2" color="text.secondary">
                {title}
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
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
