import { SectionHeading } from "components/shared/SectionHeading";
import { Track } from "components/features/Track";
import { CampaignDocument } from "api-calls/campaign/_campaign.type";
import { CampaignProgressTracks } from "./CampaignProgressTracks";
import { useStore } from "stores/store";
import { Stack } from "@mui/material";

export interface TracksSectionProps {
  campaign: CampaignDocument;
  addTopMargin: boolean;
}

export function TracksSection(props: TracksSectionProps) {
  const { campaign, addTopMargin } = props;

  const conditionMeters = useStore((store) => store.rules.conditionMeters);
  const sortedCampaignConditionMeterKeys = Object.keys(conditionMeters)
    .sort((c1, c2) =>
      conditionMeters[c1].label.localeCompare(conditionMeters[c2].label)
    )
    .filter((c) => conditionMeters[c].shared);

  const updateConditionMeter = useStore(
    (store) => store.campaigns.currentCampaign.updateCampaignConditionMeter
  );

  return (
    <>
      {sortedCampaignConditionMeterKeys.length > 0 && (
        <>
          <SectionHeading
            label={"Shared Tracks"}
            sx={{ mt: addTopMargin ? 4 : 0 }}
            breakContainer
          />
          <Stack spacing={4} sx={{ mt: 4 }}>
            {sortedCampaignConditionMeterKeys.map((conditionMeterKey) => (
              <Track
                key={conditionMeterKey}
                label={conditionMeters[conditionMeterKey].label}
                value={
                  campaign.conditionMeters?.[conditionMeterKey] ??
                  conditionMeters[conditionMeterKey]?.value ??
                  0
                }
                onChange={(newValue) =>
                  updateConditionMeter(conditionMeterKey, newValue)
                }
                min={conditionMeters[conditionMeterKey].min}
                max={conditionMeters[conditionMeterKey].max}
              />
            ))}
          </Stack>
        </>
      )}
      <CampaignProgressTracks />
    </>
  );
}
