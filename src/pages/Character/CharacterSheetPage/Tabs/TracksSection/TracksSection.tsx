import { Stack } from "@mui/material";
import { ProgressTrackSection } from "../ProgressTrackSection";
import { TrackTypes } from "types/Track.type";
import { GAME_SYSTEMS, GameSystemChooser } from "types/GameSystems.type";
import { IronswornTracks } from "./IronswornTracks";
import { LegacyTracks } from "./LegacyTracks";
import { useGameSystemValue } from "hooks/useGameSystemValue";
import { ClockSection } from "components/features/charactersAndCampaigns/Clocks/ClockSection";
import { useGameSystem } from "hooks/useGameSystem";
import { useNewCustomContentPage } from "hooks/featureFlags/useNewCustomContentPage";
import { SpecialTracks } from "./SpecialTracks";

const systemTracks: GameSystemChooser<() => JSX.Element> = {
  [GAME_SYSTEMS.IRONSWORN]: IronswornTracks,
  [GAME_SYSTEMS.STARFORGED]: LegacyTracks,
};

export function TracksSection() {
  const Tracks = useGameSystemValue(systemTracks);
  const isStarforged = useGameSystem().gameSystem === GAME_SYSTEMS.STARFORGED;

  const showNewSpecialTracks = useNewCustomContentPage();

  return (
    <Stack spacing={2} sx={{ pb: 2 }}>
      {showNewSpecialTracks ? <SpecialTracks /> : <Tracks />}
      <ProgressTrackSection type={TrackTypes.Fray} typeLabel={"Combat Track"} />
      <ProgressTrackSection
        type={TrackTypes.Vow}
        typeLabel={"Vow"}
        showPersonalIfInCampaign
      />
      <ProgressTrackSection
        type={TrackTypes.Journey}
        typeLabel={isStarforged ? "Expedition" : "Journey"}
      />
      {isStarforged && <ClockSection />}
    </Stack>
  );
}
