import { Button, List, ListItem, ListItemButton } from "@mui/material";
import { EmptyState } from "components/shared/EmptyState";
import { useStore } from "stores/store";
import { AssetCollectionCard } from "./AssetCollectionCard";

export interface AssetCollectionsListProps {
  homebrewId: string;
  openCreateAssetCollectionDialog: () => void;
  setOpenCollection: (collectionKey: string) => void;
  isEditor: boolean;
}

export function AssetCollectionsList(props: AssetCollectionsListProps) {
  const {
    homebrewId,
    openCreateAssetCollectionDialog,
    setOpenCollection,
    isEditor,
  } = props;

  const collections = useStore(
    (store) =>
      store.homebrew.collections[homebrewId]?.assetCollections?.data ?? {}
  );
  const collectionsLoading = useStore(
    (store) => !store.homebrew.collections[homebrewId]?.assetCollections?.loaded
  );

  if (collectionsLoading) return <>Loading...</>;

  if (Object.keys(collections).length === 0) {
    return (
      <EmptyState
        sx={{ mt: 2 }}
        message={"No asset collections found"}
        callToAction={
          isEditor && (
            <Button
              variant={"outlined"}
              color={"inherit"}
              onClick={openCreateAssetCollectionDialog}
            >
              Add Asset Collection
            </Button>
          )
        }
      />
    );
  }

  return (
    <List
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        gap: 2,
        pl: 0,
        my: 0,
        listStyle: "none",
      }}
    >
      {Object.keys(collections)
        .sort((c1, c2) =>
          collections[c1].label.localeCompare(collections[c2].label)
        )
        .map((collectionKey) => (
          <ListItem
            key={collectionKey}
            sx={(theme) => ({
              gridColumn: { xs: "span 12", sm: "span 6", md: "span 4" },
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 1,
            })}
            disablePadding
          >
            <ListItemButton
              onClick={() => setOpenCollection(collectionKey)}
              sx={{
                px: 2,
                py: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <AssetCollectionCard collection={collections[collectionKey]} />
            </ListItemButton>
          </ListItem>
        ))}
    </List>
  );
}
