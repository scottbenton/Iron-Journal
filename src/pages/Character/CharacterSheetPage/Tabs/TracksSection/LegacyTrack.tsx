import {
  Box,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

import { ProgressTrack } from "components/features/ProgressTrack";
import { TrackTypes } from "types/Track.type";
import { useGameSystem } from "hooks/useGameSystem";
import { GAME_SYSTEMS } from "types/GameSystems.type";

export interface LegacyTrackProps {
  label: string;
  value: number;
  onValueChange?: (value: number) => void;
  isLegacy: boolean;
  onIsLegacyChecked?: (checked: boolean) => void;
}

export function LegacyTrack(props: LegacyTrackProps) {
  const {
    label,
    value,
    onValueChange,
    isLegacy,
    onIsLegacyChecked,
  } = props;

  const isIronsworn = useGameSystem().gameSystem === GAME_SYSTEMS.IRONSWORN;

  return (
    <Box
      display={"flex"}
    >
      <ProgressTrack
        label={label}
        value={value}
        max={40}
        onValueChange={onValueChange}
        trackType={TrackTypes.Legacy}
        useMaxRoll={isLegacy}
        hideRollButton={onIsLegacyChecked === undefined}
        useSmallRollButton={true}
      />
      {!isIronsworn && (
        <Box
          px={2}
          mt={5}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={isLegacy ?? false}
                onChange={(evt, value) => onIsLegacyChecked ? onIsLegacyChecked(value) : undefined}
                disabled={onIsLegacyChecked === undefined}
              />
            }
            label={"10"}
            sx={{ mr: 0 }}
          />
        </Box>
      )}
    </Box>
  );
}
