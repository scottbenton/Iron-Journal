import { Box, Divider } from "@mui/material";
import { StatComponent } from "components/features/characters/StatComponent";
import { useStore } from "stores/store";

export function StatsSection() {
  const ruleStats = useStore((store) => store.rules.stats);

  // We know character is defined at this point, hence the typecasting
  const stats = useStore(
    (store) => store.characters.currentCharacter.currentCharacter?.stats ?? {}
  );

  const isInCampaign = useStore(
    (store) => !!store.characters.currentCharacter.currentCharacter?.campaignId
  );
  const conditionMeters = useStore((store) => store.rules.conditionMeters);
  const characterConditionMeters = useStore(
    (store) =>
      store.characters.currentCharacter.currentCharacter?.conditionMeters
  );
  const campaignConditionMeters = useStore(
    (store) => store.campaigns.currentCampaign.currentCampaign?.conditionMeters
  );
  const getConditionMeterValue = (conditionMeterKey: string): number => {
    const conditionMeter = conditionMeters[conditionMeterKey];

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

    return conditionMeter.value;
  };
  const nonLinearMeters = useStore((store) => store.rules.nonLinearMeters);
  const characterNonLinearMeters = useStore(
    (store) => store.characters.currentCharacter.currentCharacter?.customTracks
  );
  const campaignNonLinearMeters = useStore(
    (store) => store.campaigns.currentCampaign.currentCampaign?.customTracks
  );
  const getNonLinearMeterValue = (meterKey: string): number => {
    const meter = nonLinearMeters[meterKey];
    let index = 0;

    if (meter.shared && isInCampaign && campaignNonLinearMeters) {
      index = campaignNonLinearMeters[meterKey] ?? 0;
    } else if ((!meter.shared || !isInCampaign) && characterNonLinearMeters) {
      index = characterNonLinearMeters[meterKey] ?? 0;
    }

    const option =
      index < meter.options.length &&
      index >= 0 &&
      !meter.options[index].readOnly
        ? meter.options[index]
        : undefined;

    if (option) {
      const optionValueInt =
        typeof option.value === "string"
          ? parseInt(option.value)
          : option.value;
      if (!isNaN(optionValueInt)) {
        return optionValueInt;
      }
    }

    return 0;
  };

  const adds = useStore(
    (store) => store.characters.currentCharacter.currentCharacter?.adds ?? 0
  );
  const updateAdds = useStore(
    (store) => store.characters.currentCharacter.updateCurrentCharacter
  );

  return (
    <Box display={"flex"} flexWrap={"wrap"} justifyContent={"flex-start"}>
      <Box display={"flex"} flexDirection={"row"} flexWrap={"wrap"}>
        {Object.keys(ruleStats).map((statKey, index, arr) => (
          <StatComponent
            key={statKey}
            label={ruleStats[statKey].label}
            value={stats[statKey] ?? 0}
            sx={{ my: 0.5, mr: index === arr.length - 1 ? 0 : 0.5 }}
          />
        ))}
      </Box>
      <Divider
        orientation="vertical"
        flexItem
        sx={(theme) => ({
          mx: 1,
          borderColor:
            theme.palette.grey[theme.palette.mode === "light" ? 700 : 600],
        })}
      />
      <Box display={"flex"} flexDirection={"row"} flexWrap={"wrap"}>
        {Object.keys(conditionMeters)
          .filter(
            (conditionMeterKey) => conditionMeters[conditionMeterKey].rollable
          )
          .map((conditionMeterKey) => (
            <StatComponent
              key={conditionMeterKey}
              label={conditionMeters[conditionMeterKey].label}
              value={getConditionMeterValue(conditionMeterKey)}
              sx={{ my: 0.5, mr: 0.5 }}
            />
          ))}
        {Object.keys(nonLinearMeters)
          .filter((meterKey) => nonLinearMeters[meterKey].rollable)
          .map((meterKey) => (
            <StatComponent
              key={meterKey}
              label={nonLinearMeters[meterKey].label}
              value={getNonLinearMeterValue(meterKey)}
              sx={{ my: 0.5, mr: 0.5 }}
            />
          ))}

        <Divider
          orientation="vertical"
          flexItem
          sx={(theme) => ({
            mx: 1,
            borderColor:
              theme.palette.grey[theme.palette.mode === "light" ? 700 : 600],
          })}
        />

        <StatComponent
          label={"Adds"}
          updateTrack={(newValue) => updateAdds({ adds: newValue })}
          value={adds}
          sx={{ my: 0.5 }}
        />
      </Box>
    </Box>
  );
}
