import { Avatar, Box, Grid, Paper, Stack, Typography } from "@mui/material";
import * as React from "react";
import SettingsIcon from "@mui/icons-material/Settings";

interface IMachineInfoCardProps {
  isExpanded: boolean;
}

const MachineInfoCard: React.FunctionComponent<IMachineInfoCardProps> = (
  props,
) => {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: props.isExpanded ? 2 : 1,
        borderRadius: 2,
        height: "100%",
      }}
    >
      <iframe
        // style="border:1px #FFFFFF none"
        src="http://192.168.68.9:3000/d/dashboard-a/embed"
        title="iFrame"
        width="100%"
        height="250px"
        scrolling="yes"
        // frameborder="no"
        allow="fullscreen"
      ></iframe>
    </Paper>
  );
};

export default MachineInfoCard;
