"use client";
import GenericChips from "@/components/core/GenericChips";
import GenericDialog from "@/components/dialog/GenericDialog";
import { eventPallete } from "@/lib/event";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";

const EventPalleteModule = () => {
  const [searchFilter, setSearchFilter] = React.useState<string>("");
  const [open, setOpen] = React.useState<boolean>(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFilter(event.target.value);
  };

  const filteredEventPallete = React.useMemo(() => {
    const keyword = searchFilter.trim().toLowerCase();

    if (!keyword) {
      return eventPallete;
    }

    return eventPallete.filter((item) =>
      [item.label, item.code, item.description, item.attribute.category].some(
        (value) => value.toLowerCase().includes(keyword),
      ),
    );
  }, [searchFilter]);

  return (
    <>
      <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, height: "100%" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Event Palette</Typography>
          <TextField
            size="small"
            label="Search"
            placeholder="Search Event..."
            value={searchFilter}
            onChange={handleSearchChange}
            slotProps={{
              input: {
                startAdornment: <SearchIcon />,
              },
            }}
          />
        </Box>
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={2} sx={{ maxHeight: 460, overflow: "auto" }}>
          {filteredEventPallete.map((item) => (
            <Grid size={6} key={item.id}>
              <Card
                sx={{
                  border: "1px solid",
                  borderColor:
                    item.attribute.category === "Setup"
                      ? "primary.main"
                      : item.attribute.category === "Production"
                        ? "success.main"
                        : "warning.main",
                }}
              >
                <CardContent>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      {item.label}
                    </Typography>
                    <GenericChips
                      value={item.attribute.category}
                      variant="filled"
                    />
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="caption">{item.description}</Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "flex-end" }}>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => setOpen(true)}
                  >
                    Start
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
          {filteredEventPallete.length === 0 && (
            <Grid size={12}>
              <Typography variant="body2" color="text.secondary">
                Event tidak ditemukan.
              </Typography>
            </Grid>
          )}
        </Grid>
      </Paper>

      <GenericDialog
        title="Start Event"
        content="Are you sure you want to start new event?"
        positiveText="Start"
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
        onRefresh={() => setOpen(false)}
      />
    </>
  );
};

export default EventPalleteModule;
