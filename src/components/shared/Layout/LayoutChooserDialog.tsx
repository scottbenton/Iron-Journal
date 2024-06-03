import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { DialogTitleWithCloseButton } from "../DialogTitleWithCloseButton";
import { useStore } from "stores/store";
import { ReferenceSidebarLocation } from "types/Layouts.type";

export interface LayoutChooserDialogProps {
  open: boolean;
  onClose: () => void;
}

export function LayoutChooserDialog(props: LayoutChooserDialogProps) {
  const { open, onClose } = props;

  const referenceSidebarLocation = useStore(
    (store) =>
      store.auth.userDoc?.layout?.referenceSidebarLocation ??
      ReferenceSidebarLocation.Left
  );

  const updateUser = useStore((store) => store.auth.updateUserDoc);
  const setReferenceSidebarLocation = (value: string) => {
    let newValue = ReferenceSidebarLocation.Left;
    if (value === ReferenceSidebarLocation.Right) {
      newValue = ReferenceSidebarLocation.Right;
    }
    updateUser({ "layout.referenceSidebarLocation": newValue });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitleWithCloseButton onClose={onClose}>
        Change Layout
      </DialogTitleWithCloseButton>
      <DialogContent>
        <FormControl>
          <FormLabel id={"reference-sidebar-position"}>
            Reference Sidebar Position
          </FormLabel>
          <Alert severity="info">
            Controls the location of the moves and assets sidebar on larger
            screens.
          </Alert>
          <RadioGroup
            aria-labelledby="reference-sidebar-position"
            name={"reference-sidebar-position-group"}
            value={referenceSidebarLocation}
            onChange={(evt) =>
              setReferenceSidebarLocation(
                evt.target.value as ReferenceSidebarLocation
              )
            }
          >
            <FormControlLabel
              value={ReferenceSidebarLocation.Left}
              control={<Radio />}
              label="Left"
            />
            <FormControlLabel
              value={ReferenceSidebarLocation.Right}
              control={<Radio />}
              label="Right"
            />
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button variant={"contained"} onClick={onClose}>
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
}
