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
import { useEffect, useState } from "react";
import { useStore } from "stores/store";
import { HomebrewAssetCollectionDocument } from "api-calls/homebrew/assets/collections/_homebrewAssetCollection.type";

export interface MoveAssetDialogProps {
  onClose: () => void;
  state?: {
    assetId: string;
    assetCollectionId: string;
  };
  collections: Record<string, HomebrewAssetCollectionDocument>;
}

export function MoveAssetDialog(props: MoveAssetDialogProps) {
  const { state, onClose, collections } = props;
  const { assetId, assetCollectionId } = state ?? {};

  const [selectedAssetCollection, setSelectedAssetCollection] =
    useState(assetCollectionId);

  useEffect(() => {
    setSelectedAssetCollection(assetCollectionId);
  }, [assetCollectionId]);

  const updateAsset = useStore((store) => store.homebrew.updateAsset);

  const handleSave = () => {
    if (assetId && selectedAssetCollection) {
      updateAsset(assetId, { categoryKey: selectedAssetCollection })
        .then(() => {
          onClose();
        })
        .catch(() => {});
    }
  };

  return (
    <Dialog open={!!assetId} onClose={onClose} maxWidth={"xs"} fullWidth>
      <DialogTitleWithCloseButton onClose={onClose}>
        Move Asset
      </DialogTitleWithCloseButton>
      <DialogContent>
        <Autocomplete
          sx={{ mt: 1 }}
          options={Object.keys(collections)}
          getOptionKey={(option) => option}
          getOptionLabel={(key) => collections[key]?.label}
          renderInput={(params) => (
            <TextField {...params} label={"Asset Collections"} />
          )}
          renderOption={(props, option) => (
            <Box component={"li"} {...props}>
              <ListItemText primary={collections[option].label} />
            </Box>
          )}
          value={selectedAssetCollection ?? null}
          onChange={(evt, value) => {
            setSelectedAssetCollection(value ?? undefined);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button color={"inherit"} onClick={onClose}>
          Cancel
        </Button>
        <Button variant={"contained"} onClick={handleSave}>
          Move Asset
        </Button>
      </DialogActions>
    </Dialog>
  );
}
