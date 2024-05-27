import { Card } from "@mui/material";
import {
  ContainedTabPanel,
  StyledTab,
  StyledTabs,
} from "components/shared/StyledTabs";
import { useCampaignType } from "hooks/useCampaignType";
import { useGameSystem } from "hooks/useGameSystem";
import { useUpdateQueryStringValueWithoutNavigation } from "hooks/useUpdateQueryStringValueWithoutNavigation";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { GAME_SYSTEMS } from "types/GameSystems.type";
import { CharacterTab } from "./Tabs";

enum CampaignTabs {
  Characters = "characters",
  Tracks = "tracks",
  Notes = "notes",
  World = "world",
  Locations = "locations",
  Sectors = "sectors",
  NPCs = "ncps",
  Lore = "lore",
}

export function CampaignContent() {
  const { showGuidedPlayerView } = useCampaignType();

  const isStarforged = useGameSystem().gameSystem === GAME_SYSTEMS.STARFORGED;

  const [searchParams] = useSearchParams();
  const [selectedTab, setSelectedTab] = useState<CampaignTabs>(
    (searchParams.get("tab") as CampaignTabs) ?? CampaignTabs.Characters
  );
  useUpdateQueryStringValueWithoutNavigation("tab", selectedTab);
  const handleTabChange = (tab: CampaignTabs) => {
    setSelectedTab(tab);
  };

  return (
    <Card
      variant={"outlined"}
      sx={{
        borderRadius: { xs: 0, md: 1 },
        borderWidth: { xs: 0, md: 1 },
        borderTopWidth: { xs: 1 },
        mx: { xs: -2, sm: -3, md: 0 },
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <StyledTabs
        value={selectedTab}
        onChange={(evt, value) => handleTabChange(value)}
      >
        <StyledTab label="Characters" value={CampaignTabs.Characters} />
        <StyledTab label="Tracks" value={CampaignTabs.Tracks} />
        {!showGuidedPlayerView && (
          <StyledTab label="Notes" value={CampaignTabs.Notes} />
        )}
        <StyledTab label="World" value={CampaignTabs.World} />
        {isStarforged ? (
          <StyledTab label="Sectors" value={CampaignTabs.Sectors} />
        ) : (
          <StyledTab label="Locations" value={CampaignTabs.Locations} />
        )}
        <StyledTab label="NPCs" value={CampaignTabs.NPCs} />
        <StyledTab label="Lore" value={CampaignTabs.Lore} />
      </StyledTabs>
      <ContainedTabPanel isVisible={selectedTab === CampaignTabs.Characters}>
        <CharacterTab />
      </ContainedTabPanel>
    </Card>
  );
}
