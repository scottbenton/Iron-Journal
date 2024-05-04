import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  ListItemText,
  TextField,
} from "@mui/material";
import { DialogTitleWithCloseButton } from "components/shared/DialogTitleWithCloseButton";
import { useState } from "react";
import { useStore } from "stores/store";
import { HomebrewMoveCategoryDocument } from "api-calls/homebrew/moves/categories/_homebrewMoveCategory.type";

export interface MoveMoveDialogProps {
  open: boolean;
  moveId: string;
  moveCategoryId: string;
  categories: Record<string, HomebrewMoveCategoryDocument>;
  onClose: () => void;
}

export function MoveMoveDialog(props: MoveMoveDialogProps) {
  const { open, moveId, moveCategoryId, categories, onClose } = props;

  const [categoryId, setCategoryId] = useState<string | undefined>(
    moveCategoryId
  );

  const updateMove = useStore((store) => store.homebrew.updateMove);
  const handleMove = () => {
    if (categoryId) {
      updateMove(moveId, { categoryId })
        .then(() => {
          onClose();
        })
        .catch(() => {});
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth={"xs"} fullWidth>
      <DialogTitleWithCloseButton onClose={onClose}>
        Move Move
      </DialogTitleWithCloseButton>
      <DialogContent>
        <Autocomplete
          sx={{ mt: 1 }}
          options={Object.keys(categories)}
          getOptionKey={(option) => option}
          getOptionLabel={(key) => categories[key]?.label}
          renderInput={(params) => (
            <TextField {...params} label={"Move Categories"} />
          )}
          renderOption={(props, option) => (
            <Box component={"li"} {...props}>
              <ListItemText primary={categories[option].label} />
            </Box>
          )}
          value={categoryId ?? null}
          onChange={(evt, value) => {
            setCategoryId(value ?? undefined);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button color={"inherit"} onClick={onClose}>
          Cancel
        </Button>
        <Button variant={"contained"} onClick={handleMove}>
          Move Move
        </Button>
      </DialogActions>
    </Dialog>
  );
}
