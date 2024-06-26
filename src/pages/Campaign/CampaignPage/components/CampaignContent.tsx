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
import { CharacterTab, NotesTab, TracksTab, WorldTab } from "./Tabs";
import { SectorSection } from "components/features/worlds/SectorSection";
import { useStore } from "stores/store";
import { NPCSection } from "components/features/worlds/NPCSection";
import { LoreSection } from "components/features/worlds/Lore";
import { LocationsSection } from "components/features/worlds/Locations";
import { useNewMaps } from "hooks/featureFlags/useNewMaps";

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

export interface CampaignContentProps {
  openInviteDialog: () => void;
}

export function CampaignContent(props: CampaignContentProps) {
  const { openInviteDialog } = props;
  const { showGuidedPlayerView, showGuideTips } = useCampaignType();

  const showNewLocations = useNewMaps();
  const shouldShowSectors =
    useGameSystem().gameSystem === GAME_SYSTEMS.STARFORGED && !showNewLocations;

  const [searchParams] = useSearchParams();
  const [selectedTab, setSelectedTab] = useState<CampaignTabs>(
    (searchParams.get("tab") as CampaignTabs) ?? CampaignTabs.Characters
  );
  useUpdateQueryStringValueWithoutNavigation("tab", selectedTab);
  const handleTabChange = (tab: CampaignTabs) => {
    setSelectedTab(tab);
  };

  const hasWorld = useStore(
    (store) => !!store.campaigns.currentCampaign.currentCampaign?.worldId
  );

  return (
    <Card
      variant={"outlined"}
      sx={{
        borderWidth: { xs: 0, md: 1 },
        borderTopWidth: { xs: 1 },
        mx: { xs: -2, sm: -3, md: 0 },
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <StyledTabs
        value={selectedTab}
        onChange={(evt, value) => handleTabChange(value)}
        sx={(theme) => ({
          borderTopRightRadius: theme.shape.borderRadius,
          borderTopLeftRadius: theme.shape.borderRadius,
        })}
      >
        <StyledTab label="Characters" value={CampaignTabs.Characters} />
        <StyledTab label="Tracks" value={CampaignTabs.Tracks} />
        {!showGuidedPlayerView && (
          <StyledTab label="Notes" value={CampaignTabs.Notes} />
        )}
        <StyledTab label="World" value={CampaignTabs.World} />
        {shouldShowSectors ? (
          <StyledTab label="Sectors" value={CampaignTabs.Sectors} />
        ) : (
          <StyledTab label="Locations" value={CampaignTabs.Locations} />
        )}
        <StyledTab label="NPCs" value={CampaignTabs.NPCs} />
        <StyledTab label="Lore" value={CampaignTabs.Lore} />
      </StyledTabs>
      <ContainedTabPanel isVisible={selectedTab === CampaignTabs.Characters}>
        <CharacterTab openInviteDialog={openInviteDialog} />
      </ContainedTabPanel>
      <ContainedTabPanel isVisible={selectedTab === CampaignTabs.Tracks}>
        <TracksTab />
      </ContainedTabPanel>
      <ContainedTabPanel isVisible={selectedTab === CampaignTabs.Notes}>
        <NotesTab />
      </ContainedTabPanel>
      <ContainedTabPanel isVisible={selectedTab === CampaignTabs.World}>
        <WorldTab />
      </ContainedTabPanel>
      {shouldShowSectors ? (
        <ContainedTabPanel
          isVisible={selectedTab === CampaignTabs.Sectors}
          greyBackground={hasWorld}
        >
          <SectorSection
            showHiddenTag={showGuideTips}
            openNPCTab={() => setSelectedTab(CampaignTabs.NPCs)}
          />
        </ContainedTabPanel>
      ) : (
        <ContainedTabPanel
          isVisible={selectedTab === CampaignTabs.Locations}
          greyBackground={hasWorld}
        >
          <LocationsSection
            showHiddenTag
            openNPCTab={() => setSelectedTab(CampaignTabs.NPCs)}
          />
        </ContainedTabPanel>
      )}
      <ContainedTabPanel
        isVisible={selectedTab === CampaignTabs.NPCs}
        greyBackground={hasWorld}
      >
        <NPCSection showHiddenTag={showGuideTips} />
      </ContainedTabPanel>
      <ContainedTabPanel
        isVisible={selectedTab === CampaignTabs.Lore}
        greyBackground={hasWorld}
      >
        <LoreSection showHiddenTag={showGuideTips} />
      </ContainedTabPanel>
    </Card>
  );
}
