import { Grid } from "@mui/material";
import { NonLinearMeter } from "components/features/charactersAndCampaigns/NonLinearMeter";
import { useStore } from "stores/store";

const getMdSize = (optionLength: number): number => {
  if (optionLength <= 6) {
    return 4;
  } else if (optionLength <= 9) {
    return 6;
  } else {
    return 12;
  }
};

export function NonLinearMeters() {
  const nonLinearMeters = useStore((store) => store.rules.nonLinearMeters);

  const characterValues = useStore(
    (store) =>
      store.characters.currentCharacter.currentCharacter?.customTracks ?? {}
  );
  const campaignValues = useStore(
    (store) =>
      store.campaigns.currentCampaign.currentCampaign?.customTracks ?? {}
  );

  const campaignId = useStore(
    (store) => store.campaigns.currentCampaign.currentCampaignId
  );

  const updateCharacter = useStore(
    (store) => store.characters.currentCharacter.updateCurrentCharacter
  );
  const updateCampaign = useStore(
    (store) => store.campaigns.currentCampaign.updateCampaign
  );

  const updateTrackValue = (id: string, index: number) => {
    const meter = nonLinearMeters[id];
    if (campaignId && meter.shared) {
      updateCampaign({
        [`customTracks.${meter.dataswornId}`]: index,
      });
    }
    updateCharacter({
      [`customTracks.${meter.dataswornId}`]: index,
      [`customTracks.${meter.label}`]: index,
    }).catch(() => {});
  };

  return (
    <>
      {Object.keys(nonLinearMeters)
        .sort((m1, m2) =>
          nonLinearMeters[m1].label.localeCompare(nonLinearMeters[m2].label)
        )
        .map((meterKey) => (
          <Grid
            item
            xs={12}
            md={getMdSize(nonLinearMeters[meterKey].options.length)}
            key={nonLinearMeters[meterKey].label}
          >
            <NonLinearMeter
              value={
                (nonLinearMeters[meterKey].shared && campaignId
                  ? campaignValues[nonLinearMeters[meterKey].dataswornId]
                  : characterValues[nonLinearMeters[meterKey].dataswornId] ??
                    characterValues[nonLinearMeters[meterKey].label]) ?? -1
              }
              onChange={(index) => updateTrackValue(meterKey, index)}
              meter={nonLinearMeters[meterKey]}
            />
          </Grid>
        ))}
    </>
  );
}
