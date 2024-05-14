import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { TruthChooser, TruthChooserProps } from "./TruthChooser";
import { DialogTitleWithCloseButton } from "components/shared/DialogTitleWithCloseButton";

export interface TruthSelectorDialogProps extends TruthChooserProps {
  open: boolean;
  handleClose: () => void;
}

export function TruthSelectorDialog(props: TruthSelectorDialogProps) {
  const { open, handleClose, ...chooserProps } = props;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth={"md"} fullWidth>
      <DialogTitleWithCloseButton onClose={handleClose}>
        Title
      </DialogTitleWithCloseButton>
      <DialogContent>
        <TruthChooser {...chooserProps} maxCols={2} />
      </DialogContent>
      <DialogActions>
        <Button variant={"contained"} onClick={handleClose}>
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
}
