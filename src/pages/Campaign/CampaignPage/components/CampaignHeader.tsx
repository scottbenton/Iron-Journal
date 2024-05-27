import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { CampaignType } from "api-calls/campaign/_campaign.type";
import { StickyHeader } from "components/shared/StickyHeader";
import { useCampaignType } from "hooks/useCampaignType";
import { useIsMobile } from "hooks/useIsMobile";
import { CharacterHeaderMoveOracleButtons } from "pages/Character/CharacterSheetPage/components/CharacterHeaderMoveOracleButtons";
import { useStore } from "stores/store";
import { HeaderSettingsButton } from "./HeaderSettingsButton";
export function CampaignHeader() {
  const theme = useTheme();
  const isMobile = useIsMobile();
  const isSmall = useMediaQuery(theme.breakpoints.down("md")) && !isMobile;

  const { campaignType, showGuidedPlayerView } = useCampaignType();

  const campaignName = useStore(
    (store) => store.campaigns.currentCampaign.currentCampaign?.name ?? ""
  );

  return (
    <StickyHeader
      maxStickyBreakpoint="sm"
      outerChildren={
        !(campaignType === CampaignType.Solo || showGuidedPlayerView) &&
        (isMobile || isSmall) && <CharacterHeaderMoveOracleButtons />
      }
    >
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography
          variant={"h4"}
          lineHeight={1}
          color={"white"}
          fontFamily={(theme) => theme.fontFamilyTitle}
        >
          {campaignName}
        </Typography>
        <HeaderSettingsButton />
      </Box>
    </StickyHeader>
  );
}
