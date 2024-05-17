import { Control, Controller, UseFormReturn, useWatch } from "react-hook-form";
import { Form } from "./NonLinearMeterDialogForm";
import { useMemo } from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";
import { isNumeric } from "functions/isNumeric";

export interface NonLinearMeterRollableToggleProps {
  control: Control<Form>;
  formState: UseFormReturn<Form>["formState"];
}

export function NonLinearRollableToggle(
  props: NonLinearMeterRollableToggleProps
) {
  const { control, formState } = props;
  const { disabled, touchedFields, errors } = formState;

  const options = useWatch({ control, name: "options", defaultValue: [] });

  const isNumericTrack = useMemo(() => {
    return (
      options.filter((option) => !option.readOnly && !isNumeric(option.value))
        .length === 0
    );
  }, [options]);

  return (
    <FormControl error={touchedFields.rollable && !!errors.rollable}>
      <FormControlLabel
        disabled={disabled || !isNumericTrack}
        control={
          <Controller
            name="rollable"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <Checkbox {...field} defaultChecked={field.value ?? false} />
            )}
          />
        }
        label={"Add a roller for this meter?"}
      />
      {touchedFields.rollable && errors.rollable && (
        <FormHelperText>{errors.rollable.message}</FormHelperText>
      )}
    </FormControl>
  );
}
