import { Box, ButtonBase, SxProps, Theme, Typography } from "@mui/material";
import { useDebouncedState } from "hooks/useDebouncedState";
import { useEffect, useId, useRef } from "react";
import { useStore } from "stores/store";
import { StoredNonLinearMeter } from "types/homebrew/HomebrewRules.type";

export interface NonLinearMeterProps {
  meter: StoredNonLinearMeter;
  value?: number;
  onChange: (index: number) => void;
  sx?: SxProps<Theme>;
  disabled?: boolean;
  loading?: boolean;
}

export function NonLinearMeter(props: NonLinearMeterProps) {
  const { sx, meter, value, onChange, disabled } = props;

  const hasUnsavedChangesRef = useRef(false);
  const announce = useStore((store) => store.appState.announce);

  const [localIndex, setLocalIndex] = useDebouncedState(
    (newValue) => {
      if (newValue !== undefined && newValue !== value) {
        hasUnsavedChangesRef.current = false;
        onChange(newValue);
      }
    },
    value,
    500
  );

  const handleChange = (newValue: number) => {
    hasUnsavedChangesRef.current = true;
    setLocalIndex(newValue);
  };

  useEffect(() => {
    if (
      value !== undefined &&
      value !== localIndex &&
      !hasUnsavedChangesRef.current
    ) {
      setLocalIndex(value);
      announce(`${meter.label} was updated to ${meter.options[value]?.value}`);
    }
  }, [localIndex, setLocalIndex, value, meter, announce]);
  const labelId = useId();

  return (
    <Box
      sx={sx}
      display={"flex"}
      overflow={"auto"}
      role={"group"}
      component={"div"}
      aria-labelledby={labelId}
    >
      <Box
        flexShrink={0}
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
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        sx={(theme) => ({
          borderTopLeftRadius: theme.shape.borderRadius,
          borderBottomLeftRadius: theme.shape.borderRadius,
        })}
      >
        <Typography
          fontFamily={(theme) => theme.fontFamilyTitle}
          variant={"subtitle1"}
          id={labelId}
        >
          {meter.label}
        </Typography>
      </Box>
      {meter.options.map((option, index) =>
        !option.readOnly ? (
          <ButtonBase
            key={index}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !disabled) {
                handleChange(index);
              }
            }}
            role={undefined}
            tabIndex={-1}
            htmlFor={labelId + "-" + option.value + "-" + index}
            disabled={disabled}
            component={"label"}
            sx={(theme) => ({
              ...(index === localIndex
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
                index === meter.options.length - 1
                  ? theme.shape.borderRadius
                  : 0,
              borderBottomRightRadius:
                index === meter.options.length - 1
                  ? theme.shape.borderRadius
                  : 0,
              flexGrow: 1,
            })}
          >
            <Typography
              variant={"button"}
              color={(theme) => {
                if (index === localIndex) {
                  return theme.palette.text.primary;
                } else if (disabled) {
                  return theme.palette.text.disabled;
                } else {
                  return theme.palette.text.secondary;
                }
              }}
            >
              {typeof option.value === "number" && option.value > 0 && "+"}
              {option.value}
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
              value={index}
              type={"radio"}
              id={labelId + "-" + option.value + "-" + index}
              name={meter.label}
              checked={index === localIndex}
              onChange={() => handleChange(index)}
            />
          </ButtonBase>
        ) : (
          <Box
            key={index}
            sx={(theme) => ({
              borderStyle: "solid",
              borderColor: theme.palette.divider,
              borderWidth: 1,
              borderLeftWidth: 0,
              px: 0.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: theme.palette.grey[500],
              color: theme.palette.darkGrey.contrastText,
              borderTopRightRadius:
                index === meter.options.length - 1
                  ? theme.shape.borderRadius
                  : 0,
              borderBottomRightRadius:
                index === meter.options.length - 1
                  ? theme.shape.borderRadius
                  : 0,
            })}
          >
            <Typography
              fontFamily={(theme) => theme.fontFamilyTitle}
              variant={"subtitle1"}
            >
              {option.value}
            </Typography>
          </Box>
        )
      )}
    </Box>
  );
}
