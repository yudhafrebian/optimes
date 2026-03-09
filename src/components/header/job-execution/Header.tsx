"use client";
import {
  Grid,
  Box,
  Collapse,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import * as React from "react";

import MachineInfoCard from "./MachineInfo";
import CurrentLoadedJobCard from "./CurrentLoadedJob";
import TaiyoOperatorMachineEmbed from "@/components/embed/TaiyoOperatorMachine";
import { usePathname } from "next/navigation";
import TaiyoEventMachineEmbed from "@/components/embed/TaiyoEventMachine";

export default function JobExecutionHeader() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const isOpen = isMobile ? expanded : true;

  const pathname = usePathname();
  const isJobList = pathname.startsWith("/dashboard/operator/job-list");

  return (
    <Box
      sx={{
        bgcolor: "#fff",
        p: { xs: 1.5, sm: 2 },
        width: "100%",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        borderRadius: { xs: 2, md: 0 },
      }}
    >
      {isMobile && (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: isOpen ? 1.5 : 0 }}
        >
          <Typography variant="subtitle1" fontWeight={700}>
            Job Execution
          </Typography>
          <IconButton
            size="small"
            onClick={() => setExpanded((prev) => !prev)}
            aria-label={isOpen ? "Collapse header" : "Expand header"}
          >
            {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Stack>
      )}

      <Collapse in={isOpen}>
        <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
          <Grid size={{ xs: 12, md: 12 }}>
            {isJobList ? (
              <TaiyoOperatorMachineEmbed isExpanded />
            ) : (
              <TaiyoEventMachineEmbed isExpanded />
            )}
          </Grid>

          {/* <Grid size={{ xs: 12, md: 6 }}>
            <CurrentLoadedJobCard />
          </Grid> */}
        </Grid>
      </Collapse>
    </Box>
  );
}
