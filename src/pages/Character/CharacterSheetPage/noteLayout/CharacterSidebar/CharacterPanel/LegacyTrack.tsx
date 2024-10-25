import { Datasworn } from "@datasworn/core";
import {
  Box,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useGameSystem } from "hooks/useGameSystem";
import { GAME_SYSTEMS } from "types/GameSystems.type";
import { LegacyTrack as LegacyTrackValue } from "types/LegacyTrack.type";
import { ProgressTrack } from "../TracksPanel/ProgressTrack";
import { TrackTypes } from "types/Track.type";

export interface LegacyTrackProps {
  rule: Datasworn.SpecialTrackRule;
  value?: LegacyTrackValue;
  toggleIsLegacy?: (isLegacy: boolean) => void;
  onValueChange?: (value: number) => void;
}
export function LegacyTrack(props: LegacyTrackProps) {
  const { rule, value, toggleIsLegacy, onValueChange } = props;

  const isIronsworn = useGameSystem().gameSystem === GAME_SYSTEMS.IRONSWORN;

  return (
    <Box>
      <ProgressTrack
        label={rule.label}
        value={value?.value ?? 0}
        max={40}
        onValueChange={onValueChange}
        trackType={TrackTypes.Legacy}
        useMaxRoll={value?.isLegacy ?? false}
        hideRollButton={toggleIsLegacy === undefined}
        useSmallRollButton={true}
      />
      {!isIronsworn && (
        <Box
          ml={1}
          mt={-5}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={value?.isLegacy ?? false}
                onChange={(evt, value) => toggleIsLegacy ? toggleIsLegacy(value) : undefined}
                disabled={toggleIsLegacy === undefined}
              />
            }
            label={"10"}
          />
        </Box>
      )}
    </Box>
  );
}
