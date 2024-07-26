import { Datasworn } from "@datasworn/core";
import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  Typography,
} from "@mui/material";
import { ProgressTrackTick } from "components/features/ProgressTrack/ProgressTrackTick";
import { useGameSystem } from "hooks/useGameSystem";
import { useId } from "react";
import { useStore } from "stores/store";
import { GAME_SYSTEMS } from "types/GameSystems.type";
import { LegacyTrack as LegacyTrackValue } from "types/LegacyTrack.type";

import MinusIcon from "@mui/icons-material/Remove";
import PlusIcon from "@mui/icons-material/Add";

export interface LegacyTrackProps {
  rule: Datasworn.SpecialTrackRule;
  value?: LegacyTrackValue;
  toggleIsLegacy?: (isLegacy: boolean) => void;
  onValueChange?: (value: number) => void;
}
export function LegacyTrack(props: LegacyTrackProps) {
  const { rule, value, toggleIsLegacy, onValueChange } = props;

  const isIronsworn = useGameSystem().gameSystem === GAME_SYSTEMS.IRONSWORN;

  const labelId = useId();
  const getValueText = (value: number) => {
    return `${value} ticks: (${Math.floor(value / 4)} boxes fully filled)`;
  };

  const announce = useStore((store) => store.appState.announce);

  const checks = [];
  let checksIndex = 0;
  let checksValue = 0;

  for (let i = 0; i <= 40; i++) {
    if (i % 4 === 0 && i !== 0) {
      checks[checksIndex] = checksValue;
      checksIndex++;
      checksValue = 0;
    }

    if (i < (value?.value ?? 0)) {
      checksValue++;
    }
  }

  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={"flex-start"}>
      <Typography
        id={labelId}
        variant="h6"
        fontFamily={(theme) => theme.fontFamilyTitle}
      >
        {rule.label}
      </Typography>

      <Box
        display={"flex"}
        borderRadius={1}
        bgcolor={(theme) => theme.palette.background.paper}
        color={(theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[600]
            : theme.palette.grey[300]
        }
        border={1}
        borderColor={(theme) => theme.palette.divider}
        role={"meter"}
        aria-labelledby={labelId}
        aria-valuemin={0}
        aria-valuemax={40}
        aria-valuenow={value?.value ?? 0}
        aria-valuetext={getValueText(value?.value ?? 0)}
      >
        {checks.map((value, index) => (
          <Box
            key={index}
            sx={(theme) => ({
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: "transparent",
              borderLeftColor: index !== 0 ? theme.palette.divider : undefined,
              width: 28,
              height: 28,
            })}
          >
            <ProgressTrackTick
              value={value}
              key={index}
              aria-hidden
              size={{ desktop: 24, mobile: 24 }}
            />
          </Box>
        ))}
      </Box>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        width={280}
      >
        <div>
          {!isIronsworn && (
            <FormControlLabel
              disabled={!toggleIsLegacy}
              control={
                <Checkbox
                  checked={value?.isLegacy}
                  onChange={(evt, value) =>
                    toggleIsLegacy && toggleIsLegacy(value)
                  }
                />
              }
              label={"10"}
            />
          )}
        </div>
        {onValueChange && (
          <div>
            <IconButton
              onClick={() => {
                if (onValueChange) {
                  const oldValue = value?.value ?? 0;
                  const newValue = Math.max(oldValue - 1, 0);
                  onValueChange(newValue);
                  if (newValue === oldValue) {
                    announce(`${rule.label} is already at zero ticks`);
                  } else {
                    announce(
                      `Updated ${rule.label} to ${getValueText(newValue)}`
                    );
                  }
                }
              }}
            >
              <MinusIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                if (onValueChange) {
                  const oldValue = value?.value ?? 0;
                  const newValue = Math.min(oldValue + 1, 40);
                  onValueChange(newValue);
                  if (newValue === oldValue) {
                    announce(
                      `${rule.label} is already at its maximum value of 40 ticks`
                    );
                  } else {
                    announce(
                      `Updated ${rule.label} to ${getValueText(newValue)}`
                    );
                  }
                }
              }}
            >
              <PlusIcon />
            </IconButton>
          </div>
        )}
      </Box>
    </Box>
  );
}
