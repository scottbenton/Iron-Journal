import { Box, Typography } from "@mui/material";
import { LegacyTrack } from "./LegacyTrack";
import { useStore } from "stores/store";
import { LegacyTrack as ILegacyTrack } from "types/LegacyTrack.type";

export function LegacyTracks() {
  const specialTracksRules = useStore((store) => store.rules.specialTracks);

  const isInCampaign = useStore(
    (store) => store.characters.currentCharacter.currentCharacter?.campaignId
  );
  const specialTracksCharacterValues = useStore(
    (store) => store.characters.currentCharacter.currentCharacter?.specialTracks
  );
  const specialTracksCampaignValues = useStore(
    (store) => store.campaigns.currentCampaign.currentCampaign?.specialTracks
  );

  const getSpecialTrackValue = (
    specialTrackKey: string
  ): ILegacyTrack | undefined => {
    const specialTrack = specialTracksRules[specialTrackKey];
    if (isInCampaign && specialTracksCampaignValues && specialTrack.shared) {
      return specialTracksCampaignValues[specialTrackKey];
    } else if (
      (!isInCampaign || !specialTrack.shared) &&
      specialTracksCharacterValues
    ) {
      return specialTracksCharacterValues[specialTrackKey];
    }
    return undefined;
  };

  const updateCharacter = useStore(
    (store) => store.characters.currentCharacter.updateCurrentCharacter
  );
  const updateCampaign = useStore(
    (store) => store.campaigns.currentCampaign.updateCampaign
  );

  const updateSpecialTrackValue = (
    specialTrackKey: string,
    newValue: number
  ) => {
    const specialTrack = specialTracksRules[specialTrackKey];

    if (specialTrack.shared && isInCampaign) {
      return updateCampaign({
        [`specialTracks.${specialTrackKey}.value`]: newValue,
      });
    } else {
      return updateCharacter({
        [`specialTracks.${specialTrackKey}.value`]: newValue,
      });
    }
  };

  const updateSpecialTrackIsLegacy = (
    specialTrackKey: string,
    checked: boolean
  ) => {
    const specialTrack = specialTracksRules[specialTrackKey];

    if (specialTrack.shared && isInCampaign) {
      return updateCampaign({
        [`specialTracks.${specialTrackKey}.isLegacy`]: checked,
      });
    } else {
      return updateCharacter({
        [`specialTracks.${specialTrackKey}.isLegacy`]: checked,
      });
    }
  };

  return (
    <Box mt={2}>
      <Typography
        fontFamily={(theme) => theme.fontFamilyTitle}
        variant={"h6"}
        color={"text.secondary"}
      >
        Legacy Tracks
      </Typography>
      <Box display={"flex"} flexDirection={"column"} gap={1}>
        {Object.keys(specialTracksRules).map((specialTrackKey) => (
          <LegacyTrack
            key={specialTrackKey}
            rule={specialTracksRules[specialTrackKey]}
            value={getSpecialTrackValue(specialTrackKey)}
            toggleIsLegacy={(isLegacy) =>
              updateSpecialTrackIsLegacy(specialTrackKey, isLegacy)
            }
            onValueChange={(value) =>
              updateSpecialTrackValue(specialTrackKey, value)
            }
          />
        ))}
      </Box>
    </Box>
  );
}
