import { useGameSystem } from "hooks/useGameSystem";
import { SidebarHeading } from "../TracksPanel/SidebarHeading";
import { GAME_SYSTEMS } from "types/GameSystems.type";
import { useStore } from "stores/store";
import { useState } from "react";
import { AssetDocument } from "api-calls/assets/_asset.type";
import { useConfirm } from "material-ui-confirm";
import { Box, Button, LinearProgress, Stack, Typography } from "@mui/material";
import { AssetCard } from "components/features/assets/AssetCard";
import { AssetCardDialog } from "components/features/assets/AssetCardDialog";

export function AssetsPanel() {
  const isStarforged = useGameSystem().gameSystem === GAME_SYSTEMS.STARFORGED;

  const isInCampaign = useStore(
    (store) => !!store.characters.currentCharacter.currentCharacter?.campaignId
  );

  const assets = useStore(
    (store) => store.characters.currentCharacter.assets.assets ?? {}
  );
  const sortedAssetKeys = Object.keys(assets).sort(
    (k1, k2) => assets[k1].order - assets[k2].order
  );
  const nextAssetIndex =
    sortedAssetKeys.length > 0
      ? (assets[sortedAssetKeys[sortedAssetKeys.length - 1]].order ?? 0) + 1
      : 0;

  const assetsLoading = useStore(
    (store) => store.characters.currentCharacter.assets.loading
  );
  const addAsset = useStore(
    (store) => store.characters.currentCharacter.assets.addAsset
  );
  const removeAsset = useStore(
    (store) => store.characters.currentCharacter.assets.removeAsset
  );
  const updateAssetCheckbox = useStore(
    (store) => store.characters.currentCharacter.assets.updateAssetCheckbox
  );

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

  const [addAssetLoading, setAddAssetLoading] = useState(false);

  const [isAssetDialogOpen, setIsAssetDialogOpen] = useState<{
    open: boolean;
    addToCampaign?: boolean;
  }>({ open: false });

  const handleAssetAdd = (asset: AssetDocument) => {
    const shouldAddToCampaign = isAssetDialogOpen.addToCampaign;
    setAddAssetLoading(true);
    const promise = shouldAddToCampaign
      ? addSharedAsset(asset)
      : addAsset(asset);
    promise
      .catch(() => {})
      .finally(() => {
        setIsAssetDialogOpen({ open: false });
        setAddAssetLoading(false);
      });
  };

  const confirm = useConfirm();

  const handleClick = (assetId: string, isShared: boolean) => {
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
        if (isShared) {
          removeSharedAsset(assetId).catch(() => {});
        } else {
          removeAsset(assetId).catch(() => {});
        }
      })
      .catch(() => {});
  };

  const updateAssetOption = useStore(
    (store) => store.characters.currentCharacter.assets.updateAssetOption
  );
  const updateAssetControl = useStore(
    (store) => store.characters.currentCharacter.assets.updateAssetControl
  );
  const updateSharedAssetOption = useStore(
    (store) => store.campaigns.currentCampaign.assets.updateAssetOption
  );
  const updateSharedAssetControl = useStore(
    (store) => store.campaigns.currentCampaign.assets.updateAssetControl
  );
  return (
    <>
      {isInCampaign && isStarforged && (
        <>
          <SidebarHeading
            label={"Shared Assets"}
            action={
              <Button
                variant={"outlined"}
                color={"inherit"}
                onClick={() =>
                  setIsAssetDialogOpen({ open: true, addToCampaign: true })
                }
              >
                Add Shared Asset
              </Button>
            }
            sx={{ mb: 2 }}
          />
          {sortedSharedAssetKeys.length > 0 ? (
            <Stack spacing={2}>
              {sortedSharedAssetKeys.map((assetId, index) => (
                <AssetCard
                  key={index}
                  assetId={sharedAssets[assetId].id}
                  storedAsset={sharedAssets[assetId]}
                  onAssetRemove={() => handleClick(assetId, true)}
                  onAssetAbilityToggle={(abilityIndex, checked) =>
                    updateSharedAssetCheckbox(assetId, abilityIndex, checked)
                  }
                  onAssetOptionChange={(optionKey, value) =>
                    updateSharedAssetOption(assetId, optionKey, value)
                  }
                  onAssetControlChange={(controlKey, value) =>
                    updateSharedAssetControl(assetId, controlKey, value)
                  }
                  sx={{
                    minHeight: 450,
                    width: "100%",
                  }}
                />
              ))}
            </Stack>
          ) : sharedAssetsLoading ? (
            <LinearProgress sx={{ mb: 4 }} />
          ) : (
            <Box pb={4} display={"flex"} justifyContent={"center"}>
              <Typography>No Assets Found</Typography>
            </Box>
          )}
        </>
      )}
      <SidebarHeading
        label={"Character Assets"}
        action={
          <Button
            variant={"outlined"}
            color={"inherit"}
            onClick={() => setIsAssetDialogOpen({ open: true })}
          >
            Add Asset
          </Button>
        }
        sx={{ mb: 2 }}
      />
      {sortedAssetKeys.length > 0 ? (
        <Stack spacing={2}>
          {sortedAssetKeys.map((assetId, index) => (
            <AssetCard
              key={index}
              assetId={assets[assetId].id}
              storedAsset={assets[assetId]}
              onAssetRemove={() => handleClick(assetId, false)}
              onAssetAbilityToggle={(abilityIndex, checked) =>
                updateAssetCheckbox(assetId, abilityIndex, checked)
              }
              onAssetOptionChange={(optionKey, value) =>
                updateAssetOption(assetId, optionKey, value)
              }
              onAssetControlChange={(controlKey, value) =>
                updateAssetControl(assetId, controlKey, value)
              }
              sx={{
                minHeight: 450,
                width: "100%",
              }}
            />
          ))}
        </Stack>
      ) : assetsLoading ? (
        <LinearProgress sx={{ mb: 4 }} />
      ) : (
        <Box display={"flex"} justifyContent={"center"}>
          <Typography>No Assets Found</Typography>
        </Box>
      )}
      <AssetCardDialog
        open={isAssetDialogOpen.open}
        loading={addAssetLoading}
        handleClose={() => setIsAssetDialogOpen({ open: false })}
        handleAssetSelection={(asset) =>
          handleAssetAdd({
            ...asset,
            order: isAssetDialogOpen.addToCampaign
              ? nextSharedAssetIndex
              : nextAssetIndex,
          })
        }
      />
    </>
  );
}
