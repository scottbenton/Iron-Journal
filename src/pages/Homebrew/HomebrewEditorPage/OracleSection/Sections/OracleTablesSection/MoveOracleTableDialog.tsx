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
import { HomebrewOracleCollectionDocument } from "api-calls/homebrew/oracles/collections/_homebrewOracleCollection.type";

export interface MoveOracleTableDialogProps {
  open: boolean;
  oracleId: string;
  oracleCollectionId: string;
  oracleCollections: Record<string, HomebrewOracleCollectionDocument>;
  onClose: () => void;
}

export function MoveOracleTableDialog(props: MoveOracleTableDialogProps) {
  const { open, oracleId, oracleCollectionId, onClose, oracleCollections } =
    props;

  const [collectionId, setCollectionId] = useState<string | undefined>(
    oracleCollectionId
  );

  const updateOracle = useStore((store) => store.homebrew.updateOracleTable);
  const handleMove = () => {
    if (collectionId) {
      updateOracle(oracleId, { oracleCollectionId: collectionId })
        .then(() => {
          onClose();
        })
        .catch(() => {});
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth={"xs"} fullWidth>
      <DialogTitleWithCloseButton onClose={onClose}>
        Move Oracle Table
      </DialogTitleWithCloseButton>
      <DialogContent>
        <Autocomplete
          sx={{ mt: 1 }}
          options={Object.keys(oracleCollections)}
          getOptionKey={(option) => option}
          getOptionLabel={(key) => oracleCollections[key]?.label}
          renderInput={(params) => (
            <TextField {...params} label={"Oracle Collections"} />
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
          Move Oracle
        </Button>
      </DialogActions>
    </Dialog>
  );
}
