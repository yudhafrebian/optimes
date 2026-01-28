import { alpha, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import * as React from "react";

interface IAnalyticCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  iconBackgroundColor?: string;
}

const AnalyticCard: React.FunctionComponent<IAnalyticCardProps> = (props) => {
  return (
    <Card sx={{ borderRadius: 2 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid size={4}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                aspectRatio: "1/1",
                bgcolor: (theme) =>
                  alpha(
                    props.iconBackgroundColor || theme.palette.primary.main,
                    0.15,
                  ),
                // Opsional: Tambahkan border tipis agar efek glass lebih terlihat
                border: (theme) =>
                  `1px solid ${alpha(props.iconBackgroundColor || theme.palette.primary.main, 0.2)}`,
                borderRadius: 2,
                p: 1,
              }}
            >
              {props.icon}
            </Box>
          </Grid>
          <Grid size={8}>
            <Box>
              <Typography variant="body1">{props.title}</Typography>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                {props.value}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AnalyticCard;
