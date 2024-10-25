import {
  Box,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

import { ProgressTrack } from "components/features/ProgressTrack";
import { TrackTypes } from "types/Track.type";

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
      />
      <Box
        px={2}
        mt={4.5}
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
        />
      </Box>
    </Box>
  );
}
