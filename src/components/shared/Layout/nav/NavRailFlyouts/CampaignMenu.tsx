import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { LinkComponent } from "components/shared/LinkComponent";
import { useStore } from "stores/store";
import {
  CAMPAIGN_ROUTES,
  constructCampaignSheetPath,
} from "pages/Campaign/routes";
import { FlyoutMenuList } from "./FlyoutMenuList";

export function CampaignMenu() {
  const campaigns = useStore((store) => store.campaigns.campaignMap);

  return (
    <FlyoutMenuList
      label={"Campaigns"}
      itemIds={Object.keys(campaigns)}
      renderListItem={(campaignId) => (
        <ListItem key={campaignId} disablePadding>
          <ListItemButton
            LinkComponent={LinkComponent}
            href={constructCampaignSheetPath(campaignId, CAMPAIGN_ROUTES.SHEET)}
          >
            <ListItemText primary={campaigns[campaignId].name} />
          </ListItemButton>
        </ListItem>
      )}
    />
  );
}
