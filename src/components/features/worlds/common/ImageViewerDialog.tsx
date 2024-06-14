import { Dialog, IconButton, Tooltip } from "@mui/material";
import { DialogTitleWithCloseButton } from "components/shared/DialogTitleWithCloseButton";
import EditImageIcon from "@mui/icons-material/Edit";

export interface ImageViewerDialogProps {
  name: string;
  imageUrl: string;
  open: boolean;
  onClose: () => void;
  handleEditClick: () => void;
}

export function ImageViewerDialog(props: ImageViewerDialogProps) {
  const { name, imageUrl, open, onClose, handleEditClick } = props;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitleWithCloseButton
        onClose={onClose}
        actions={
          <Tooltip title={"Remove Image"}>
            <IconButton onClick={handleEditClick}>
              <EditImageIcon />
            </IconButton>
          </Tooltip>
        }
      >
        {name}
      </DialogTitleWithCloseButton>
      <img src={imageUrl} alt={`${name}`} />
    </Dialog>
  );
}
