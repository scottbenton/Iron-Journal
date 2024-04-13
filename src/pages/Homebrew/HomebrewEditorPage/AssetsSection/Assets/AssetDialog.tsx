import { Dialog } from "@mui/material";
import { AssetDialogForm } from "./AssetDialogForm";

export interface AssetDialogProps {
  homebrewId: string;
  categoryId: string;
  existingAssetId?: string;
  open: boolean;
  onClose: () => void;
}

export function AssetDialog(props: AssetDialogProps) {
  const { open, onClose } = props;

  return (
    <Dialog open={open} onClose={onClose} maxWidth={"md"}>
      <AssetDialogForm {...props} />
    </Dialog>
  );
}
