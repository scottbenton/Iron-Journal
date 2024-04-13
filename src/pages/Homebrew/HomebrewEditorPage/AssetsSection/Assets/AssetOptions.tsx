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

export interface AssetOptionsProps {
  control: Control<Form>;
  register: UseFormRegister<Form>;
  disabled: boolean;
}

export function AssetOptions(props: AssetOptionsProps) {
  const { control, register, disabled } = props;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  return (
    <>
      <SectionHeading
        floating
        label={"Options"}
        action={
          <Button
            variant={"outlined"}
            color={"inherit"}
            onClick={() => append({ type: "text", label: "" })}
          >
            Add Option
          </Button>
        }
      />
      {fields.length === 0 && <EmptyState message={"No Options added"} />}

      <div>
        {fields.map((field, index) => (
          <Accordion key={field.id} sx={{ w: "100%" }} variant="outlined">
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              Option {index + 1}
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2}>
                <TextField
                  disabled={disabled}
                  label={`Option Label`}
                  fullWidth
                  required
                  inputProps={{
                    defaultValue: "",
                    ...register(`options.${index}.label`),
                  }}
                  helperText={"Each option must have a unique label"}
                />
                <TextField
                  disabled={disabled}
                  label={`Option Type`}
                  select
                  fullWidth
                  required
                  inputProps={{
                    defaultValue: "",
                    ...register(`options.${index}.type`),
                  }}
                >
                  <MenuItem value={"text"}>Text</MenuItem>
                  <MenuItem value={"select"}>Select</MenuItem>
                </TextField>
                <OptionalFieldWrapper
                  control={control}
                  when={{
                    field: `options.${index}.type`,
                    is: "select",
                  }}
                >
                  <Controller
                    name={`options.${index}.options`}
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
                Remove Option
              </Button>
            </AccordionActions>
          </Accordion>
        ))}
      </div>
    </>
  );
}
