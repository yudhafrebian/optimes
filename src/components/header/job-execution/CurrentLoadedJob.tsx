import loaderAtom from "@/atoms/loader.atom";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PauseIcon from "@mui/icons-material/Pause";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import GenericChips from "../../core/GenericChips";
import { useSnackbar } from "@/hooks/useSnackbar";
import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import { useAtom } from "jotai";
import * as React from "react";

interface ICurrentLoadedJobCardProps {}

const CurrentLoadedJobCard: React.FunctionComponent<
  ICurrentLoadedJobCardProps
> = (props) => {
  const [loader, setLoader] = useAtom(loaderAtom);
  const [isBreak, setIsBreak] = React.useState<boolean>(true);

  const showSnackbar = useSnackbar();

  const handleLoadJob = () => {
    setLoader(!loader);
    loader ? setIsBreak(true) : null;
  };

  const handleBreak = () => {
    if (!loader) {
      showSnackbar("Please load the job first.", "warning");
      return;
    }
    setIsBreak(!isBreak);
  };
  return (
    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, height: "100%" }}>
      <Stack
        direction="row"
        justifyContent="space-between"  
        alignItems="center"
        sx={{ mb: 1 }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <AssignmentIcon sx={{ color: "success.main", fontSize: 20 }} />
          <Typography variant="subtitle1" fontWeight="700">
            Currently Loaded Job
          </Typography>
        </Stack>
        <GenericChips value="Running" />
      </Stack>

      <Grid container spacing={1}>
        <Grid size={6}>
          <Typography variant="caption" color="text.secondary" display="block">
            Work Order
          </Typography>
          <Typography variant="body2" fontWeight="700">
            WO-2026-001
          </Typography>
        </Grid>
        <Grid size={6}>
          <Typography variant="caption" color="text.secondary" display="block">
            Sales Order
          </Typography>
          <Typography variant="body2" fontWeight="700">
            SO-2026-4521
          </Typography>
        </Grid>
        <Grid size={6}>
          <Typography variant="caption" color="text.secondary" display="block">
            Target Quantity
          </Typography>
          <Typography variant="body2" fontWeight="700">
            1200 pcs
          </Typography>
        </Grid>
        <Grid size={6}>
          <Typography variant="caption" color="text.secondary" display="block">
            Started
          </Typography>
          <Typography variant="body2" fontWeight="700">
            08:15
          </Typography>
        </Grid>
      </Grid>

      <Box sx={{ mt: 2, mb: 2 }}>
        <Typography variant="caption" color="text.secondary" display="block">
          Notes/Remark
        </Typography>
        <Typography variant="body2">
          High priority order. Quality check every 100 units.
        </Typography>
      </Box>

      <Stack direction="row" spacing={1} sx={{ mt: "auto" }}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={isBreak ? <AssignmentIcon /> : <PauseIcon />}
          sx={{
            textTransform: "none",
            color: "text.primary",
            borderColor: "#e0e0e0",
          }}
          onClick={handleBreak}
        >
          {isBreak ? "Resume" : "Break"}
        </Button>
        <Button
          fullWidth
          variant={loader ? "outlined" : "contained"}
          color={loader ? "inherit" : "primary"}
          startIcon={
            loader ? <FileUploadOutlinedIcon /> : <FileDownloadOutlinedIcon />
          }
          onClick={handleLoadJob}
        >
          {loader ? "Unload Job" : "Load Job"}
        </Button>
        <Button
          fullWidth
          variant="contained"
          color="success"
          startIcon={<CheckCircleOutlineIcon />}
          sx={{ textTransform: "none", boxShadow: "none" }}
        >
          Complete
        </Button>
      </Stack>
    </Paper>
  );
};

export default CurrentLoadedJobCard;
