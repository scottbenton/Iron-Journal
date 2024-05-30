import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useSnackbar } from "providers/SnackbarProvider/useSnackbar";
import { updateUser } from "lib/auth.lib";
import { useEffect, useState } from "react";
import { useStore } from "stores/store";
import { UserAvatar } from "./UserAvatar";
import { UserDocument } from "api-calls/user/_user.type";
import { DialogTitleWithCloseButton } from "./DialogTitleWithCloseButton";

export interface UserNameDialogProps {
  open: boolean;
  updating?: boolean;
  handleClose: () => void;
}

export function UserNameDialog(props: UserNameDialogProps) {
  const { open, updating, handleClose } = props;
  const { error } = useSnackbar();

  const user = useStore((store) => store.auth.user);
  const hasHiddenPhotoUrl = useStore((store) =>
    user?.uid ? store.users.userMap[user.uid]?.doc?.hidePhoto ?? false : false
  );

  const [name, setName] = useState(user?.displayName ?? "");
  const [showProfileImage, setShowProfileImage] = useState(!hasHiddenPhotoUrl);

  useEffect(() => {
    setShowProfileImage(!hasHiddenPhotoUrl);
  }, [hasHiddenPhotoUrl]);

  const [isLoading, setIsLoading] = useState(false);

  const handleSave = () => {
    if (name.trim().length > 0) {
      const newUserDoc: UserDocument = {
        displayName: name,
        hidePhoto: !showProfileImage,
      };
      if (user?.photoURL) {
        newUserDoc.photoURL = user.photoURL;
      }

      setIsLoading(true);
      updateUser(newUserDoc)
        .then(() => {
          location.reload();
          handleClose();
        })
        .catch((e) => {
          console.error(e);
          error("Failed to update name");
          handleClose();
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      error("Name is required.");
    }
  };

  return (
    <Dialog open={open} onClose={updating ? handleClose : () => {}}>
      {updating ? (
        <DialogTitleWithCloseButton onClose={handleClose}>
          Change Username
        </DialogTitleWithCloseButton>
      ) : (
        <DialogTitle>We did not catch your name</DialogTitle>
      )}
      <DialogContent>
        <Stack spacing={2}>
          <Typography>
            Usernames will be displayed to other players in campaigns.
          </Typography>
          <TextField
            label={"Username"}
            value={name}
            onChange={(evt) => setName(evt.currentTarget.value)}
            sx={{ mt: 4 }}
          />
          {user?.photoURL && (
            <Stack direction={"row"} spacing={1}>
              <UserAvatar
                uid={user.uid}
                forceShowPhoto={showProfileImage}
                forceName={name}
              />
              <FormControlLabel
                label={"Show Profile Image"}
                control={
                  <Checkbox
                    checked={showProfileImage}
                    onChange={(evt, checked) => setShowProfileImage(checked)}
                  />
                }
              />
            </Stack>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        {updating && (
          <Button onClick={handleClose} color={"inherit"}>
            Cancel
          </Button>
        )}
        <LoadingButton
          loading={isLoading}
          variant={"contained"}
          color={"primary"}
          onClick={() => handleSave()}
        >
          Set Name
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
