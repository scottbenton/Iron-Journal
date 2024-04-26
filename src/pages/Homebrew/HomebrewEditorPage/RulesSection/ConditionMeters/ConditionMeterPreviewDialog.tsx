import { Dialog, DialogContent, Stack } from "@mui/material";
import { StoredConditionMeter } from "types/homebrew/HomebrewRules.type";
import { DialogTitleWithCloseButton } from "components/shared/DialogTitleWithCloseButton";
import { MarkdownRenderer } from "components/shared/MarkdownRenderer";
import { Track } from "components/features/Track";
import { StatComponent } from "components/features/characters/StatComponent";

export interface ConditionMeterPreviewDialogProps {
  conditionMeter: StoredConditionMeter;
  open: boolean;
  onClose: () => void;
}

export function ConditionMeterPreviewDialog(
  props: ConditionMeterPreviewDialogProps
) {
  const { open, onClose, conditionMeter } = props;

  return (
    <Dialog open={open} onClose={onClose} maxWidth={"xs"} fullWidth>
      <DialogTitleWithCloseButton onClose={onClose}>
        {conditionMeter.label}
      </DialogTitleWithCloseButton>
      <DialogContent>
        <Stack spacing={2}>
          {conditionMeter.description && (
            <MarkdownRenderer markdown={conditionMeter.description} />
          )}

          <Track
            label={conditionMeter.label}
            value={conditionMeter.value}
            min={conditionMeter.min}
            max={conditionMeter.max}
          />
          {conditionMeter.rollable && (
            <StatComponent
              label={conditionMeter.label}
              value={conditionMeter.value}
              disableRoll
            />
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
