import { useStore } from "stores/store";
import { useSyncStore } from "./hooks/useSyncStore";
import { useEffect, useState } from "react";
import { Button, LinearProgress } from "@mui/material";
import { useNewCampaignType } from "hooks/featureFlags/useNewCampaginType";
import { CampaignSheetPage } from "../CampaignSheetPage/CampaignSheetPage";
import { PageContent, PageHeader } from "components/shared/Layout";
import { EmptyState } from "components/shared/EmptyState";
import { LinkComponent } from "components/shared/LinkComponent";
import { CAMPAIGN_ROUTES, constructCampaignPath } from "../routes";
import { Head } from "providers/HeadProvider/Head";
import { SectionWithSidebar } from "components/shared/Layout/SectionWithSidebar";
import { Sidebar } from "pages/Character/CharacterSheetPage/components/Sidebar";
import { CampaignHeader } from "./components/CampaignHeader";
import { useCampaignType } from "hooks/useCampaignType";
import { CampaignContent } from "./components/CampaignContent";

function CampaignPageInner() {
  useSyncStore();

  const loading = useStore((store) => store.campaigns.loading);
  const campaignName = useStore(
    (store) => store.campaigns.currentCampaign.currentCampaign?.name
  );
  const isCampaignLoaded = useStore(
    (store) => !!store.campaigns.currentCampaign.currentCampaign
  );
  const { showGuidedPlayerView } = useCampaignType();
  const [syncLoading, setSyncLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSyncLoading(false);
    }, 2 * 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  if (loading || (!isCampaignLoaded && syncLoading)) {
    return <LinearProgress />;
  }

  if (!isCampaignLoaded) {
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
                Campaign Select
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
        title={campaignName ?? ""}
        description={`Campaign ${campaignName ?? ""}`}
      />
      <PageHeader />
      <PageContent
        viewHeight
        isPaper
        sx={{
          pb: { xs: 0, md: 2 },
        }}
      >
        <CampaignHeader />
        <SectionWithSidebar
          sx={{ mt: 2 }}
          sidebar={!showGuidedPlayerView && <Sidebar />}
          mainContent={<CampaignContent />}
        />
      </PageContent>
    </>
  );
}

// Temporary wrapper REMOVE WHEN removing beta test
export function CampaignPage() {
  const usingNewCampaignPage = useNewCampaignType();

  if (usingNewCampaignPage) {
    return <CampaignPageInner />;
  } else {
    return <CampaignSheetPage />;
  }
}
