import { Box, Typography, SxProps, Theme, ButtonBase } from "@mui/material";
import { useDebouncedState } from "hooks/useDebouncedState";
import { useEffect, useId, useRef, useState } from "react";
import { useStore } from "stores/store";
import { useRoller } from "stores/appState/useRoller";

export interface TrackProps {
  label?: string;
  min: number;
  max: number;
  value: number;
  onChange?: (newValue: number) => Promise<boolean | void>;
  sx?: SxProps<Theme>;
  disabled?: boolean;
  rollable?: boolean;
}

function getArr(min: number, max: number): number[] {
  const arr: number[] = [];

  for (let i = min; i <= max; i++) {
    arr.push(i);
  }

  return arr;
}

export function Track(props: TrackProps) {
  const { label, min, max, value, onChange, sx, disabled, rollable } = props;

  const [numbers, setNumbers] = useState<number[]>([]);
  const hasUnsavedChangesRef = useRef(false);
  const announce = useStore((store) => store.appState.announce);

  const [localValue, setLocalValue] = useDebouncedState(
    (newValue) => {
      if (newValue !== value && onChange) {
        hasUnsavedChangesRef.current = false;
        onChange(newValue).catch(() => setLocalValue(value));
      }
    },
    value,
    500
  );

  const handleChange = (newValue: number | undefined) => {
    if (
      onChange &&
      typeof newValue === "number" &&
      newValue >= min &&
      newValue <= max
    ) {
      hasUnsavedChangesRef.current = true;
      setLocalValue(newValue);
    }
  };

  useEffect(() => {
    setNumbers(getArr(min, max));
  }, [min, max]);

  useEffect(() => {
    if (value !== localValue && !hasUnsavedChangesRef.current) {
      setLocalValue(value);
      announce(`${label} was updated to ${value}`);
    }
  }, [localValue, value, announce, setLocalValue, label]);

  const labelId = useId();

  const { rollStat } = useRoller();
  const adds = useStore(
    (store) => store.characters.currentCharacter.currentCharacter?.adds ?? 0
  );
  const resetAdds = useStore(
    (store) => store.characters.currentCharacter.updateCurrentCharacter
  );

  return (
    <Box
      role={"group"}
      sx={sx}
      display={"flex"}
      overflow={"auto"}
      component={"div"}
      aria-labelledby={labelId}
    >
      {label && (
        <Box
          bgcolor={(theme) =>
            theme.palette.mode === "light"
              ? theme.palette.darkGrey.light
              : theme.palette.grey[400]
          }
          color={(theme) =>
            theme.palette.mode === "light"
              ? theme.palette.darkGrey.contrastText
              : theme.palette.grey[800]
          }
          px={0.5}
          display={"inline"}
          sx={(theme) => ({
            borderTopLeftRadius: `${theme.shape.borderRadius}px`,
            borderBottomLeftRadius: `${theme.shape.borderRadius}px`,
            transition: theme.transitions.create(
              ["background-color"],
              { duration: theme.transitions.duration.shorter }
            ),
            "&:hover":
              disabled || !rollable
                ? {}
                : {
                    backgroundColor: theme.palette.primary.main,
                  },
          })}
          onClick={() => {
            if (!disabled && rollable) {
              rollStat(label, value, undefined, adds);
              resetAdds({ adds: 0 }).catch(() => {});
            }
          }}
          component={(disabled || !rollable) ? "div" : ButtonBase}
        >
          <Typography
            fontFamily={(theme) => theme.fontFamilyTitle}
            variant={"subtitle1"}
            id={labelId}
            component={"span"}
          >
            {label}
          </Typography>
        </Box>
      )}
      {numbers.map((num, index) => (
        <ButtonBase
          onKeyDown={(e) => {
            if (e.key === "Enter" && !disabled) {
              handleChange(num);
            }
          }}
          key={index}
          role={undefined}
          tabIndex={-1}
          htmlFor={labelId + "-" + label + "-" + num}
          disabled={disabled}
          component={"label"}
          sx={(theme) => ({
            ...(num === localValue
              ? {
                  backgroundColor: theme.palette.background.paperInlayDarker,
                }
              : { backgroundColor: theme.palette.background.paper }),

            borderLeft:
              index !== 0 ? `1px solid ${theme.palette.divider}` : undefined,
            borderColor: theme.palette.divider,
            borderStyle: "solid",
            borderWidth: 1,
            borderLeftWidth: index === 0 ? 1 : 0,
            borderTopRightRadius:
              index === numbers.length - 1 ? theme.shape.borderRadius : 0,
            borderBottomRightRadius:
              index === numbers.length - 1 ? theme.shape.borderRadius : 0,
            flexGrow: 1,
          })}
        >
          <Typography
            variant={"button"}
            color={(theme) => {
              if (num === localValue) {
                return theme.palette.text.primary;
              } else if (disabled) {
                return theme.palette.text.disabled;
              } else {
                return theme.palette.text.secondary;
              }
            }}
          >
            {num > 0 && "+"}
            {num}
          </Typography>

          <input
            style={{
              position: "absolute",
              width: "1px",
              height: "1px",
              margin: "-1px",
              padding: 0,
              overflow: "hidden",
              clip: "rect(0,0,0,0)",
              border: 0,
            }}
            disabled={disabled}
            value={num}
            type={"radio"}
            id={labelId + "-" + label + "-" + num}
            name={label}
            checked={num === localValue}
            onChange={() => handleChange(num)}
          />
        </ButtonBase>
      ))}
    </Box>
  );
}
