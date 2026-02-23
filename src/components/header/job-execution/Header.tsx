import { Grid, Box } from "@mui/material";

import MachineInfoCard from "./MachineInfo";
import CurrentLoadedJobCard from "./CurrentLoadedJob";

export default function JobExecutionHeader() {
  return (
    <Box
      sx={{
        mb: 4,
        bgcolor: "#fff",
        p: 2,
        width: "100%",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Grid container spacing={3}>
        <Grid size={6}>
          <MachineInfoCard isExpanded />
        </Grid>

        <Grid size={6}>
          <CurrentLoadedJobCard />
        </Grid>
      </Grid>
    </Box>
  );
}
