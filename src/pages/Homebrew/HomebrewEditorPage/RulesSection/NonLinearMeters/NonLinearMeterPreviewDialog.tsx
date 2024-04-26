import { Dialog, DialogContent, Stack } from "@mui/material";
import { StoredNonLinearMeter } from "types/homebrew/HomebrewRules.type";
import { DialogTitleWithCloseButton } from "components/shared/DialogTitleWithCloseButton";
import { MarkdownRenderer } from "components/shared/MarkdownRenderer";
import { StatComponent } from "components/features/characters/StatComponent";
import { NonLinearMeter } from "components/features/charactersAndCampaigns/NonLinearMeter";
import { useState } from "react";

export interface NonLinearMeterPreviewDialogProps {
  meter: StoredNonLinearMeter;
  open: boolean;
  onClose: () => void;
}

export function NonLinearMeterPreviewDialog(
  props: NonLinearMeterPreviewDialogProps
) {
  const { open, onClose, meter } = props;

  const [valueIndex, setValueIndex] = useState(0);
  const selectedOptionValue = meter.options[valueIndex]?.value;

  return (
    <Dialog open={open} onClose={onClose} maxWidth={"xs"} fullWidth>
      <DialogTitleWithCloseButton onClose={onClose}>
        {meter.label}
      </DialogTitleWithCloseButton>
      <DialogContent>
        <Stack spacing={2}>
          {meter.description && (
            <MarkdownRenderer markdown={meter.description} />
          )}
          <NonLinearMeter
            meter={meter}
            value={valueIndex}
            onChange={(idx) => setValueIndex(idx)}
          />
          {meter.rollable && (
            <StatComponent
              label={meter.label}
              value={
                typeof selectedOptionValue === "string"
                  ? parseInt(selectedOptionValue)
                  : selectedOptionValue ?? 0
              }
              disableRoll
            />
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
