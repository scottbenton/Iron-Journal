import { Box, IconButton, Stack } from "@mui/material";
import SubtractIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { StatComponent } from "components/features/characters/StatComponent";
import { useEffect, useRef } from "react";
import { useDebouncedState } from "hooks/useDebouncedState";
import { useStore } from "stores/store";
import ResetIcon from "@mui/icons-material/Replay";

export interface MobileStatTrackProps {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (newValue: number) => Promise<void>;
  disableRoll: boolean;
  smallSize?: boolean;
  ignoreAdds?: boolean;
  resetValue?: number;
}

export function MobileStatTrack(props: MobileStatTrackProps) {
  const { label, value, min, max, onChange, disableRoll, smallSize, ignoreAdds, resetValue } = props;

  const hasUnsavedChangesRef = useRef(false);
  const announce = useStore((store) => store.appState.announce);
  const [localValue, setLocalValue] = useDebouncedState(
    (newValue) => {
      if (newValue !== value) {
        hasUnsavedChangesRef.current = false;
        onChange(newValue).catch(() => setLocalValue(value));
      }
    },
    value,
    500
  );

  const handleChange = (newValue: number | undefined) => {
    if (typeof newValue === "number" && newValue >= min && newValue <= max) {
      hasUnsavedChangesRef.current = true;
      setLocalValue(newValue);
    }
  };

  useEffect(() => {
    if (value !== localValue && !hasUnsavedChangesRef.current) {
      setLocalValue(value);
      announce(`${label} was updated to ${value}`);
    }
  }, [localValue, value, announce, setLocalValue, label]);

  return (
    <Stack
      alignItems="center"
      justifyContent="space-between"
      direction={smallSize ? "column" : "row"}
      sx={(theme) => ({
        boxShadow: smallSize ? `inset 0px 0px 0px 1px ${theme.palette.divider}` : undefined,
        border: !smallSize ? `1px solid ${theme.palette.divider}` : undefined,
        borderRadius: theme.shape.borderRadius + "px",
        gap: smallSize ? 0 : 0.5,
        py: smallSize ? 0 : 0.5,
        pb: 0.5,
        px: 0,
      })}
    >
      { smallSize && (
        <>
          <Box
            onClick={() => resetValue !== undefined ? handleChange(resetValue) : {}}
            position={"relative"}
            sx={resetValue !== undefined ? (theme) => ({
              outlineColor: theme.palette.primary.main,
              outlineWidth: 0,
              outlineStyle: "solid",
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              transition: theme.transitions.create(
                ["border-color", "outline-width"],
                { duration: theme.transitions.duration.shorter }
              ),
              "&:hover": {
                outlineWidth: 2,
                borderColor: theme.palette.primary.main,
                cursor: "pointer",
              },
            }) : undefined }
          >
            <StatComponent
              disableRoll={disableRoll}
              label={label}
              value={localValue}
              sx={{
                width: 60,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }}
              ignoreAdds={ignoreAdds}
            />
            {resetValue !== undefined && (
              <ResetIcon
                aria-label={"Reset Momentum Button"}
                sx={(theme) => ({
                  position: "absolute",
                  top: theme.spacing(3.25),
                  left: theme.spacing(0.25),
                  width: theme.spacing(1.5),
                  height: theme.spacing(1.5),
                  color: theme.palette.action.active,
                })}
              />
            )}
          </Box>
          <Box>
            <IconButton
              disabled={localValue <= min}
              onClick={() => handleChange(localValue - 1)}
              aria-label={`Subtract 1 ${label}`}
              size={"small"}
              sx={{ p:0 }}
            >
              <SubtractIcon />
            </IconButton>
            <IconButton
              disabled={localValue >= max}
              onClick={() => handleChange(localValue + 1)}
              aria-label={`Add 1 ${label}`}
              sx={{ p:0 }}
            >
              <AddIcon />
            </IconButton>
          </Box>
        </>
      )}
      { !smallSize && (
        <>
            <IconButton
              disabled={localValue <= min}
              onClick={() => handleChange(localValue - 1)}
              aria-label={`Subtract 1 ${label}`}
            >
              <SubtractIcon />
            </IconButton>
            <StatComponent
              disableRoll={disableRoll}
              label={label}
              value={localValue}
              ignoreAdds={ignoreAdds}
            />
            <IconButton
              disabled={localValue >= max}
              onClick={() => handleChange(localValue + 1)}
              aria-label={`Add 1 ${label}`}
            >
              <AddIcon />
            </IconButton>
        </>
      )}
    </Stack>
  );
}
