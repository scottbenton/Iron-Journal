import { Button, Container, Grid, Stack } from "@mui/material";
import { CampaignType } from "api-calls/campaign/_campaign.type";
import { SectionHeading } from "components/shared/SectionHeading";
import { useCampaignType } from "hooks/useCampaignType";
import { useStore } from "stores/store";
import { UserCard } from "./UserCard";
import { useSnackbar } from "providers/SnackbarProvider";
import { useMemo, useState } from "react";
import {
  CAMPAIGN_ROUTES,
  constructCampaignSheetPath,
} from "pages/Campaign/routes";
import { CharacterCard } from "./CharacterCard";
import { AddCharacterDialog } from "pages/Campaign/CampaignSheetPage/components/AddCharacterDialog";
import { SharedAssetSection } from "./SharedAssetSection";

export function CharacterTab() {
  const { campaignType } = useCampaignType();

  const users = useStore(
    (store) => store.campaigns.currentCampaign.currentCampaign?.users
  );

  const campaignId = useStore(
    (store) => store.campaigns.currentCampaign.currentCampaignId ?? ""
  );
  const characters = useStore(
    (store) => store.campaigns.currentCampaign.characters.characterMap
  );

  const [addCharacterDialogOpen, setAddCharacterDialogOpen] =
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
      <Stack spacing={2} sx={{ pb: 2 }}>
        <SectionHeading
          label={"Characters"}
          action={
            <Button
              color={"inherit"}
              variant={"outlined"}
              sx={{ ml: 1 }}
              onClick={() => setAddCharacterDialogOpen(true)}
            >
              Add a Character
            </Button>
          }
        />
        <Container maxWidth={false}>
          <Grid container spacing={2}>
            {Object.keys(characters).map((characterId) => (
              <Grid item xs={12} lg={6} key={characterId}>
                <CharacterCard
                  characterId={characterId}
                  uid={characters[characterId].uid}
                  character={characters[characterId]}
                />
              </Grid>
            ))}
          </Grid>
        </Container>

        <SharedAssetSection />

        {campaignType !== CampaignType.Solo && (
          <>
            <SectionHeading
              label={"Players"}
              action={
                <Button
                  variant={"outlined"}
                  color={"inherit"}
                  onClick={copyLinkToClipboard}
                >
                  Invite Players
                </Button>
              }
            />
            <Container maxWidth={false}>
              <Grid container spacing={2}>
                {(users ?? []).map((userId) => (
                  <Grid item xs={12} sm={6} md={4} key={userId}>
                    <UserCard uid={userId} />
                  </Grid>
                ))}
              </Grid>
            </Container>
          </>
        )}
      </Stack>

      <AddCharacterDialog
        open={addCharacterDialogOpen}
        handleClose={() => setAddCharacterDialogOpen(false)}
        campaignId={campaignId}
      />
    </>
  );
}
