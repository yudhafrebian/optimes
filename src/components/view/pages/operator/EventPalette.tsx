"use client";
import { LookupResponseDto } from "@/api-client";
import { loadedDataAtom, loaderAtom } from "@/atoms/loader.atom";
import GenericChips from "@/components/core/GenericChips";
import { eventDialogConfig } from "@/components/dialog/eventDialogConfig";
import GenericDialog from "@/components/dialog/GenericDialog";
import GenericModal from "@/components/modal/GenericModal";
import CreatEventLookupForm from "@/form/CreateEventLookupForm";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomEventForm from "@/form/CustomEventForm";
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
  IconButton,
  Paper,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useAtom } from "jotai";
import { usePathname } from "next/navigation";
import * as React from "react";
import { useSnackbar } from "@/hooks/useSnackbar";
import EditEventLookupForm from "@/form/EditEventLookupForm";
import GenericDrawer from "@/components/drawer/GenericDrawer";
import { authAtom } from "@/atoms/auth.atom";

type EventCardProps = {
  item: LookupResponseDto;
  isHeadProduction: boolean;
  onStart: (eventCode: string) => void;
  onEdit?: (item: LookupResponseDto) => void;
  onDelete?: (id: string) => void;
  onChangeStatus: (id: string, isActive: boolean) => Promise<void>;
};

type EventCategory = "Setup" | "Idle" | "Production";

const EVENT_CATEGORIES: EventCategory[] = ["Production", "Setup", "Idle"];

const resolveEventCategory = (item: LookupResponseDto): EventCategory => {
  const codeCategory = item.code?.split("/")[0]?.trim();

  if (codeCategory === "Production") return "Production";
  if (codeCategory === "Setup") return "Setup";
  if (codeCategory === "Idle") return "Idle";

  const labelCategory = item.label?.split(" ")[0]?.trim();
  if (labelCategory === "Production") return "Production";
  if (labelCategory === "Setup") return "Setup";

  return "Idle";
};

const EventCard = React.memo(
  ({
    item,
    isHeadProduction,
    onStart,
    onChangeStatus,
    onEdit,
    onDelete,
  }: EventCardProps) => {
    const category = resolveEventCategory(item);

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
      <Grid size={{ xs: 12, sm: isHeadProduction ? 4 : 6 }}>
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
          {isHeadProduction ? (
            <CardActions sx={{ justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Tooltip title="Edit" placement="top">
                  <IconButton
                    color="primary"
                    sx={{ bgcolor: "primary.lighter" }}
                    size="small"
                    onClick={() => onEdit?.(item)}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete" placement="top">
                  <IconButton
                    color="error"
                    sx={{ bgcolor: "error.lighter" }}
                    size="small"
                    onClick={() => onDelete?.(String(item.id))}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box>
                <Switch
                  checked={item.is_active}
                  onChange={() =>
                    onChangeStatus(String(item.id), !item.is_active)
                  }
                />
                <GenericChips value={item.is_active ? "Active" : "Inactive"} />
              </Box>
            </CardActions>
          ) : (
            <CardActions sx={{ justifyContent: "flex-end" }}>
              <Button
                size="small"
                variant="contained"
                color={buttonColor}
                onClick={() => onStart(item.code)}
                disabled={!item.is_active}
              >
                {item.is_active ? "Start" : "Inactive"}
              </Button>
            </CardActions>
          )}
        </Card>
      </Grid>
    );
  },
);

EventCard.displayName = "EventCard";

interface EventPalleteProps {
  onRefresh: () => void;
}

const EventPalleteModule: React.FC<EventPalleteProps> = ({ onRefresh }) => {
  const [searchFilter, setSearchFilter] = React.useState<string>("");
  const [data, setData] = React.useState<LookupResponseDto[]>([]);
  const [open, setOpen] = React.useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = React.useState<boolean>(false);
  const [editData, setEditData] = React.useState<any>(null);
  const [dialogType, setDialogType] = React.useState<
    "create" | "custom" | "start" | "delete" | null
  >(null);
  const [selectedEvent, setSelectedEvent] = React.useState<string>("");
  const [loaderData] = useAtom(loadedDataAtom);
  const [loaded] = useAtom(loaderAtom);
  const [auth] = useAtom(authAtom);

  const showsnackbar = useSnackbar();
  const pathname = usePathname();
  const isHeadProduction = pathname.startsWith("/dashboard/head-of-production");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFilter(event.target.value);
  };
  const deferredSearchFilter = React.useDeferredValue(searchFilter);

  const dialogConfig = eventDialogConfig(dialogType);

  const handleStartEvent = React.useCallback((eventCode: string) => {
    setDialogType("start");
    setSelectedEvent(eventCode);
  }, []);

  const getData = React.useCallback(async () => {
    try {
      const res = await commonApi.lookupControllerFindAll({
        type: "TAIYO_EVENT_PALETTE",
      });
      setData(res);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleDialogDelete = React.useCallback((id: string) => {
    setDialogType("delete");
    setSelectedEvent(id);
  }, []);
  const handleDialogEdit = React.useCallback((item: LookupResponseDto) => {
    setEditData(item);
    setOpen(true);
  }, []);

  const handleDeleteEvent = async (id: string) => {
    try {
      await commonApi.lookupControllerRemove(id);

      showsnackbar("Event deleted successfully", "success");

      getData();
      setDialogType(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeStatus = React.useCallback(
    async (id: string, isActive: boolean) => {
      try {
        await commonApi.lookupControllerActivate(id, {
          is_active: isActive,
        });

        await getData();
      } catch (error) {
        console.log(error);
      }
    },
    [getData],
  );

  const filteredEventPallete = React.useMemo(() => {
    const keyword = deferredSearchFilter.trim().toLowerCase();

    if (!keyword) {
      return data;
    }

    return data.filter((item) =>
      [item.label, item.code, item.description].some((value) =>
        value?.toLowerCase().includes(keyword),
      ),
    );
  }, [data, deferredSearchFilter]);

  const eventByCategory = React.useMemo(() => {
    return EVENT_CATEGORIES.reduce(
      (acc, category) => {
        acc[category] = filteredEventPallete.filter(
          (item) => resolveEventCategory(item) === category,
        );
        return acc;
      },
      {
        Setup: [] as LookupResponseDto[],
        Idle: [] as LookupResponseDto[],
        Production: [] as LookupResponseDto[],
      },
    );
  }, [filteredEventPallete]);

  const handleCreateEvent = async () => {
    try {
      if (!auth) {
        throw new Error("User ID is required");
      }
      const path = `${loaderData.work_center.code}.Job Activity`;

      // const res = await assetsApi.setAssetValuesBatch({
      //   items: [
      //     {
      //       path: `${loaderData.work_center.code}.Machine Operator`,
      //       value: {
      //         value: auth.id,
      //         label: auth.full_name,
      //       },
      //     },
      //     {
      //       path: path,
      //       value: selectedEvent,
      //     },
      //   ],
      // });

      await assetsApi.setAssetValuesByPath(
        `${loaderData.work_center.code}.Machine Operator`,
        {
          value: {
          },
        },
      );
      const res = await assetsApi.setAssetValuesByPath(
        `${loaderData.work_center.code}.Machine Operator`,
        {
          value: {
            value: auth.id,
            label: auth.full_name,
          },
        },
      );

      await assetsApi.setAssetValuesByPath(path, {
        value: selectedEvent,
      });

      onRefresh();
      setDialogType(null);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getData();
  }, [getData]);

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
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Button
              variant="contained"
              onClick={() => setOpen(true)}
              sx={{ whiteSpace: "nowrap", flexShrink: 0 }}
              disabled={!isHeadProduction && !loaderData.work_center.code}
            >
              {isHeadProduction ? "New Event" : "Custom Event"}
            </Button>
            <TextField
              size="small"
              label="Search"
              placeholder="Search Event..."
              value={searchFilter}
              onChange={handleSearchChange}
              sx={{ width: { xs: "100%", sm: 280 } }}
              slotProps={{
                input: {
                  startAdornment: <SearchIcon />,
                },
              }}
            />
          </Box>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box
          sx={{ maxHeight: isHeadProduction ? "100%" : 330, overflow: "auto" }}
        >
          {loaded.isLoaded || isHeadProduction ? (
            EVENT_CATEGORIES.map((category) => (
              <Box key={category} sx={{ mb: 2.5 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                  {category}
                </Typography>

                <Grid container spacing={2}>
                  {eventByCategory[category].map((item) => (
                    <EventCard
                      key={item.id}
                      item={item}
                      isHeadProduction={isHeadProduction}
                      onEdit={handleDialogEdit}
                      onDelete={handleDialogDelete}
                      onStart={handleStartEvent}
                      onChangeStatus={handleChangeStatus}
                    />
                  ))}
                </Grid>
              </Box>
            ))
          ) : (
            <Box
              sx={{
                py: 4,
                px: 2,
                textAlign: "center",
                border: "1px dashed",
                borderColor: "divider",
                borderRadius: 2,
                bgcolor: "grey.50",
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
                No job loaded
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Please load a job from the Operator Table first.
              </Typography>
            </Box>
          )}

          {filteredEventPallete.length === 0 && (
            <Box>
              <Typography variant="body2" color="text.secondary">
                Event not found.
              </Typography>
            </Box>
          )}
        </Box>
      </Paper>

      <GenericDialog
        title={dialogConfig.title}
        content={dialogConfig.content}
        positiveText={dialogConfig.positiveText}
        open={
          dialogType === "start" ||
          dialogType === "custom" ||
          dialogType === "create" ||
          dialogType === "delete"
        }
        onClose={() => setDialogType(null)}
        isTriggerDrawer={!isHeadProduction}
        triggerLabel="Edit Material Data"
        onTriggerDrawer={() => setOpenDrawer(true)}
        onConfirm={() => {
          if (dialogType === "delete") {
            void handleDeleteEvent(selectedEvent);
            return;
          }
          void handleCreateEvent();
        }}
        onRefresh={() => {}}
      />

      <GenericModal
        open={open}
        onClose={() => {
          setOpen(false);
          setEditData(null);
        }}
        title={
          isHeadProduction && !editData
            ? "Create New Event"
            : isHeadProduction && editData
              ? "Edit Event"
              : "Create Custom Event"
        }
      >
        {isHeadProduction && !editData ? (
          <CreatEventLookupForm
            onSuccess={() => {
              setOpen(false), getData(), setEditData(null);
            }}
          />
        ) : isHeadProduction && editData ? (
          <EditEventLookupForm
            onSuccess={() => {
              setOpen(false), getData(), setEditData(null);
            }}
            data={editData}
          />
        ) : (
          <CustomEventForm onSuccess={() => setOpen(false)} />
        )}
      </GenericModal>

      <GenericDrawer
        anchor="right"
        closeDrawer={() => setOpenDrawer(false)}
        open={openDrawer}
        sx={{
          zIndex: (theme) => theme.zIndex.modal + 2,
          "& .MuiDrawer-paper": {
            zIndex: (theme) => theme.zIndex.modal + 2,
            width: { xs: "40%", sm: "360px" },
          },
          "& .MuiBackdrop-root": {
            zIndex: (theme) => theme.zIndex.modal + 1,
          },
        }}
      >
        <iframe
          // style="border:1px #FFFFFF none"
          src={`http://192.168.68.99:3002/d/taiyooperatormeseventattributedialog/embed?operator=%7B"label"%3A"-"%2C"value"%3A"-"%7D&wc=${loaderData.work_center.code}`}
          title="iFrame"
          width="100%"
          height="300px"
          scrolling="yes"
          frameBorder={0}
          allow="fullscreen"
        ></iframe>
      </GenericDrawer>
    </>
  );
};

export default EventPalleteModule;
