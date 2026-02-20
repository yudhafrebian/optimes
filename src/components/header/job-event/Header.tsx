import { Grid, Box } from "@mui/material";
import MachineInfoCard from "../job-execution/MachineInfo";
import CurrentActiveEventCard from "./CurrentActiveEvent";
import EventActionCard from "./EventAction";

export default function JobEventHeader() {
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
        <Grid size={4}>
          <MachineInfoCard />
        </Grid>
        <Grid size={4}>
          <CurrentActiveEventCard />
        </Grid>
        <Grid size={4}>
          <EventActionCard />
        </Grid>
      </Grid>
    </Box>
  );
}
