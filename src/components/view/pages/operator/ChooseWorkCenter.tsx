import ChooseWorkCenterForm from "@/form/ChooseWorkCenterForm";
import { Box, Paper, Typography } from "@mui/material";
import * as React from "react";

interface IChooseWorkCenterProps {}

const ChooseWorkCenter: React.FunctionComponent<IChooseWorkCenterProps> = (
  props,
) => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography>Please choose work center</Typography>
        <ChooseWorkCenterForm />
      </Paper>
    </Box>
  );
};

export default ChooseWorkCenter;
