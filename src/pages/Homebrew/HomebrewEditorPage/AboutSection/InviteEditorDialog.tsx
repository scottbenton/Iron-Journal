import {
  Alert,
  Button,
  Dialog,
  DialogContent,
  Skeleton,
  Typography,
} from "@mui/material";
import { getEditorInviteUrl } from "api-calls/homebrew/editorFunction/getEditorInviteUrl";
import { DialogTitleWithCloseButton } from "components/shared/DialogTitleWithCloseButton";
import { useSnackbar } from "providers/SnackbarProvider";
import { useEffect, useState } from "react";

export interface InviteEditorDialogProps {
  homebrewId: string;
  open: boolean;
  onClose: () => void;
}

export function InviteEditorDialog(props: InviteEditorDialogProps) {
  const { homebrewId, open, onClose } = props;

  const [inviteLink, setInviteLink] = useState<string>();
  const { success, error } = useSnackbar();

  useEffect(() => {
    getEditorInviteUrl(homebrewId)
      .then((url) => {
        if (url) {
          setInviteLink(location.origin + url);
        } else {
          error("Failed to create invite link");
        }
      })
      .catch(() => {
        error("Failed to create invite link");
      });
  }, [error, homebrewId]);

  const handleCopy = () => {
    if (inviteLink) {
      navigator.clipboard.writeText(inviteLink).then(() => {
        success("Copied URL to clipboard");
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitleWithCloseButton onClose={onClose}>
        Invite Editors
      </DialogTitleWithCloseButton>
      <DialogContent>
        <Alert severity="warning">
          Only share this link with people you want to have edit access.
        </Alert>
        <Typography
          sx={(theme) => ({
            backgroundColor: theme.palette.grey[700],
            color: theme.palette.grey[200],
            px: 1,
            py: 0.25,
            borderRadius: `${theme.shape.borderRadius}px`,
            my: 2,
          })}
        >
          {inviteLink ?? <Skeleton />}
        </Typography>
        <Button onClick={() => handleCopy()} variant={"contained"}>
          Copy Invite Link
        </Button>
      </DialogContent>
    </Dialog>
  );
}
