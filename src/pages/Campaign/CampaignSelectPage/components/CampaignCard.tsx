import { Box, Card, CardActionArea, Typography } from "@mui/material";
import {
  CAMPAIGN_ROUTES,
  constructCampaignSheetPath,
} from "pages/Campaign/routes";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useStore } from "stores/store";
import {
  CampaignDocument,
  CampaignType,
} from "api-calls/campaign/_campaign.type";
import OpenIcon from "@mui/icons-material/ChevronRight";
import SoloIcon from "@mui/icons-material/Person4";
import CoopIcon from "@mui/icons-material/Group";
import GuidedIcon from "@mui/icons-material/Groups2";

export interface CampaignCard {
  campaign: CampaignDocument;
  campaignId: string;
}

export function CampaignCard(props: CampaignCard) {
  const { campaign, campaignId } = props;

  const campaignType = campaign.type ?? CampaignType.Guided;

  const gmIds = campaign.gmIds;
  const playerIds = campaign.users;

  const loadUserDocuments = useStore((store) => store.users.loadUserDocuments);
  useEffect(() => {
    loadUserDocuments([...(gmIds ?? []), ...(playerIds ?? [])]);
  }, [gmIds, playerIds, loadUserDocuments]);

  const playerNameString = useStore((store) => {
    const playerNames: string[] = [];
    playerIds?.forEach((playerId) => {
      const displayName = store.users.userMap[playerId]?.doc?.displayName;
      if (displayName) {
        playerNames.push(displayName);
      }
    });
    return playerNames.join(", ");
  });

  const gmNameString = useStore((store) => {
    const gmNames: string[] = [];
    gmIds?.forEach((gmId) => {
      const displayName = store.users.userMap[gmId]?.doc?.displayName;
      if (displayName) {
        gmNames.push(displayName);
      }
    });
    return gmNames.join(", ");
  });

  return (
    <Card elevation={2} sx={{ height: "100%" }}>
      <CardActionArea
        component={Link}
        to={constructCampaignSheetPath(campaignId, CAMPAIGN_ROUTES.SHEET)}
        sx={{
          p: 2,
          height: "100%",
          display: "flex",
          alignItems: "flex-start",
        }}
      >
        <Box
          flexShrink={0}
          alignSelf={"flex-start"}
          mr={1}
          borderRadius={999}
          color={"primary.contrastText"}
          bgcolor={"primary.main"}
          p={1}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          {campaignType === CampaignType.Solo && <SoloIcon />}
          {campaignType === CampaignType.Coop && <CoopIcon />}
          {campaignType === CampaignType.Guided && <GuidedIcon />}
        </Box>
        <Box flexGrow={1} overflow={"hidden"}>
          <Typography variant={"h6"} component={"p"} lineHeight={1.1}>
            {campaign.name}
          </Typography>
          {campaignType === CampaignType.Solo && (
            <Typography
              color={"textSecondary"}
              component={"p"}
              textOverflow={"ellipsis"}
              whiteSpace={"nowrap"}
              overflow={"hidden"}
            >
              Solo Campaign
            </Typography>
          )}
          {campaignType === CampaignType.Coop && (
            <Typography
              color={"textSecondary"}
              component={"p"}
              textOverflow={"ellipsis"}
              whiteSpace={"nowrap"}
              overflow={"hidden"}
            >
              Players: {playerNameString} asdklajweofgi jaspdofgiaoseifu
              paoeiwjf l;askdjf oaiwejf
            </Typography>
          )}
          {campaignType === CampaignType.Guided && (
            <Typography
              color={"textSecondary"}
              component={"p"}
              textOverflow={"ellipsis"}
              whiteSpace={"nowrap"}
              overflow={"hidden"}
            >
              {(!campaign.gmIds || campaign.gmIds.length === 0) &&
                "No Guide Found"}
              {(gmIds ?? []).length > 1 ? "Guides:" : "Guide: "}
              {gmNameString}
            </Typography>
          )}
        </Box>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-end"}
          alignSelf={"stretch"}
          ml={1}
        >
          <OpenIcon aria-hidden />
        </Box>
      </CardActionArea>
    </Card>
  );
}
