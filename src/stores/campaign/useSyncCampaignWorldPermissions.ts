import { CampaignType } from "api-calls/campaign/_campaign.type";
import { useEffect, useMemo } from "react";
import { useStore } from "stores/store";

export function useSyncCampaignWorldPermissions() {
  const uid = useStore((store) => store.auth.uid);
  const campaigns = useStore((store) => store.campaigns.campaignMap);
  const areCampaignsLoading = useStore((store) => store.campaigns.loading);
  const worlds = useStore((store) => store.worlds.worldMap);
  const areWorldsLoading = useStore((store) => store.worlds.loading);

  const campaignGuideMap = useMemo(() => {
    const map: { [worldId: string]: string } = {};
    Object.keys(campaigns).forEach((campaignKey) => {
      const campaign = campaigns[campaignKey];
      const worldId = campaign.worldId;
      if (
        worldId &&
        (campaign.type === CampaignType.Coop ||
          (campaign.type === CampaignType.Guided &&
            campaign.gmIds?.includes(uid)))
      ) {
        map[worldId] = campaignKey;
      }
    });
    return map;
  }, [campaigns, uid]);
  const updateWorldGuides = useStore((store) => store.worlds.updateWorldGuide);

  useEffect(() => {
    if (uid && !areCampaignsLoading && !areWorldsLoading) {
      Object.keys(worlds).forEach((worldId) => {
        const world = worlds[worldId];
        const isFullOwner = world.ownerIds.includes(uid);
        const isPartialOwner = world.campaignGuides?.includes(uid);
        if (campaignGuideMap[worldId] && !isFullOwner && !isPartialOwner) {
          // Add the user as a guide
          updateWorldGuides(worldId, uid);
        } else if (!campaignGuideMap[worldId] && isPartialOwner) {
          // Remove the user as a guide
          updateWorldGuides(worldId, uid, true);
        }
      });
    }
  }, [
    worlds,
    areCampaignsLoading,
    areWorldsLoading,
    updateWorldGuides,
    campaignGuideMap,
    uid,
  ]);
}
