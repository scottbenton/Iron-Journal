import {
  Box,
  Card,
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
import { useState } from "react";
import { LocationWithGMProperties } from "stores/world/currentWorld/locations/locations.slice.type";
import { AddMoveLocationChooserDialog } from "./AddMoveLocationChooserDialog";

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

  const getToolValue = () => {
    if (currentTool?.type === MapTools.AddPath) {
      return "_path";
    } else if (currentTool?.type === MapTools.AddLocation) {
      return currentTool.locationType ?? "_default";
    } else if (currentTool?.type === MapTools.MoveLocation) {
      return "_addOrMoveLocation";
    }
    return "";
  };
  const handleToolSelection = (toolName: string) => {
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
      setAddMoveLocationChooserOpen(true);
    } else if (toolName) {
      setCurrentTool({
        type: MapTools.AddLocation,
        locationType: toolName,
      });
    } else {
      setCurrentTool(undefined);
    }
  };

  const settingId = useGameSystemValue({
    [GAME_SYSTEMS.IRONSWORN]: "ironlands",
    [GAME_SYSTEMS.STARFORGED]: "forge",
  });
  const settingConfig: ILocationConfig = {
    ...locationConfigs[settingId],
    defaultIcon: {
      key: "GiCompass",
      color: IconColors.White,
    },
  };
  const locationTypeOverrides = settingConfig.locationTypeOverrides ?? {};

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
          {Object.keys(locationTypeOverrides).map((key) => (
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
    </>
  );
}
