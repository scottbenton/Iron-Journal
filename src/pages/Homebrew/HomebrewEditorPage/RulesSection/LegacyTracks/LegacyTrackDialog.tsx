import { HomebrewLegacyTrackDocument } from "api-calls/homebrew/rules/legacyTracks/_homebrewLegacyTrack.type";
import { Dialog } from "@mui/material";
import { LegacyTrackDialogForm } from "./LegacyTrackDialogForm";

export interface LegacyTrackDialogProps {
  homebrewId: string;
  legacyTracks: Record<string, HomebrewLegacyTrackDocument>;
  open: boolean;
  onSave: (legacyTrack: HomebrewLegacyTrackDocument) => Promise<void>;
  onClose: () => void;
  editingLegacyTrackKey?: string;
}

export function LegacyTrackDialog(props: LegacyTrackDialogProps) {
  const { open, onClose } = props;

  return (
    <Dialog open={open} onClose={onClose} maxWidth={"xs"} fullWidth>
      <LegacyTrackDialogForm {...props} />
    </Dialog>
  );
}
