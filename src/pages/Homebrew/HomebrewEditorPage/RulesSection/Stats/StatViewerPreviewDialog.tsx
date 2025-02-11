import { Dialog, DialogContent } from "@mui/material";
import { StatComponent } from "components/features/characters/StatComponent";
import { DialogTitleWithCloseButton } from "components/shared/DialogTitleWithCloseButton";
import { MarkdownRenderer } from "components/shared/MarkdownRenderer";
import { HomebrewStatDocument } from "api-calls/homebrew/rules/stats/_homebrewStat.type";

export interface StatViewerPreviewDialogProps {
  stat: HomebrewStatDocument;
  open: boolean;
  onClose: () => void;
}

export function StatViewerPreviewDialog(props: StatViewerPreviewDialogProps) {
  const { stat, open, onClose } = props;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitleWithCloseButton onClose={onClose}>
        {stat.label}
      </DialogTitleWithCloseButton>
      <DialogContent>
        {stat.description && <MarkdownRenderer markdown={stat.description} />}
        <StatComponent label={stat.label} value={1} disableRoll />
      </DialogContent>
    </Dialog>
  );
}
