import { Dialog } from "@mui/material";
import { HomebrewConditionMeterDocument } from "api-calls/homebrew/rules/conditionMeters/_homebrewConditionMeters.type";
import { ConditionMeterDialogForm } from "./ConditionMeterDialogForm";

export interface ConditionMeterDialogProps {
  homebrewId: string;
  conditionMeters: Record<string, HomebrewConditionMeterDocument>;
  open: boolean;
  onSave: (conditionMeter: HomebrewConditionMeterDocument) => Promise<void>;
  onClose: () => void;
  editingConditionMeterKey?: string;
}

export function ConditionMeterDialog(props: ConditionMeterDialogProps) {
  const { open, onClose } = props;

  return (
    <Dialog open={open} onClose={onClose} maxWidth={"xs"} fullWidth>
      <ConditionMeterDialogForm {...props} />
    </Dialog>
  );
}
