import { Button, Dialog, DialogContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import {
  CampaignDocument,
  CampaignType,
} from "api-calls/campaign/_campaign.type";
import { CampaignActionsMenu } from "./CampaignActionsMenu";
import { PageHeader } from "components/shared/Layout";
import {
  CAMPAIGN_ROUTES,
  constructCampaignSheetPath,
} from "pages/Campaign/routes";
import { useMemo, useState } from "react";
import { DialogTitleWithCloseButton } from "components/shared/DialogTitleWithCloseButton";
import { useSnackbar } from "providers/SnackbarProvider/useSnackbar";
import { useStore } from "stores/store";
import { EditableTitle } from "components/shared/EditableTitle";
import { useCampaignType } from "hooks/useCampaignType";
import { useNewCampaignType } from "hooks/featureFlags/useNewCampaginType";

export interface CampaignSheetHeaderProps {
  campaign: CampaignDocument;
  campaignId: string;
}

export function CampaignSheetHeader(props: CampaignSheetHeaderProps) {
  const { campaign, campaignId } = props;

  const usingNewCampaignType = useNewCampaignType();
  const { campaignType, showGuidedPlayerView } = useCampaignType();

  const uid = useStore((store) => store.auth.uid);

  const updateCampaignGM = useStore(
    (store) => store.campaigns.currentCampaign.updateCampaignGM
  );
  const updateCampaign = useStore(
    (store) => store.campaigns.currentCampaign.updateCampaign
  );

  const gmLabel = useStore((store) =>
    (
      store.campaigns.currentCampaign.currentCampaign?.gmIds?.map(
        (gmId) => store.users.userMap[gmId]?.doc?.displayName ?? "Loading"
      ) ?? []
    ).join(", ")
  );
  const isGm = campaign.gmIds?.includes(uid) ?? false;

  const [inviteUsersDialogOpen, setInviteUsersDialogOpen] =
    useState<boolean>(false);

  const { success } = useSnackbar();

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
    <>
      <PageHeader
        label={
          <EditableTitle
            srLabel={"Campaign Name"}
            value={campaign.name}
            onBlur={(evt) =>
              updateCampaign({ name: evt.currentTarget.value }).catch(() => {})
            }
            readOnly={usingNewCampaignType ? showGuidedPlayerView : !isGm}
          />
        }
        subLabel={
          usingNewCampaignType
            ? campaignType === CampaignType.Guided
              ? (campaign.gmIds?.length ?? 0) > 0
                ? `GM: ${gmLabel}`
                : ""
              : undefined
            : (campaign.gmIds?.length ?? 0) > 0
            ? `GM: ${gmLabel}`
            : ""
        }
        actions={
          <>
            {(usingNewCampaignType
              ? campaignType !== CampaignType.Solo && !showGuidedPlayerView
              : true) && (
              <Button
                color={"primary"}
                variant={"contained"}
                onClick={() => setInviteUsersDialogOpen(true)}
              >
                Invite your Group
              </Button>
            )}
            {(usingNewCampaignType
              ? campaignType !== CampaignType.Solo
              : true) &&
              (!campaign.gmIds || campaign.gmIds.length === 0) && (
                <Button
                  onClick={() =>
                    updateCampaignGM(uid).catch((e) => console.error(e))
                  }
                  variant={"outlined"}
                  color={"inherit"}
                >
                  Mark self as GM
                </Button>
              )}
            {isGm && (
              <Button
                component={Link}
                to={constructCampaignSheetPath(
                  campaignId,
                  CAMPAIGN_ROUTES.GM_SCREEN
                )}
                variant={"outlined"}
                color={"inherit"}
              >
                Open GM Screen
              </Button>
            )}
            <CampaignActionsMenu campaign={campaign} />
          </>
        }
      />
      <Dialog
        open={inviteUsersDialogOpen}
        onClose={() => setInviteUsersDialogOpen(false)}
      >
        <DialogTitleWithCloseButton
          onClose={() => setInviteUsersDialogOpen(false)}
        >
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
    </>
  );
}
