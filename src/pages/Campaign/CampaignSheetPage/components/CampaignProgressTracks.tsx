import { ProgressTrackList } from "components/features/ProgressTrack";
import { useGameSystem } from "hooks/useGameSystem";
import { GAME_SYSTEMS } from "types/GameSystems.type";
import { TrackTypes } from "types/Track.type";

export interface CampaignProgressTracksProps {
  addPadding?: boolean;
}

export function CampaignProgressTracks(props: CampaignProgressTracksProps) {
  const { addPadding } = props;

  const isStarforged = useGameSystem().gameSystem === GAME_SYSTEMS.STARFORGED;

  return (
    <>
      <ProgressTrackList
        trackType={TrackTypes.Fray}
        typeLabel={"Shared Combat Track"}
        isCampaign
        headingBreakContainer={!addPadding}
      />
      <ProgressTrackList
        trackType={TrackTypes.Vow}
        typeLabel={"Shared Vow"}
        isCampaign
        headingBreakContainer={!addPadding}
      />
      <ProgressTrackList
        trackType={TrackTypes.Journey}
        typeLabel={isStarforged ? "Shared Expedition" : "Shared Journey"}
        isCampaign
        headingBreakContainer={!addPadding}
      />
    </>
  );
}
