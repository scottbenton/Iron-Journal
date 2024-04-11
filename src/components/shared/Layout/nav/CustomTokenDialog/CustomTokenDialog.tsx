import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from "@mui/material";
import { DialogTitleWithCloseButton } from "components/shared/DialogTitleWithCloseButton";
import { loginWithToken } from "lib/auth.lib";
import { useState } from "react";

export interface CustomTokenDialogProps {
  open: boolean;
  onClose: () => void;
}

export function CustomTokenDialog(props: CustomTokenDialogProps) {
  const { open, onClose } = props;

  const [token, setToken] = useState("");
  const handleLogin = () => {
    loginWithToken(token)
      .then(() => {
        location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitleWithCloseButton onClose={onClose}>
        Login with Custom Token
      </DialogTitleWithCloseButton>
      <DialogContent>
        <TextField
          sx={{ mt: 0.5 }}
          label={"Token"}
          value={token}
          onChange={(evt) => setToken(evt.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button color={"inherit"} onClick={onClose}>
          Cancel
        </Button>
        <Button variant={"contained"} onClick={handleLogin}>
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
}
