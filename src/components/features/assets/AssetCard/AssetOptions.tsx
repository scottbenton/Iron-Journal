import { Datasworn } from "@datasworn/core";
import { AssetOption } from "./AssetOption";
import { Stack } from "@mui/material";
import { AssetDocument } from "api-calls/assets/_asset.type";

export interface AssetOptionsProps {
  asset: Datasworn.Asset;
  storedAsset?: AssetDocument;

  onAssetOptionChange?: (assetOptionKey: string, value: string) => void;
}

export function AssetOptions(props: AssetOptionsProps) {
  const { asset, storedAsset, onAssetOptionChange } = props;

  const assetOptions = asset.options;

  if (!assetOptions) {
    return null;
  }

  return (
    <Stack spacing={1} mt={0.5}>
      {Object.keys(assetOptions)
        .sort((o1, o2) => {
          const option1 = assetOptions[o1];
          const option2 = assetOptions[o2];

          return option1.label.localeCompare(option2.label);
        })
        .map((assetOptionKey) => (
          <AssetOption
            storedAsset={storedAsset}
            key={assetOptionKey}
            assetOptionKey={assetOptionKey}
            assetOption={assetOptions[assetOptionKey]}
            onAssetOptionChange={onAssetOptionChange}
          />
        ))}
    </Stack>
  );
}
