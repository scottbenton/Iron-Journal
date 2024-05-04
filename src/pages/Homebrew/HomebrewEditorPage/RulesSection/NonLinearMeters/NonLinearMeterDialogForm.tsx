import {
  Button,
  Checkbox,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Stack,
  TextField,
} from "@mui/material";
import { DialogTitleWithCloseButton } from "components/shared/DialogTitleWithCloseButton";
import { useState } from "react";
import { HomebrewNonLinearMeterDocument } from "api-calls/homebrew/rules/nonLinearMeters/_homebrewNonLinearMeter.type";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { convertIdPart } from "functions/dataswornIdEncoder";
import { Preview } from "../../Preview";
import { NonLinearMeterPreview } from "./NonLinearMeterPreview";
import { MarkdownEditor } from "components/shared/RichTextEditor/MarkdownEditor";
import { NonLinearMeterDialogOptions } from "./NonLinearMeterDialogOptions";
import { NonLinearRollableToggle, isNumeric } from "./NonLinearRollableToggle";

export interface NonLinearMeterDialogFormProps {
  homebrewId: string;
  nonLinearMeters: Record<string, HomebrewNonLinearMeterDocument>;
  onSave: (meter: HomebrewNonLinearMeterDocument) => Promise<void>;
  onClose: () => void;
  editingNonLinearMeterKey?: string;
}

export interface Form {
  description?: string;
  shared: boolean;
  label: string;
  options: {
    value: number | string;
    readOnly: boolean;
  }[];
  rollable: boolean;
}

export function NonLinearMeterDialogForm(props: NonLinearMeterDialogFormProps) {
  const {
    homebrewId,
    onClose,
    onSave,
    nonLinearMeters,
    editingNonLinearMeterKey,
  } = props;

  const existingMeter = editingNonLinearMeterKey
    ? nonLinearMeters[editingNonLinearMeterKey] ?? undefined
    : undefined;
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState, control } = useForm<Form>({
    disabled: loading,
    values: existingMeter,
  });
  const { errors, touchedFields, disabled } = formState;

  const onSubmit: SubmitHandler<Form> = (values) => {
    setLoading(true);
    const id = editingNonLinearMeterKey ?? convertIdPart(values.label);

    const canBeNumeric =
      values.options.filter(
        (option) => !option.readOnly && !isNumeric(option.value)
      ).length === 0;

    const isActuallyRollable = canBeNumeric && values.rollable;

    let options = values.options;
    if (isActuallyRollable) {
      options = options.map((option) => ({
        value:
          typeof option.value === "string" && !option.readOnly
            ? parseInt(option.value)
            : option.value,
        readOnly: option.readOnly,
      }));
    }

    onSave({
      dataswornId: id,
      collectionId: homebrewId,
      description: values.description,
      shared: values.shared,
      label: values.label,
      options,
      rollable: isActuallyRollable,
    })
      .then(() => {
        setLoading(false);
        onClose();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <DialogTitleWithCloseButton onClose={onClose}>
        {editingNonLinearMeterKey
          ? "Edit Non Linear Meter"
          : "Add Non Linear Meter"}
      </DialogTitleWithCloseButton>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              disabled={disabled}
              label={"Meter Label"}
              fullWidth
              error={touchedFields.label && !!errors.label}
              helperText={
                touchedFields.label && errors.label
                  ? errors.label.message
                  : undefined
              }
              inputProps={{
                defaultValue: "",
                ...register("label", {
                  required: "This field is required.",
                  validate: (value) => {
                    if (!editingNonLinearMeterKey && value) {
                      try {
                        const id = convertIdPart(value);
                        if (nonLinearMeters[id]) {
                          return `You already have a non-linear meter with id ${id}. Please try a different label.`;
                        }
                      } catch (e) {
                        return "Failed to parse a valid ID for your meter. Please use at least three letters or numbers in your label.";
                      }
                    }
                  },
                }),
              }}
            />
            <Controller
              name="description"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <MarkdownEditor
                  label={"Description"}
                  content={field.value ?? ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              )}
            />
            <FormControl error={touchedFields.shared && !!errors.shared}>
              <FormControlLabel
                disabled={disabled}
                control={
                  <Controller
                    name="shared"
                    control={control}
                    defaultValue={false}
                    render={({ field }) => (
                      <Checkbox
                        {...field}
                        defaultChecked={field.value ?? false}
                      />
                    )}
                  />
                }
                label={"Shared across all players?"}
              />
              {touchedFields.shared && errors.shared && (
                <FormHelperText>{errors.shared.message}</FormHelperText>
              )}
            </FormControl>
            <NonLinearMeterDialogOptions
              control={control}
              formState={formState}
              register={register}
            />
            <NonLinearRollableToggle control={control} formState={formState} />
            <Preview>
              <NonLinearMeterPreview control={control} />
            </Preview>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            type={"reset"}
            onClick={onClose}
            color={"inherit"}
            disabled={disabled}
          >
            Cancel
          </Button>
          <Button type={"submit"} variant={"contained"} disabled={disabled}>
            Save Changes
          </Button>
        </DialogActions>
      </form>
    </>
  );
}
