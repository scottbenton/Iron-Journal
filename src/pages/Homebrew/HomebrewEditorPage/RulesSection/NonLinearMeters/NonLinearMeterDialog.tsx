import { Dialog } from "@mui/material";
import { StoredNonLinearMeter } from "types/homebrew/HomebrewRules.type";
import { NonLinearMeterDialogForm } from "./NonLinearMeterDialogForm";

export interface NonLinearMeterDialogProps {
  homebrewId: string;
  nonLinearMeters: Record<string, StoredNonLinearMeter>;
  open: boolean;
  onSave: (meter: StoredNonLinearMeter) => Promise<void>;
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
