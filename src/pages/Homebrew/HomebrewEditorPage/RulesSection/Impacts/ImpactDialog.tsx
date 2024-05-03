import { Dialog } from "@mui/material";
import { HomebrewImpact } from "api-calls/homebrew/rules/impacts/_homebrewImpacts.type";
import { HomebrewImpactCategoryDocument } from "api-calls/homebrew/rules/impacts/_homebrewImpacts.type";
import { ImpactDialogForm } from "./ImpactDialogForm";

export interface ImpactDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (impactCategoryId: string, impact: HomebrewImpact) => Promise<void>;
  impacts: HomebrewImpactCategoryDocument["contents"];
  editingCategoryKey: string;
  editingImpactKey?: string;
}

export function ImpactDialog(props: ImpactDialogProps) {
  const { open, onClose } = props;

  return (
    <Dialog open={open} onClose={onClose} maxWidth={"xs"} fullWidth>
      <ImpactDialogForm {...props} />
    </Dialog>
  );
}
