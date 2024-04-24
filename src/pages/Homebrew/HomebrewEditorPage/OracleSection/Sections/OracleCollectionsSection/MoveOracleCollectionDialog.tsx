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
import { deleteField } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useStore } from "stores/store";
import { StoredOracleCollection } from "types/homebrew/HomebrewOracles.type";

export interface MoveOracleCollectionDialogProps {
  open: boolean;
  parentOracleCollectionId?: string;
  oracleCollectionId: string;
  oracleCollections: Record<string, StoredOracleCollection>;
  onClose: () => void;
}

export function MoveOracleCollectionDialog(
  props: MoveOracleCollectionDialogProps
) {
  const {
    open,
    oracleCollectionId,
    parentOracleCollectionId,
    onClose,
    oracleCollections,
  } = props;

  const [collectionId, setCollectionId] = useState<string | undefined>(
    parentOracleCollectionId
  );

  useEffect(() => {
    setCollectionId(parentOracleCollectionId);
  }, [parentOracleCollectionId]);

  console.debug(parentOracleCollectionId, collectionId, oracleCollections);

  const updateOracleCollection = useStore(
    (store) => store.homebrew.updateOracleCollection
  );
  const handleMove = () => {
    updateOracleCollection(
      oracleCollectionId,
      collectionId
        ? { parentOracleCollectionId: collectionId }
        : { parentOracleCollectionId: deleteField() }
    )
      .then(() => {
        onClose();
      })
      .catch(() => {});
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth={"xs"} fullWidth>
      <DialogTitleWithCloseButton onClose={onClose}>
        Move Oracle Collection
      </DialogTitleWithCloseButton>
      <DialogContent>
        <Autocomplete
          sx={{ mt: 1 }}
          options={Object.keys(oracleCollections).filter(
            (collectionKey) =>
              !isDescendantOf(
                oracleCollectionId,
                collectionKey,
                oracleCollections
              )
          )}
          getOptionKey={(option) => option}
          getOptionLabel={(key) => oracleCollections[key]?.label}
          renderInput={(params) => (
            <TextField
              {...params}
              label={"Oracle Collections"}
              helperText={"Leave blank to move this to the top level"}
            />
          )}
          renderOption={(props, option) => (
            <Box component={"li"} {...props}>
              <ListItemText primary={oracleCollections[option].label} />
            </Box>
          )}
          value={collectionId ?? null}
          onChange={(evt, value) => {
            setCollectionId(value ?? undefined);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button color={"inherit"} onClick={onClose}>
          Cancel
        </Button>
        <Button variant={"contained"} onClick={handleMove}>
          Move Collection
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function isDescendantOf(
  currentCollectionId: string,
  collectionToCheckId: string,
  collections: Record<string, StoredOracleCollection>
) {
  if (currentCollectionId === collectionToCheckId) {
    return true;
  }
  let parentId = collections[collectionToCheckId].parentOracleCollectionId;
  while (parentId) {
    if (parentId === currentCollectionId) {
      return true;
    }
    parentId = collections[parentId].parentOracleCollectionId;
  }
  return false;
}
