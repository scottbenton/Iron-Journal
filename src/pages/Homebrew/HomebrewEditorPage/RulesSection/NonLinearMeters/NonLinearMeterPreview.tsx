import { Typography } from "@mui/material";
import { Control, useWatch } from "react-hook-form";
import { Form } from "./NonLinearMeterDialogForm";
import { NonLinearMeter } from "components/features/charactersAndCampaigns/NonLinearMeter";
import { StatComponent } from "components/features/characters/StatComponent";
import { useState } from "react";

export interface NonLinearMeterPreviewProps {
  control: Control<Form, unknown>;
}

export function NonLinearMeterPreview(props: NonLinearMeterPreviewProps) {
  const { control } = props;

  const label = useWatch({ control, name: "label" });
  const options = useWatch({ control, name: "options", defaultValue: [] });
  const rollable = useWatch({ control, name: "rollable" });

  const [valueIndex, setValueIndex] = useState(0);
  const selectedOptionValue = options[valueIndex]?.value;

  if (!label || !options || options.length === 0) {
    return <Typography>Waiting for input...</Typography>;
  }

  return (
    <>
      <NonLinearMeter
        meter={{
          label,
          options,
          dataswornId: "",
          collectionId: "",
          shared: false,
          rollable: false,
        }}
        value={valueIndex}
        onChange={setValueIndex}
      />
      {rollable && (
        <StatComponent
          label={label}
          value={
            typeof selectedOptionValue === "string"
              ? parseInt(selectedOptionValue)
              : selectedOptionValue ?? 0
          }
          disableRoll
        />
      )}
    </>
  );
}
