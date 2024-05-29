import { Button, Dialog, DialogContent, Typography } from "@mui/material";
import { DialogTitleWithCloseButton } from "components/shared/DialogTitleWithCloseButton";
import {
  CAMPAIGN_ROUTES,
  constructCampaignSheetPath,
} from "pages/Campaign/routes";
import { useSnackbar } from "providers/SnackbarProvider";
import { useMemo } from "react";
import { useStore } from "stores/store";

export interface InviteUsersDialogProps {
  open: boolean;
  onClose: () => void;
}

export function InviteUsersDialog(props: InviteUsersDialogProps) {
  const { open, onClose } = props;

  const { success } = useSnackbar();
  const campaignId = useStore(
    (store) => store.campaigns.currentCampaign.currentCampaignId ?? ""
  );

  const joinLink = useMemo(() => {
    return (
      window.location.origin +
      constructCampaignSheetPath(campaignId, CAMPAIGN_ROUTES.JOIN)
    );
  }, [campaignId]);

  const copyLinkToClipboard = () => {
    navigator.clipboard
      .writeText(joinLink)
      .then(() => {
        success("Copied Link to Clipboard");
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitleWithCloseButton onClose={onClose}>
        Invite your Group
      </DialogTitleWithCloseButton>
      <DialogContent>
        <Typography>
          Other players can use the following link to join this campaign.
        </Typography>
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
          {joinLink}
        </Typography>
        <Button onClick={() => copyLinkToClipboard()} variant={"contained"}>
          Copy Link
        </Button>
      </DialogContent>
    </Dialog>
  );
}
