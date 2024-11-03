import { ClockSection } from "./ClockSection";
import { useGameSystem } from "hooks/useGameSystem";
import { ProgressTrackSection } from "./ProgressTrackSection";
import { GAME_SYSTEMS } from "types/GameSystems.type";
import { TrackTypes } from "types/Track.type";
import { Box, Checkbox, FormControlLabel } from "@mui/material";
import { useState } from "react";

export function TracksPanel() {
  const isStarforged = useGameSystem().gameSystem === GAME_SYSTEMS.STARFORGED;

  const [showCompletedTracks, setShowCompletedTracks] = useState(false);

  return (
    <Box pl={2} width={"calc(100% - 16px)"} >
      <FormControlLabel
        control={
          <Checkbox
            checked={showCompletedTracks}
            onChange={(evt, value) => setShowCompletedTracks(value)}
          />
        }
        label={"Show Completed Tracks"}
      />
      <ProgressTrackSection
        type={TrackTypes.Fray}
        typeLabel={"Combat Track"}
        showCompletedTracks={showCompletedTracks}
      />
      <ProgressTrackSection
        type={TrackTypes.Vow}
        typeLabel={"Vow"}
        showPersonalIfInCampaign
        showCompletedTracks={showCompletedTracks}
      />
      <ProgressTrackSection
        type={TrackTypes.Journey}
        typeLabel={isStarforged ? "Expedition" : "Journey"}
        showCompletedTracks={showCompletedTracks}
      />
      {isStarforged && (
        <ProgressTrackSection
          type={TrackTypes.SceneChallenge}
          typeLabel={"Scene Challenge"}
          showCompletedTracks={showCompletedTracks}
        />
      )}
      <ClockSection />
    </Box>
  );
}
