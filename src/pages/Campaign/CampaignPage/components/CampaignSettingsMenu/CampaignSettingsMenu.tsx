import {
  IconButton,
  ListItemText,
  ListSubheader,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/ManageAccounts";
import { useState } from "react";
import { EditCampaign } from "./EditCampaign";
import { useConfirm } from "material-ui-confirm";
import { useNavigate } from "react-router-dom";
import { CAMPAIGN_ROUTES, constructCampaignPath } from "pages/Campaign/routes";
import { useStore } from "stores/store";
import { useCampaignType } from "hooks/useCampaignType";
import { CampaignType } from "api-calls/campaign/_campaign.type";

export function CampaignSettingsMenu() {
  const confirm = useConfirm();
  const navigate = useNavigate();

  const { campaignType, showGuidedPlayerView } = useCampaignType();

  const [anchorElement, setAnchorElement] = useState<HTMLButtonElement | null>(
    null
  );

  const [isEditCampaignOpen, setIsEditCampaignOpen] = useState(false);
  const handleClose = () => setAnchorElement(null);

  const leaveCampaign = useStore(
    (store) => store.campaigns.currentCampaign.leaveCampaign
  );
  const handleLeaveCampaign = () => {
    confirm({
      title: "Leave Campaign",
      description: "Are you sure you want to leave this campaign?",
      confirmationText: "Leave",
      confirmationButtonProps: {
        variant: "contained",
        color: "error",
      },
    })
      .then(() => {
        leaveCampaign()
          .then(() => {
            navigate(constructCampaignPath(CAMPAIGN_ROUTES.SELECT));
          })
          .catch(() => {});
      })
      .catch(() => {});
  };

  const isGuide = useStore(
    (store) =>
      store.campaigns.currentCampaign.currentCampaign?.gmIds?.includes(
        store.auth.uid
      ) ?? false
  );

  const deleteCampaign = useStore(
    (store) => store.campaigns.currentCampaign.deleteCampaign
  );
  const handleDeleteCampaign = () => {
    confirm({
      title: "End Campaign",
      description:
        "Are you sure you want to end your campaign? This will also remove your current characters from the campaign",
      confirmationText: "End",
      confirmationButtonProps: {
        variant: "contained",
        color: "error",
      },
    }).then(() => {
      deleteCampaign()
        .then(() => {
          navigate(constructCampaignPath(CAMPAIGN_ROUTES.SELECT));
        })
        .catch(() => {});
    });
  };

  const uid = useStore((store) => store.auth.uid);
  const updateCampaignGM = useStore(
    (store) => store.campaigns.currentCampaign.updateCampaignGM
  );

  const removeSelfAsGuide = () => {
    updateCampaignGM(uid, true).catch(() => {});
  };
  return (
    <>
      <Tooltip title={"Campaign Settings"}>
        <IconButton
          color={"inherit"}
          aria-label={"Settings"}
          onClick={(evt) => {
            setAnchorElement(evt.currentTarget);
          }}
        >
          <SettingsIcon />
        </IconButton>
      </Tooltip>
      <Menu
        open={!!anchorElement}
        anchorEl={anchorElement}
        onClose={handleClose}
        MenuListProps={{
          subheader: (
            <ListSubheader component={"div"} disableSticky>
              Campaign Settings
            </ListSubheader>
          ),
        }}
      >
        {!showGuidedPlayerView && (
          <MenuItem
            onClick={() => {
              handleClose();
              setIsEditCampaignOpen(true);
            }}
          >
            <ListItemText>Edit Campaign</ListItemText>
          </MenuItem>
        )}
        {campaignType !== CampaignType.Solo && (
          <MenuItem
            onClick={() => {
              handleClose();
              handleLeaveCampaign();
            }}
          >
            <ListItemText>Leave Campaign</ListItemText>
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            handleClose();
            handleDeleteCampaign();
          }}
        >
          <ListItemText>Delete Campaign</ListItemText>
        </MenuItem>
        {isGuide && campaignType === CampaignType.Guided && (
          <MenuItem
            onClick={() => {
              handleClose();
              removeSelfAsGuide();
            }}
          >
            <ListItemText>Step Down as Guide</ListItemText>
          </MenuItem>
        )}
      </Menu>
      <EditCampaign
        open={isEditCampaignOpen}
        onClose={() => setIsEditCampaignOpen(false)}
      />
    </>
  );
}
