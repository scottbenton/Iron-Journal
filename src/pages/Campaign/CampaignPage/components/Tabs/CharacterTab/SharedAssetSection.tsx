import {
  Box,
  Button,
  Container,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import { AssetDocument } from "api-calls/assets/_asset.type";
import { AssetCard } from "components/features/assets/AssetCard";
import { AssetCardDialog } from "components/features/assets/AssetCardDialog";
import { SectionHeading } from "components/shared/SectionHeading";
import { useGameSystem } from "hooks/useGameSystem";
import { useConfirm } from "material-ui-confirm";
import { useState } from "react";
import { useStore } from "stores/store";
import { GAME_SYSTEMS } from "types/GameSystems.type";

export function SharedAssetSection() {
  const isStarforged = useGameSystem().gameSystem === GAME_SYSTEMS.STARFORGED;

  const [isAssetDialogOpen, setIsAssetDialogOpen] = useState<boolean>(false);

  const sharedAssets = useStore(
    (store) => store.campaigns.currentCampaign.assets.assets
  );
  const sortedSharedAssetKeys = Object.keys(sharedAssets).sort(
    (k1, k2) => sharedAssets[k1].order - sharedAssets[k2].order
  );
  const nextSharedAssetIndex =
    sortedSharedAssetKeys.length > 0
      ? (sharedAssets[sortedSharedAssetKeys[sortedSharedAssetKeys.length - 1]]
          .order ?? 0) + 1
      : 0;

  const sharedAssetsLoading = useStore(
    (store) => store.characters.currentCharacter.assets.loading
  );
  const addSharedAsset = useStore(
    (store) => store.campaigns.currentCampaign.assets.addAsset
  );
  const removeSharedAsset = useStore(
    (store) => store.campaigns.currentCampaign.assets.removeAsset
  );
  const updateSharedAssetCheckbox = useStore(
    (store) => store.campaigns.currentCampaign.assets.updateAssetCheckbox
  );
  const updateSharedAssetOption = useStore(
    (store) => store.campaigns.currentCampaign.assets.updateAssetOption
  );
  const updateSharedAssetControl = useStore(
    (store) => store.campaigns.currentCampaign.assets.updateAssetControl
  );

  const [addAssetLoading, setAddAssetLoading] = useState(false);

  const handleAssetAdd = (asset: AssetDocument) => {
    setAddAssetLoading(true);
    addSharedAsset(asset)
      .catch(() => {})
      .finally(() => {
        setIsAssetDialogOpen(false);
        setAddAssetLoading(false);
      });
  };

  const confirm = useConfirm();

  const handleClick = (assetId: string) => {
    confirm({
      title: "Delete Asset",
      description: "Are you sure you want to remove this asset?",
      confirmationText: "Delete",
      confirmationButtonProps: {
        variant: "contained",
        color: "error",
      },
    })
      .then(() => {
        removeSharedAsset(assetId).catch(() => {});
      })
      .catch(() => {});
  };

  if (!isStarforged) return null;

  return (
    <>
      <SectionHeading
        label={"Shared Assets"}
        action={
          <Button
            variant={"outlined"}
            color={"inherit"}
            onClick={() => setIsAssetDialogOpen(true)}
          >
            Add Shared Asset
          </Button>
        }
      />
      <Container maxWidth={false}>
        {sortedSharedAssetKeys.length > 0 ? (
          <Grid container spacing={2}>
            {sortedSharedAssetKeys.map((assetId, index) => (
              <Grid
                key={index}
                item
                xs={12}
                lg={6}
                xl={4}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <AssetCard
                  assetId={sharedAssets[assetId].id}
                  storedAsset={sharedAssets[assetId]}
                  onAssetRemove={() => handleClick(assetId)}
                  onAssetAbilityToggle={(abilityIndex, checked) =>
                    updateSharedAssetCheckbox(assetId, abilityIndex, checked)
                  }
                  onAssetOptionChange={(optionKey, value) =>
                    updateSharedAssetOption(assetId, optionKey, value)
                  }
                  onAssetControlChange={(controlKey, value) =>
                    updateSharedAssetControl(assetId, controlKey, value)
                  }
                />
              </Grid>
            ))}
          </Grid>
        ) : sharedAssetsLoading ? (
          <LinearProgress sx={{ mb: 4 }} />
        ) : (
          <Box p={2} pb={4} display={"flex"} justifyContent={"center"}>
            <Typography>No Assets Found</Typography>
          </Box>
        )}
      </Container>
      <AssetCardDialog
        open={isAssetDialogOpen}
        loading={addAssetLoading}
        handleClose={() => setIsAssetDialogOpen(false)}
        handleAssetSelection={(asset) =>
          handleAssetAdd({
            ...asset,
            order: nextSharedAssetIndex,
          })
        }
      />
    </>
  );
}
