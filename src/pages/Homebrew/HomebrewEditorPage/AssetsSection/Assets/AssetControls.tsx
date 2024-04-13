import {
  Control,
  Controller,
  UseFormRegister,
  useFieldArray,
} from "react-hook-form";
import { Form } from "./AssetDialogForm";
import { SectionHeading } from "components/shared/SectionHeading";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { EmptyState } from "components/shared/EmptyState";
import { OptionalFieldWrapper } from "./OptionalFieldWrapper";
import { NumberField } from "components/shared/NumberField";

export interface AssetControlsProps {
  control: Control<Form>;
  register: UseFormRegister<Form>;
  disabled: boolean;
}

export function AssetControls(props: AssetControlsProps) {
  const { control, register, disabled } = props;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "controls",
  });

  return (
    <>
      <SectionHeading
        floating
        label={"Controls"}
        action={
          <Button
            variant={"outlined"}
            color={"inherit"}
            onClick={() =>
              append({ type: "conditionMeter", label: "", min: 0, max: 5 })
            }
          >
            Add Control
          </Button>
        }
      />
      {fields.length === 0 && <EmptyState message={"No Controls added"} />}

      <div>
        {fields.map((field, index) => (
          <Accordion key={field.id} sx={{ w: "100%" }} variant="outlined">
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              Control {index + 1}
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2}>
                <TextField
                  disabled={disabled}
                  label={`Control Label`}
                  fullWidth
                  required
                  inputProps={{
                    defaultValue: "",
                    ...register(`controls.${index}.label`),
                  }}
                  helperText={"Each control must have a unique label"}
                />
                <TextField
                  disabled={disabled}
                  label={`Control Type`}
                  select
                  fullWidth
                  required
                  inputProps={{
                    defaultValue: field.type,
                    ...register(`controls.${index}.type`),
                  }}
                >
                  <MenuItem value={"conditionMeter"}>Condition Meter</MenuItem>
                  <MenuItem value={"select"}>Select</MenuItem>
                  <MenuItem value={"checkbox"}>Checkbox</MenuItem>
                </TextField>
                <OptionalFieldWrapper
                  control={control}
                  when={{
                    field: `controls.${index}.type`,
                    is: "select",
                  }}
                >
                  <Controller
                    name={`controls.${index}.options`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        label={"Select Options"}
                        required
                        value={field.value?.join(",") ?? ""}
                        onChange={(evt) =>
                          field.onChange(evt.currentTarget.value.split(","))
                        }
                        helperText={
                          "Enter options as a comma separated list, ex: Health,Spirit,Supply"
                        }
                        fullWidth
                        disabled={disabled}
                      />
                    )}
                  />
                </OptionalFieldWrapper>
                <OptionalFieldWrapper
                  control={control}
                  when={{
                    field: `controls.${index}.type`,
                    is: "conditionMeter",
                  }}
                >
                  <Controller
                    name={`controls.${index}.min`}
                    control={control}
                    render={({ field }) => (
                      <NumberField
                        fullWidth
                        disabled={disabled}
                        label={"Min"}
                        required
                        value={field.value}
                        onChange={(min) => field.onChange(min)}
                      />
                    )}
                  />
                  <Controller
                    name={`controls.${index}.max`}
                    control={control}
                    render={({ field }) => (
                      <NumberField
                        fullWidth
                        disabled={disabled}
                        label={"Max"}
                        required
                        value={field.value}
                        onChange={(min) => field.onChange(min)}
                      />
                    )}
                  />
                </OptionalFieldWrapper>
              </Stack>
            </AccordionDetails>
            <AccordionActions>
              <Button
                variant={"outlined"}
                color={"inherit"}
                onClick={() => remove(index)}
              >
                Remove Control
              </Button>
            </AccordionActions>
          </Accordion>
        ))}
      </div>
    </>
  );
}
