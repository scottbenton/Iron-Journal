import { Box, Card, Stack, SxProps, Theme } from "@mui/material";
import { AssetDocument } from "api-calls/assets/_asset.type";
import { useStore } from "stores/store";
import { AssetOptions } from "./AssetOptions";
import { AssetAbilities } from "./AssetAbilities";
import { AssetControls } from "./AssetControls";
import { AssetHeader } from "./AssetHeader";
import { AssetNameAndDescription } from "./AssetNameAndDescription";
import { ForwardedRef, ReactNode, forwardRef } from "react";
import { Datasworn } from "@datasworn/core";
import { idMap } from "data/idMap";

export interface AssetCardProps {
  assetId: string;
  storedAsset?: AssetDocument;
  actions?: ReactNode;

  onAssetRemove?: () => void;
  onAssetAbilityToggle?: (abilityIndex: number, checked: boolean) => void;
  onAssetOptionChange?: (assetOptionKey: string, value: string) => void;
  onAssetControlChange?: (
    controlKey: string,
    value: boolean | string | number
  ) => void;

  showSharedIcon?: boolean;
  sx?: SxProps<Theme>;
}

const AssetCardComponent = (
  props: AssetCardProps,
  ref: ForwardedRef<HTMLDivElement>
) => {
  const {
    assetId,
    storedAsset,
    actions,
    onAssetRemove,
    onAssetAbilityToggle,
    onAssetOptionChange,
    onAssetControlChange,
    showSharedIcon,
    sx,
  } = props;

  const updatedId = idMap[assetId] ?? assetId;
  const assetMap = useStore((store) => store.rules.assetMaps.assetMap);
  const compatibilityExpansionIds = useStore((store) => store.rules.compatibilityExpansionIds);

  const asset = assetMap[updatedId];

  if (!asset) {
    return null;
  }

  const assetControls: Record<
    string,
    Datasworn.AssetControlField | Datasworn.AssetAbilityControlField
  > = { ...asset.controls };
  const assetOptions = { ...asset.options };

  asset.abilities.forEach((ability, index) => {
    const isEnabled = ability.enabled || storedAsset?.enabledAbilities[index];

    if (isEnabled) {
      const controls = ability.controls ?? {};
      const options = ability.options ?? {};
      Object.keys(controls).forEach((controlKey) => {
        assetControls[controlKey] = controls[controlKey];
      });
      Object.keys(options).forEach((optionKey) => {
        assetOptions[optionKey] = options[optionKey];
      });

      const enhanceControls = ability.enhance_asset?.controls ?? {};
      Object.keys(enhanceControls).forEach((controlKey) => {
        const enhancement = enhanceControls[controlKey];
        const assetControl = assetControls[controlKey];
        if (assetControl?.field_type === enhancement.field_type) {
          assetControls[controlKey] = {
            ...assetControl,
            ...(enhancement as Partial<typeof assetControl>),
          };
        }
      });
    }
  });

  return (
    <Card
      ref={ref}
      variant={"outlined"}
      sx={{
        position: "relative",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderWidth: 0,
        ...sx,
      }}
    >
      <AssetHeader asset={asset} onAssetRemove={onAssetRemove} />
      <Box
        flexGrow={1}
        display={"flex"}
        flexDirection={"column"}
        p={1}
        border={(theme) => `1px solid ${theme.palette.divider}`}
        sx={(theme) => ({
          borderBottomLeftRadius: theme.shape.borderRadius,
          borderBottomRightRadius: theme.shape.borderRadius,
        })}
      >
        <AssetNameAndDescription
          asset={asset}
          compatibilityExpansionIds={compatibilityExpansionIds}
          showSharedIcon={showSharedIcon}
        />
        <AssetOptions
          options={assetOptions}
          storedAsset={storedAsset}
          onAssetOptionChange={onAssetOptionChange}
        />
        <AssetAbilities
          asset={asset}
          compatibilityExpansionIds={compatibilityExpansionIds}
          storedAsset={storedAsset}
          onAbilityToggle={onAssetAbilityToggle}
        />
        <AssetControls
          controls={assetControls}
          storedAsset={storedAsset}
          onControlChange={onAssetControlChange}
        />
        {actions && (
          <Stack
            direction={"row"}
            spacing={1}
            mt={2}
            justifyContent={"flex-end"}
          >
            {actions}
          </Stack>
        )}
      </Box>
    </Card>
  );
};

export const AssetCard = forwardRef<HTMLDivElement, AssetCardProps>(
  AssetCardComponent
);
