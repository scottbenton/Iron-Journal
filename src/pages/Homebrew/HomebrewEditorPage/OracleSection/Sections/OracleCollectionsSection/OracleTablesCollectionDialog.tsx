import { Dialog } from "@mui/material";
import { HomebrewOracleCollectionDocument } from "api-calls/homebrew/oracles/collections/_homebrewOracleCollection.type";
import { OracleTablesCollectionDialogForm } from "./OracleTablesCollectionDialogForm";

export interface OracleTablesCollectionDialogProps {
  homebrewId: string;
  open: boolean;
  onClose: () => void;

  collections: Record<string, HomebrewOracleCollectionDocument>;
  existingCollectionId?: string;

  parentCollectionId?: string;
}

export function OracleTablesCollectionDialog(
  props: OracleTablesCollectionDialogProps
) {
  const { open, onClose } = props;

  return (
    <Dialog open={open} onClose={onClose}>
      <OracleTablesCollectionDialogForm {...props} />
    </Dialog>
  );
}
