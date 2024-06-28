import {
  Box,
  Card,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import { MapTool, MapTools } from "./MapTools.enum";
import PathIcon from "@mui/icons-material/Timeline";
import HelpIcon from "@mui/icons-material/Help";
import { useGameSystemValue } from "hooks/useGameSystemValue";
import { GAME_SYSTEMS } from "types/GameSystems.type";
import { ILocationConfig, locationConfigs } from "config/locations.config";
import { IconColors } from "types/Icon.type";
import { GameIcon } from "components/shared/GameIcons/GameIcon";
import MoveIcon from "@mui/icons-material/OpenWith";
import { useRef, useState } from "react";
import { LocationWithGMProperties } from "stores/world/currentWorld/locations/locations.slice.type";
import { AddMoveLocationChooserDialog } from "./AddMoveLocationChooserDialog";
import DefaultPaintIcon from "@mui/icons-material/Brush";
import { BackgroundColorSelectorList } from "./BackgroundColorSelectorList";
import EraseIcon from "@mui/icons-material/FormatColorReset";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { backgroundColors } from "./backgroundColors";
import CursorIcon from "@mui/icons-material/TouchApp";
import { useStore } from "stores/store";
import { MAX_FILE_SIZE, MAX_FILE_SIZE_LABEL } from "lib/storage.lib";
import { useSnackbar } from "providers/SnackbarProvider";
import { useConfirm } from "material-ui-confirm";
import AddImageIcon from "@mui/icons-material/AddPhotoAlternate";
import RemoveImageIcon from "@mui/icons-material/DisabledByDefault";

export interface MapToolChooserProps {
  currentTool?: MapTool;
  setCurrentTool: (tool?: MapTool) => void;
  locations: Record<string, LocationWithGMProperties>;
  currentLocationId: string;
}

export function MapToolChooser(props: MapToolChooserProps) {
  const { currentTool, setCurrentTool, locations, currentLocationId } = props;

  const [addMoveLocationChooserOpen, setAddMoveLocationChooserOpen] =
    useState(false);

  const [backgroundColorChooserOpen, setBackgroundColorChooserOpen] =
    useState(false);
  const backgroundColorButtonRef = useRef<HTMLButtonElement>(null);

  const getToolValue = () => {
    if (currentTool?.type === MapTools.AddPath) {
      return "_path";
    } else if (currentTool?.type === MapTools.AddLocation) {
      return currentTool.locationType ?? "_default";
    } else if (currentTool?.type === MapTools.MoveLocation) {
      return "_addOrMoveLocation";
    } else if (
      currentTool?.type === MapTools.BackgroundPaint ||
      currentTool?.type === MapTools.BackgroundEraser
    ) {
      return "_paintBG";
    }
    return "_cursor";
  };
  const handleToolSelection = (toolName: string | null) => {
    if (toolName === "_path") {
      setCurrentTool({
        type: MapTools.AddPath,
      });
    } else if (toolName === "_default") {
      setCurrentTool({
        type: MapTools.AddLocation,
        locationType: "",
      });
    } else if (toolName === "_addOrMoveLocation") {
      setCurrentTool(undefined);
      setAddMoveLocationChooserOpen(true);
    } else if (toolName === "_paintBG") {
      setCurrentTool(undefined);
      setBackgroundColorChooserOpen(true);
    } else if (toolName) {
      setCurrentTool({
        type: MapTools.AddLocation,
        locationType: toolName,
      });
    } else if (
      currentTool?.type === MapTools.BackgroundEraser ||
      (currentTool?.type === MapTools.BackgroundPaint && toolName === null)
    ) {
      setCurrentTool(undefined);
      setBackgroundColorChooserOpen(true);
    } else {
      setCurrentTool(undefined);
    }
  };

  const settingId = useGameSystemValue({
    [GAME_SYSTEMS.IRONSWORN]: "ironlands",
    [GAME_SYSTEMS.STARFORGED]: "forge",
  });
  const settingConfig: ILocationConfig = {
    defaultIcon: {
      key: "GiCompass",
      color: IconColors.White,
    },
    ...locationConfigs[settingId],
  };
  const locationTypeOverrides = settingConfig.locationTypeOverrides ?? {};

  const mapInputRef = useRef<HTMLInputElement>(null);
  const hasMapBackground =
    locations[currentLocationId]?.mapBackgroundImageFilename;
  const uploadMapBackgroundImage = useStore(
    (store) =>
      store.worlds.currentWorld.currentWorldLocations
        .uploadLocationMapBackground
  );
  const removeMapBackgroundImage = useStore(
    (store) =>
      store.worlds.currentWorld.currentWorldLocations
        .removeLocationMapBackground
  );

  const { error } = useSnackbar();
  const confirm = useConfirm();
  const handleFileUpload = (file: File) => {
    if (file && currentLocationId) {
      if (file.size > MAX_FILE_SIZE) {
        error(
          `File is too large. The max file size is ${MAX_FILE_SIZE_LABEL}.`
        );
        return;
      }
      uploadMapBackgroundImage(currentLocationId, file).catch(() => {});
    }
  };

  const handleFileRemove = () => {
    if (currentLocationId) {
      confirm({
        description: "Are you sure you want to remove the map background?",
        confirmationText: "Remove",
        confirmationButtonProps: {
          color: "error",
        },
      }).then(() => {
        removeMapBackgroundImage(currentLocationId).catch(() => {});
      });
    }
  };

  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        mt={2}
      >
        <ToggleButtonGroup
          value={getToolValue()}
          onChange={(evt, value) => handleToolSelection(value)}
          exclusive
          color={"primary"}
          sx={(theme) => ({
            ["& button"]: {
              borderColor: theme.palette.grey[500],
              "&:hover": {
                bgcolor:
                  theme.palette.grey[theme.palette.mode === "dark" ? 800 : 700],
              },
            },
          })}
        >
          <Tooltip title={"Normal Cursor"}>
            <ToggleButton
              value={"_cursor"}
              sx={(theme) => ({
                bgcolor:
                  currentTool?.type === undefined
                    ? theme.palette.grey[
                        theme.palette.mode === "dark" ? 700 : 600
                      ]
                    : undefined,
              })}
            >
              <CursorIcon sx={{ color: "#fff" }} />
            </ToggleButton>
          </Tooltip>
          <Tooltip title={"Add Path"}>
            <ToggleButton
              value={"_path"}
              sx={(theme) => ({
                bgcolor:
                  currentTool?.type === MapTools.AddPath
                    ? theme.palette.grey[
                        theme.palette.mode === "dark" ? 700 : 600
                      ]
                    : undefined,
              })}
            >
              <PathIcon sx={{ color: "#cbd5e1" }} />
            </ToggleButton>
          </Tooltip>
          <Tooltip title={"Paint Background"}>
            <ToggleButton
              ref={backgroundColorButtonRef}
              value={"_paintBG"}
              sx={(theme) => ({
                bgcolor:
                  currentTool?.type === MapTools.BackgroundPaint ||
                  currentTool?.type === MapTools.BackgroundEraser
                    ? theme.palette.grey[
                        theme.palette.mode === "dark" ? 700 : 600
                      ]
                    : undefined,
              })}
            >
              <PaintIcon currentTool={currentTool} />
              <ExpandMoreIcon fontSize={"small"} sx={{ color: "#fff" }} />
            </ToggleButton>
          </Tooltip>
          {Object.keys(locationTypeOverrides)
            .filter((key) => !locationTypeOverrides[key].hideInTools)
            .map((key) => (
              <Tooltip title={locationTypeOverrides[key].label} key={key}>
                <ToggleButton
                  value={key}
                  sx={(theme) => ({
                    bgcolor:
                      currentTool?.type === MapTools.AddLocation &&
                      currentTool.locationType === key
                        ? theme.palette.grey[
                            theme.palette.mode === "dark" ? 700 : 600
                          ]
                        : undefined,
                  })}
                >
                  <GameIcon
                    iconColor={
                      locationTypeOverrides[key].config.defaultIcon.color
                    }
                    iconName={locationTypeOverrides[key].config.defaultIcon.key}
                  />
                </ToggleButton>
              </Tooltip>
            ))}
          <Tooltip title={"Default Location"}>
            <ToggleButton
              value={"_default"}
              sx={(theme) => ({
                bgcolor:
                  currentTool?.type === MapTools.AddLocation &&
                  currentTool.locationType === ""
                    ? theme.palette.grey[
                        theme.palette.mode === "dark" ? 700 : 600
                      ]
                    : undefined,
              })}
            >
              <GameIcon
                iconColor={settingConfig.defaultIcon.color}
                iconName={settingConfig.defaultIcon.key}
              />
            </ToggleButton>
          </Tooltip>
          <Tooltip title={"Add or Move Existing Location"}>
            <ToggleButton
              value={"_addOrMoveLocation"}
              sx={(theme) => ({
                bgcolor:
                  currentTool?.type === MapTools.MoveLocation
                    ? theme.palette.grey[
                        theme.palette.mode === "dark" ? 700 : 600
                      ]
                    : undefined,
              })}
            >
              <MoveIcon sx={{ color: "#fff" }} />
            </ToggleButton>
          </Tooltip>
        </ToggleButtonGroup>
        <Tooltip
          enterTouchDelay={0}
          title={
            <Box p={1} maxWidth={300}>
              <Typography variant={"body2"}>
                Click an icon on the left to select it, then click a hex on the
                map to place it.
              </Typography>
            </Box>
          }
          slots={{ tooltip: Card }}
          slotProps={{
            tooltip: {
              sx: (theme) => ({
                bgcolor: "#fff",
                color: theme.palette.grey[700],
              }),
            },
          }}
        >
          <HelpIcon color={"info"} sx={{ ml: 2 }} />
        </Tooltip>
      </Box>
      <AddMoveLocationChooserDialog
        open={addMoveLocationChooserOpen}
        onClose={() => setAddMoveLocationChooserOpen(false)}
        locations={locations}
        currentLocationId={currentLocationId}
        onLocationSelected={(locationId) => {
          setCurrentTool({
            type: MapTools.MoveLocation,
            locationId,
          });
          setAddMoveLocationChooserOpen(false);
        }}
      />
      <Menu
        anchorEl={backgroundColorButtonRef.current}
        open={backgroundColorChooserOpen}
        onClose={() => setBackgroundColorChooserOpen(false)}
      >
        <BackgroundColorSelectorList
          onSelect={(color) => {
            setCurrentTool({
              type: MapTools.BackgroundPaint,
              color,
            });
            setBackgroundColorChooserOpen(false);
          }}
        />
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              setCurrentTool({ type: MapTools.BackgroundEraser });
              setBackgroundColorChooserOpen(false);
            }}
          >
            <ListItemIcon>
              <EraseIcon />
            </ListItemIcon>
            <ListItemText primary={"Erase"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              setBackgroundColorChooserOpen(false);
              mapInputRef.current?.click();
            }}
          >
            <ListItemIcon>
              <AddImageIcon />
            </ListItemIcon>
            <ListItemText primary={"Upload Map Background Image"} />
          </ListItemButton>
        </ListItem>
      </Menu>
      <input
        ref={mapInputRef}
        hidden
        accept="image/*"
        multiple
        type="file"
        onChange={(evt) => {
          const file = evt.target.files?.[0];
          if (file) {
            handleFileUpload(file);
          }
        }}
      />
    </>
  );
}

function PaintIcon(props: { currentTool?: MapTool }) {
  const { currentTool } = props;

  if (currentTool?.type === MapTools.BackgroundEraser) {
    return <EraseIcon sx={{ color: "#fff" }} />;
  }
  if (currentTool?.type === MapTools.BackgroundPaint) {
    return (
      <Box
        sx={{
          bgcolor: backgroundColors[currentTool.color].color,
          width: 20,
          height: 20,
          borderRadius: 999,
          border: "1px solid #00000070",
        }}
      />
    );
  }
  return <DefaultPaintIcon sx={{ color: "#fff" }} />;
}
