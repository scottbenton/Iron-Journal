import { Box } from "@mui/material";
import { ProgressTrackList } from "components/features/ProgressTrack";
import { TrackSectionProgressTracks, TrackTypes } from "types/Track.type";
import { useStore } from "stores/store";

export interface ProgressTrackSectionProps {
  type: TrackSectionProgressTracks | TrackTypes.SceneChallenge;
  typeLabel: string;
  showPersonalIfInCampaign?: boolean;
}

export function ProgressTrackSection(props: ProgressTrackSectionProps) {
  const { type, typeLabel, showPersonalIfInCampaign } = props;

  const isInCampaign = useStore(
    (store) => !!store.campaigns.currentCampaign.currentCampaignId
  );

  return (
    <Box>
      {isInCampaign && (
        <ProgressTrackList
          trackType={type}
          typeLabel={`Campaign ${typeLabel}`}
          isCampaign
        />
      )}
      {(!isInCampaign || showPersonalIfInCampaign) && (
        <ProgressTrackList
          trackType={type}
          typeLabel={`Character ${typeLabel}`}
        />
      )}
    </Box>
  );
}
