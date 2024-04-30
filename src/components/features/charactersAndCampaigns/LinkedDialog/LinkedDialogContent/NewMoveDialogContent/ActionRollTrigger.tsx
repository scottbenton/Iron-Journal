import { Datasworn } from "@datasworn/core";
import { SxProps, Theme } from "@mui/material";
import { HorizontalStatRoller } from "components/features/characters/HorizontalStatRoller";
import { useStore } from "stores/store";

export interface ActionRollTriggerProps {
  conditionRollOption: Datasworn.RollableValue;
  moveName: string;
  sx?: SxProps<Theme>;
}

export function ActionRollTrigger(props: ActionRollTriggerProps) {
  const { conditionRollOption, moveName, sx } = props;
  const isInCampaign = useStore(
    (store) => !!store.characters.currentCharacter.currentCharacter?.campaignId
  );

  const characterStats = useStore(
    (store) => store.characters.currentCharacter.currentCharacter?.stats
  );

  const conditionMeterRules = useStore((store) => store.rules.conditionMeters);
  const characterConditionMeters = useStore(
    (store) =>
      store.characters.currentCharacter.currentCharacter?.conditionMeters
  );
  const campaignConditionMeters = useStore(
    (store) => store.campaigns.currentCampaign.currentCampaign?.conditionMeters
  );

  const getConditionMeterValue = (
    conditionMeterKey: string
  ): number | undefined => {
    const conditionMeter = conditionMeterRules[conditionMeterKey];

    if (conditionMeter.shared && isInCampaign && campaignConditionMeters) {
      return campaignConditionMeters[conditionMeterKey] ?? conditionMeter.value;
    } else if (
      (!conditionMeter.shared || !isInCampaign) &&
      characterConditionMeters
    ) {
      return (
        characterConditionMeters[conditionMeterKey] ?? conditionMeter.value
      );
    }

    return undefined;
  };

  if (conditionRollOption.using === "stat") {
    return (
      <HorizontalStatRoller
        label={conditionRollOption.stat}
        moveName={moveName}
        value={
          characterStats
            ? characterStats[conditionRollOption.stat] ?? 0
            : undefined
        }
        sx={sx}
      />
    );
  } else if (conditionRollOption.using === "condition_meter") {
    return (
      <HorizontalStatRoller
        label={conditionRollOption.condition_meter}
        moveName={moveName}
        value={getConditionMeterValue(conditionRollOption.condition_meter)}
        sx={sx}
      />
    );
  }

  return <></>;
}
