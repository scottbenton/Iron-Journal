import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { CampaignType } from "api-calls/campaign/_campaign.type";
import { CampaignTypeChooser } from "components/features/campaigns/CampaignTypeChooser";
import { DialogTitleWithCloseButton } from "components/shared/DialogTitleWithCloseButton";
import { useState } from "react";
import { useStore } from "stores/store";

export interface ChooseCampaignTypeDialogProps {
  open: boolean;
  onClose: () => void;
}

export function ChooseCampaignTypeDialog(props: ChooseCampaignTypeDialogProps) {
  const { open, onClose } = props;

  const campaign = useStore(
    (store) => store.campaigns.currentCampaign.currentCampaign
  );
  const type = campaign?.type;
  const canBeSolo = (campaign?.users.length ?? 1) === 1;

  const [campaignType, setCampaignType] = useState<CampaignType>(
    type ?? CampaignType.Guided
  );

  const [loading, setLoading] = useState(false);
  const updateCampaign = useStore(
    (store) => store.campaigns.currentCampaign.updateCampaign
  );
  const handleSave = () => {
    setLoading(true);
    updateCampaign({ type: campaignType })
      .then(() => {
        onClose();
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth={"md"} fullWidth>
      <DialogTitleWithCloseButton onClose={onClose}>
        Choose Campaign Type
      </DialogTitleWithCloseButton>
      <DialogContent>
        <CampaignTypeChooser
          type={campaignType}
          onChange={setCampaignType}
          hideSolo={!canBeSolo}
        />
      </DialogContent>
      <DialogActions>
        <Button color={"inherit"} onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button variant={"contained"} onClick={handleSave} disabled={loading}>
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
