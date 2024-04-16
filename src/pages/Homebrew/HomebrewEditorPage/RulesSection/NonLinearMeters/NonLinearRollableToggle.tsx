import { Control, Controller, UseFormReturn, useWatch } from "react-hook-form";
import { Form } from "./NonLinearMeterDialogForm";
import { useMemo } from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";

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

export function isNumeric(str: unknown) {
  if (typeof str === "number") return true;
  if (typeof str != "string") return false; // we only process strings!
  return (
    !isNaN(str as unknown as number) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
}
