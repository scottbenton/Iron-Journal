import {
  Box,
  Breadcrumbs,
  Button,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { SectionHeading } from "components/shared/SectionHeading";
import { useState } from "react";
import { AssetCollectionsList } from "./AssetCollections/AssetCollectionsList";
import { AssetCollectionDialog } from "./AssetCollections/AssetCollectionDialog";
import { useStore } from "stores/store";
import { MarkdownRenderer } from "components/shared/MarkdownRenderer";
import { AssetDialog } from "./Assets/AssetDialog";
import { useConfirm } from "material-ui-confirm";
import { AssetPreviewCard } from "./AssetPreviewCard";
import { MoveAssetDialog } from "./Assets/MoveAssetDialog";

export interface AssetsSectionProps {
  homebrewId: string;
}

export function AssetsSection(props: AssetsSectionProps) {
  const { homebrewId } = props;

  const [assetCollectionDialogState, setAssetCollectionDialogState] = useState<{
    open: boolean;
    collectionId?: string;
  }>({ open: false });
  const [assetDialogState, setAssetDialogState] = useState<{
    open: boolean;
    assetId?: string;
  }>({ open: false });
  const [moveAssetDialogState, setMoveAssetDialogState] = useState<{
    assetId: string;
    assetCollectionId: string;
  }>();

  const assetCollections = useStore(
    (store) =>
      store.homebrew.collections[homebrewId]?.assetCollections?.data ?? {}
  );

  const assets = useStore(
    (store) => store.homebrew.collections[homebrewId]?.assets?.data ?? {}
  );
  const [openCollectionKey, setOpenCollectionKey] = useState<string>();
  const openCollection =
    assetCollections && openCollectionKey
      ? assetCollections[openCollectionKey]
      : undefined;

  const filteredAssetIds = Object.keys(assets).filter(
    (assetKey) => assets[assetKey].categoryKey === openCollectionKey
  );

  const confirm = useConfirm();

  const deleteAssetCollection = useStore(
    (store) => store.homebrew.deleteAssetCollection
  );
  const handleDeleteAssetCollection = (
    collectionName: string,
    collectionId: string
  ) => {
    confirm({
      title: `Delete ${collectionName}`,
      description:
        "Are you sure you want to delete this asset collection? This will also delete the assets under this collection. This cannot be undone.",
      confirmationText: "Delete",
      confirmationButtonProps: {
        variant: "contained",
        color: "error",
      },
    })
      .then(() => {
        setOpenCollectionKey(undefined);
        deleteAssetCollection(homebrewId, collectionId).catch(() => {});
      })
      .catch(() => {});
  };
  const deleteAsset = useStore((store) => store.homebrew.deleteAsset);
  const handleDeleteAsset = (assetName: string, assetId: string) => {
    confirm({
      title: `Delete ${assetName}`,
      description:
        "Are you sure you want to delete this asset? This cannot be undone.",
      confirmationText: "Delete",
      confirmationButtonProps: {
        variant: "contained",
        color: "error",
      },
    })
      .then(() => {
        deleteAsset(assetId).catch(() => {});
      })
      .catch(() => {});
  };

  return (
    <Stack spacing={2} mt={2}>
      {openCollectionKey && openCollection ? (
        <>
          <Breadcrumbs>
            <Link
              component={"button"}
              underline="hover"
              color="inherit"
              sx={{ lineHeight: "1rem" }}
              onClick={() => setOpenCollectionKey(undefined)}
            >
              Asset Collections
            </Link>
            <Typography color="text.primary">{openCollection.label}</Typography>
          </Breadcrumbs>
          <SectionHeading
            label={"Collection Info"}
            floating
            action={
              <>
                <Button
                  color={"error"}
                  onClick={() =>
                    handleDeleteAssetCollection(
                      assetCollections[openCollectionKey].label,
                      openCollectionKey
                    )
                  }
                >
                  Delete Collection
                </Button>
                <Button
                  color={"inherit"}
                  onClick={() =>
                    setAssetCollectionDialogState({
                      open: true,
                      collectionId: openCollectionKey,
                    })
                  }
                  variant={"outlined"}
                >
                  Edit Collection
                </Button>
              </>
            }
          />
          {openCollection.description && (
            <MarkdownRenderer markdown={openCollection.description} />
          )}
          <SectionHeading
            label={"Collection Assets"}
            floating
            action={
              <Button
                color={"inherit"}
                onClick={() =>
                  setAssetDialogState({
                    open: true,
                  })
                }
              >
                Create Asset
              </Button>
            }
          />
          <Box
            display={"grid"}
            gridTemplateColumns={{
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
              xl: "repeat(4, 1fr)",
            }}
            gap={2}
          >
            {filteredAssetIds.map((assetKey) => (
              <AssetPreviewCard
                key={assetKey}
                storedAsset={assets[assetKey]}
                collectionName={assetCollections[openCollectionKey].label}
                handleDeleteAsset={() =>
                  handleDeleteAsset(assets[assetKey].label, assetKey)
                }
                handleEditAsset={() =>
                  setAssetDialogState({ open: true, assetId: assetKey })
                }
                handleMoveAsset={() =>
                  setMoveAssetDialogState({
                    assetId: assetKey,
                    assetCollectionId: assets[assetKey].categoryKey,
                  })
                }
              />
            ))}
          </Box>
        </>
      ) : (
        <>
          <SectionHeading
            label={"Homebrew Asset Collections"}
            floating
            action={
              <Button
                variant={"outlined"}
                color={"inherit"}
                onClick={() => setAssetCollectionDialogState({ open: true })}
              >
                Add Asset Collection
              </Button>
            }
          />
          <AssetCollectionsList
            homebrewId={homebrewId}
            openCreateAssetCollectionDialog={() =>
              setAssetCollectionDialogState({ open: true })
            }
            setOpenCollection={setOpenCollectionKey}
          />
        </>
      )}
      <AssetCollectionDialog
        open={assetCollectionDialogState.open}
        onClose={() => setAssetCollectionDialogState({ open: false })}
        homebrewId={homebrewId}
        existingAssetCollectionId={assetCollectionDialogState.collectionId}
      />
      {openCollectionKey && (
        <AssetDialog
          open={assetDialogState.open}
          onClose={() => setAssetDialogState({ open: false })}
          homebrewId={homebrewId}
          categoryId={openCollectionKey}
          existingAssetId={assetDialogState.assetId}
        />
      )}
      <MoveAssetDialog
        state={moveAssetDialogState}
        onClose={() => setMoveAssetDialogState(undefined)}
        collections={assetCollections}
      />
    </Stack>
  );
}
