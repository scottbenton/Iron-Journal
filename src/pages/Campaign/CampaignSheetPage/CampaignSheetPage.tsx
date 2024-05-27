import { Button, LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CampaignSheetHeader } from "./components/CampaignSheetHeader";
import { CharacterSection } from "./components/CharacterSection";
import { WorldSection } from "./components/WorldSection";
import { PageContent, PageHeader } from "components/shared/Layout";
import { BreakContainer } from "components/shared/BreakContainer";
import { TracksSection } from "./components/TracksSection";
import { StyledTabs, StyledTab } from "components/shared/StyledTabs";
import { WorldEmptyState } from "components/features/worlds/WorldEmptyState";
import { Head } from "providers/HeadProvider/Head";
import { useStore } from "stores/store";
import { useSyncStore } from "./hooks/useSyncStore";
import { ClockSection } from "components/features/charactersAndCampaigns/Clocks/ClockSection";
import { EmptyState } from "components/shared/EmptyState";
import { LinkComponent } from "components/shared/LinkComponent";
import { CAMPAIGN_ROUTES, constructCampaignPath } from "../routes";
import { useUpdateQueryStringValueWithoutNavigation } from "hooks/useUpdateQueryStringValueWithoutNavigation";

enum TABS {
  CHARACTER = "characters",
  WORLD = "world",
  TRACKS = "tracks",
}

export function CampaignSheetPage() {
  useSyncStore();

  const uid = useStore((store) => store.auth.uid);

  const [searchParams] = useSearchParams();
  const [selectedTab, setSelectedTab] = useState<TABS>(
    (searchParams.get("tab") as TABS) ?? TABS.CHARACTER
  );
  useUpdateQueryStringValueWithoutNavigation("tab", selectedTab);
  const handleTabChange = (tab: TABS) => {
    setSelectedTab(tab);
  };

  const loading = useStore((store) => store.campaigns.loading);
  const campaignId = useStore(
    (store) => store.campaigns.currentCampaign.currentCampaignId
  );
  const campaign = useStore(
    (store) => store.campaigns.currentCampaign.currentCampaign
  );

  const worldIds = useStore((store) =>
    Object.keys(store.worlds.worldMap)
      .filter((w) => store.worlds.worldMap[w].ownerIds.includes(uid))
      .sort((w1, w2) =>
        store.worlds.worldMap[w2].name.localeCompare(
          store.worlds.worldMap[w1].name
        )
      )
  );
  const worlds = useStore((store) => store.worlds.worldMap);
  const sortedWorlds = worldIds.map((worldId) => worlds[worldId]);

  const updateCampaignWorld = useStore(
    (store) => store.campaigns.currentCampaign.updateCampaignWorld
  );
  const [updateCampaignWorldLoading, setUpdateCampaignWorldLoading] =
    useState(false);

  const [syncLoading, setSyncLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSyncLoading(false);
    }, 2 * 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  if (loading || (!campaign && syncLoading)) {
    return <LinearProgress />;
  }

  if (!campaignId || !campaign) {
    return (
      <>
        <PageHeader />
        <PageContent isPaper>
          <EmptyState
            title={"Campaign not Found"}
            message={"Please try again from the campaign selection page"}
            showImage
            callToAction={
              <Button
                LinkComponent={LinkComponent}
                href={constructCampaignPath(CAMPAIGN_ROUTES.SELECT)}
                variant={"contained"}
                size={"large"}
              >
                Select a Campaign
              </Button>
            }
          />
        </PageContent>
      </>
    );
  }

  return (
    <>
      <Head
        title={campaign.name}
        description={`Campaign page for ${campaign.name}.`}
      />
      <CampaignSheetHeader campaign={campaign} campaignId={campaignId} />
      <PageContent isPaper>
        <BreakContainer>
          <StyledTabs
            value={selectedTab}
            onChange={(evt, value) => handleTabChange(value)}
            indicatorColor="primary"
            centered
            variant={"standard"}
            sx={(theme) => ({
              borderTopRightRadius: theme.shape.borderRadius,
              borderTopLeftRadius: theme.shape.borderRadius,
            })}
          >
            <StyledTab value={TABS.CHARACTER} label={"Characters"} />
            <StyledTab value={TABS.WORLD} label={"World"} />
            <StyledTab value={TABS.TRACKS} label={"Tracks"} />
          </StyledTabs>
        </BreakContainer>
        {selectedTab === TABS.CHARACTER && (
          <CharacterSection campaign={campaign} campaignId={campaignId} />
        )}
        {selectedTab === TABS.WORLD && (
          <>
            {campaign.worldId ? (
              <WorldSection />
            ) : (
              <WorldEmptyState
                isOnWorldTab
                worldsToChooseFrom={sortedWorlds}
                onChooseWorld={(worldIndex) => {
                  setUpdateCampaignWorldLoading(true);
                  updateCampaignWorld(worldIds[worldIndex])
                    .catch(() => {})
                    .finally(() => setUpdateCampaignWorldLoading(false));
                }}
                worldUpdateLoading={updateCampaignWorldLoading}
              />
            )}
          </>
        )}
        {selectedTab === TABS.TRACKS && (
          <>
            <TracksSection campaign={campaign} addTopMargin={false} />
            <ClockSection headingBreakContainer />
          </>
        )}
      </PageContent>
    </>
  );
}
