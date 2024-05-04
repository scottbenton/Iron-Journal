import { Dialog } from "@mui/material";
import { HomebrewNonLinearMeterDocument } from "api-calls/homebrew/rules/nonLinearMeters/_homebrewNonLinearMeter.type";
import { NonLinearMeterDialogForm } from "./NonLinearMeterDialogForm";

export interface NonLinearMeterDialogProps {
  homebrewId: string;
  nonLinearMeters: Record<string, HomebrewNonLinearMeterDocument>;
  open: boolean;
  onSave: (meter: HomebrewNonLinearMeterDocument) => Promise<void>;
  onClose: () => void;
  editingNonLinearMeterKey?: string;
}

export function NonLinearMeterDialog(props: NonLinearMeterDialogProps) {
  const { open, onClose } = props;
  return (
    <Dialog open={open} onClose={onClose} maxWidth={"xs"} fullWidth>
      <NonLinearMeterDialogForm {...props} />
    </Dialog>
  );
}
