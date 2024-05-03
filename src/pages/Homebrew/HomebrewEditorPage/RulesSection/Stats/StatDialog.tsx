import { HomebrewStatDocument } from "api-calls/homebrew/rules/stats/_homebrewStat.type";
import { Dialog } from "@mui/material";
import { StatDialogForm } from "./StatDialogForm";

export interface StatDialogProps {
  homebrewId: string;
  stats: Record<string, HomebrewStatDocument>;
  open: boolean;
  onSave: (stat: HomebrewStatDocument) => Promise<void>;
  onClose: () => void;
  editingStatKey?: string;
}

export function StatDialog(props: StatDialogProps) {
  const { open, onClose } = props;

  return (
    <Dialog open={open} onClose={onClose} maxWidth={"xs"} fullWidth>
      <StatDialogForm {...props} />
    </Dialog>
  );
}
