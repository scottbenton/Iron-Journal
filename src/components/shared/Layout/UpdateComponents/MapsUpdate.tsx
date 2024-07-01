import { Box, Divider, Stack, Typography } from "@mui/material";
import { useAppName } from "hooks/useAppName";
import { useGameSystem } from "hooks/useGameSystem";
import { GAME_SYSTEMS } from "types/GameSystems.type";
import MapIcon from "@mui/icons-material/Map";
import { getPublicAssetPath } from "functions/getPublicAssetPath";

export function MapsUpdate() {
  const appName = useAppName();
  const gameSystem = useGameSystem().gameSystem;

  if (gameSystem === GAME_SYSTEMS.STARFORGED) {
    return (
      <Stack spacing={3}>
        <Typography>
          Sectors have become Locations, and are now much more flexible! You can
          add maps to any of your locations by clicking on the{" "}
          <MapIcon color={"action"} sx={{ mb: -0.5 }} /> icon.
        </Typography>
        <Divider />

        <Typography>
          <b>New Features</b>
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography>Locations can now be stacked.</Typography>
          <img
            src={getPublicAssetPath("CrewLinkStackedLocations.png")}
            alt={"Map with multiple locations on the same hex."}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography>Add Maps to your Planets.</Typography>
          <img
            src={getPublicAssetPath("CrewLinkPlanet.png")}
            alt={"Planet with a map"}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography>Add color to the background of your map.</Typography>
          <img
            src={getPublicAssetPath("CrewLinkColorBackground.png")}
            alt={"Map with a colored in background"}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography>Or upload a background image instead.</Typography>
          <img
            src={getPublicAssetPath("CrewLinkImageBackground.png")}
            alt={"Map with an image in background"}
          />
        </Box>
        {/* Discuss improvements, including embedded maps, stackable locations the ability to upload images, choose icons, paint backgrounds */}
      </Stack>
    );
  }

  return (
    <Stack spacing={3}>
      <Typography>
        {appName} now has maps! You can add maps to any of your locations by
        clicking on the <MapIcon color={"action"} sx={{ mb: -0.5 }} /> icon.
      </Typography>

      <Divider />

      <Typography>
        <b>New Features</b>
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography>Add new or existing locations to your map</Typography>
        <img
          src={getPublicAssetPath("CreateOrAddLocations.png")}
          alt={"Map with a colored in background"}
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography>Change location icons.</Typography>
        <img
          src={getPublicAssetPath("EditLocationImage.png")}
          alt={"Map with a colored in background"}
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography>Add color to the background of your map.</Typography>
        <img
          src={getPublicAssetPath("ColorLocationBackground.png")}
          alt={"Map with a colored in background"}
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography>Or upload a background image instead.</Typography>
        <img
          src={getPublicAssetPath("BackgroundImage.png")}
          alt="Map with a Background Image"
        />
      </Box>
    </Stack>
  );
}
