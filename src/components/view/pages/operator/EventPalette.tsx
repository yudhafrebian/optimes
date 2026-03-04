"use client";
import { LookupResponseDto } from "@/api-client";
import { loadedDataAtom } from "@/atoms/loader.atom";
import GenericDialog from "@/components/dialog/GenericDialog";
import { assetsApi, commonApi } from "@/lib/api";
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
import { useAtom } from "jotai";
import * as React from "react";

type EventCardProps = {
  item: LookupResponseDto;
  onStart: (eventCode: string) => void;
};

const EventCard = React.memo(({ item, onStart }: EventCardProps) => {
  const category = item.label.split(" ")[0];

  const cardColor =
    category === "Setup"
      ? "primary.lighter"
      : category === "Production"
        ? "success.lighter"
        : "warning.lighter";

  const buttonColor =
    category === "Setup"
      ? "primary"
      : category === "Production"
        ? "success"
        : "warning";
  return (
    <Grid size={{ xs: 12, sm: 6 }}>
      <Card
        sx={{
          minHeight: 100,
          border: "1px solid",
          borderColor: "gray",
          bgcolor: cardColor,
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              minHeight: 20,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              {item.label}
            </Typography>
          </Box>
          <Divider sx={{ my: 1 }} />
          <Typography variant="caption">{item.description}</Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button
            size="small"
            variant="contained"
            color={buttonColor}
            onClick={() => onStart(item.code)}
          >
            Start
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
});

EventCard.displayName = "EventCard";

interface EventPalleteProps {
  onRefresh: () => void;
}

const EventPalleteModule: React.FC<EventPalleteProps> = ({ onRefresh }) => {
  const [searchFilter, setSearchFilter] = React.useState<string>("");
  const [data, setData] = React.useState<LookupResponseDto[]>([]);
  const [open, setOpen] = React.useState<boolean>(false);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = React.useState<string>("");
  const [loaderData] = useAtom(loadedDataAtom);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFilter(event.target.value);
  };

  const handleStartEvent = React.useCallback((eventCode: string) => {
    setOpen(true);
    setSelectedEvent(eventCode);
  }, []);

  const filteredEventPallete = React.useMemo(() => {
    const keyword = searchFilter.trim().toLowerCase();

    if (!keyword) {
      return data;
    }

    return data.filter((item) =>
      [item.label, item.code, item.description].some((value) =>
        value?.toLowerCase().includes(keyword),
      ),
    );
  }, [data, searchFilter]);

  const handleCreateEvent = async () => {
    try {
      const path = `${loaderData.work_center.code}.Job Activity`;
      await assetsApi.setAssetValuesByPath(path, {
        value: selectedEvent,
      });
      onRefresh();
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await commonApi.lookupControllerFindAll({
          type: "TAIYO_EVENT_PALETTE",
        });
        setData(res);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  return (
    <>
      <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, height: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: { xs: "column", sm: "row" },
            gap: 1,
          }}
        >
          <Typography variant="h6">Event Palette</Typography>
            <TextField
              size="small"
              label="Search"
              placeholder="Search Event..."
              value={searchFilter}
              onChange={handleSearchChange}
              fullWidth
              sx={{ maxWidth: { xs: "100%", sm: 280 } }}
              slotProps={{
                input: {
                  startAdornment: <SearchIcon />,
                },
              }}
            />
        </Box>
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={2} sx={{ maxHeight: 330, overflow: "auto" }}>
          {filteredEventPallete.map((item) => (
            <EventCard key={item.id} item={item} onStart={handleStartEvent} />
          ))}
          {filteredEventPallete.length === 0 && (
            <Grid size={12}>
              <Typography variant="body2" color="text.secondary">
                Event not found.
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
        onConfirm={handleCreateEvent}
        onRefresh={() => {}}
      />
    </>
  );
};

export default EventPalleteModule;
