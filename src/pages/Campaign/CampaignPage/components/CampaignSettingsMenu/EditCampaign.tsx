import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { CampaignTypeChooser } from "components/features/campaigns/CampaignTypeChooser";
import { DialogTitleWithCloseButton } from "components/shared/DialogTitleWithCloseButton";
import { useCampaignType } from "hooks/useCampaignType";
import { useState } from "react";
import { useStore } from "stores/store";

export interface EditCampaignProps {
  open: boolean;
  onClose: () => void;
}

export function EditCampaign(props: EditCampaignProps) {
  const { open, onClose } = props;

  const campaignName = useStore(
    (store) =>
      store.campaigns.currentCampaign.currentCampaign?.name ??
      "Unnamed Campaign"
  );
  const { campaignType } = useCampaignType();

  const [newName, setNewName] = useState(campaignName);
  const [newType, setNewType] = useState(campaignType);

  const [isLoading, setIsLoading] = useState(false);

  const updateCampaign = useStore(
    (store) => store.campaigns.currentCampaign.updateCampaign
  );

  const handleSave = () => {
    setIsLoading(false);
    updateCampaign({
      name: newName,
      type: newType,
    })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
        onClose();
      });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitleWithCloseButton onClose={onClose}>
        Edit Campaign
      </DialogTitleWithCloseButton>
      <DialogContent>
        <Stack spacing={2} sx={{ pt: 1 }}>
          <TextField
            label={"Campaign Name"}
            value={newName}
            onChange={(evt) => setNewName(evt.target.value)}
          />
          <Typography variant={"subtitle1"}>Campaign Type</Typography>
          <CampaignTypeChooser
            type={newType}
            onChange={(newTypeValue) => setNewType(newTypeValue)}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button color={"inherit"} onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          variant={"contained"}
          onClick={() => handleSave()}
          disabled={isLoading}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
