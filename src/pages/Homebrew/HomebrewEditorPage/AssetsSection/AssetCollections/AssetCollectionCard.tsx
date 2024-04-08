import { Box, Typography } from "@mui/material";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { useStore } from "stores/store";
import { StoredHomebrewAssetCollection } from "types/homebrew/HomebrewAssets.type";

export interface AssetCollectionCardProps {
  collection: StoredHomebrewAssetCollection;
}

export function AssetCollectionCard(props: AssetCollectionCardProps) {
  const { collection } = props;

  const assetCollectionMap = useStore(
    (store) => store.rules.assetMaps.assetCollectionMap
  );

  return (
    <>
      <Box alignSelf={"start"}>
        <Typography variant={"overline"} color={"textSecondary"}>
          Category
        </Typography>
        <Typography variant={"h6"}>{collection.label}</Typography>
        {collection.replacesId && (
          <Typography color={"textSecondary"}>
            Replaces &quot;
            {assetCollectionMap[collection.replacesId]?.name ??
              collection.replacesId}
            &quot;
          </Typography>
        )}
        {collection.enhancesId && (
          <Typography color={"textSecondary"}>
            Enhances &quot;
            {assetCollectionMap[collection.enhancesId]?.name ??
              collection.enhancesId}
            &quot;
          </Typography>
        )}
      </Box>
      <ChevronRight color={"action"} />
    </>
  );
}
