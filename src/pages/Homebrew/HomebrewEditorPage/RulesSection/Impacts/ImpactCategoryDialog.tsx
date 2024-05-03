import { HomebrewImpactCategoryDocument } from "api-calls/homebrew/rules/impacts/_homebrewImpacts.type";
import { Dialog } from "@mui/material";
import { ImpactCategoryDialogForm } from "./ImpactCategoryDialogForm";

export interface ImpactCategoryDialogProps {
  homebrewId: string;
  open: boolean;
  onClose: () => void;
  onSave: (impactCategory: HomebrewImpactCategoryDocument) => Promise<void>;
  impactCategories: Record<string, HomebrewImpactCategoryDocument>;
  editingCategoryKey?: string;
}

export function ImpactCategoryDialog(props: ImpactCategoryDialogProps) {
  const { open, onClose } = props;

  return (
    <Dialog open={open} onClose={onClose} maxWidth={"xs"} fullWidth>
      <ImpactCategoryDialogForm {...props} />
    </Dialog>
  );
}
