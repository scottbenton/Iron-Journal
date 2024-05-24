import { Datasworn } from "@datasworn/core";
import { Box, Typography } from "@mui/material";
import { useDebouncedState } from "hooks/useDebouncedState";
import { useStore } from "stores/store";
import { ClockCircle } from "components/features/charactersAndCampaigns/Clocks/ClockCircle";

export interface AssetControlClockProps {
  value?: number;
  field: Datasworn.ClockField;
  onChange?: (value: number) => void;
}

export function AssetControlClock(props: AssetControlClockProps) {
  const { value, field, onChange } = props;

  const [localValue, setLocalValue] = useDebouncedState<number>(
    (value) => onChange && onChange(value),
    value ?? field.value,
    500
  );

  const announce = useStore((store) => store.appState.announce);

  const handleIncrement = () => {
    setLocalValue((prev) => {
      const newValue = prev + 1;
      if (typeof field.max === "number" && field.max < newValue) {
        announce(
          `Cannot increase ${field.label} beyond ${field.max}. Resetting field to 0`
        );
        return 0;
      }
      announce(`Increased ${field.label} by 1 for a total of ${newValue}`);
      return newValue;
    });
  };

  return (
    <Box>
      <Typography
        variant={"subtitle1"}
        fontFamily={(theme) => theme.fontFamilyTitle}
        color={"textSecondary"}
      >
        {field.label}
      </Typography>

      <ClockCircle
        value={localValue}
        segments={field.max}
        onClick={handleIncrement}
      />
    </Box>
  );
}
