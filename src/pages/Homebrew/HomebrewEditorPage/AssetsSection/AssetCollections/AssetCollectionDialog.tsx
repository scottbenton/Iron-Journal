import { Dialog } from "@mui/material";
import { AssetCollectionDialogForm } from "./AssetCollectionDialogForm";

export interface AssetCollectionDialogProps {
  homebrewId: string;
  existingAssetCollectionId?: string;
  open: boolean;
  onClose: () => void;
}

export function AssetCollectionDialog(props: AssetCollectionDialogProps) {
  const { open, onClose } = props;

  return (
    <Dialog open={open} onClose={onClose}>
      <AssetCollectionDialogForm {...props} />
    </Dialog>
  );
}
