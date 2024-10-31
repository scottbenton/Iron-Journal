import { AssetCard } from "../AssetCard/AssetCard";
import { LoadingButton } from "@mui/lab";
import { useEffect, useRef, useState } from "react";

export interface AssetCardDialogCardProps {
  assetId: string;
  selectAsset: () => void;
  searched: boolean;
  clearSearched: () => void;
  loading?: boolean;
  selectLabel?: string;
  disabled?: boolean;
}

export function AssetCardDialogCard(props: AssetCardDialogCardProps) {
  const { assetId, selectAsset, searched, clearSearched, loading, selectLabel, disabled = false } = props;

  const assetRef = useRef<HTMLDivElement | null>(null);

  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    if (!loading) {
      setButtonLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    if (searched) {
      assetRef.current?.scrollIntoView({ behavior: "smooth" });
      clearSearched();
    }
  }, [clearSearched, searched]);

  return (
    <AssetCard
      ref={assetRef}
      assetId={assetId}
      showSharedIcon
      actions={
        <LoadingButton
          color={"inherit"}
          onClick={() => {
            setButtonLoading(true);
            selectAsset()
          }}
          loading={buttonLoading}
          variant={"contained"}
          sx={{
            width: "40%",
            boxShadow: "none",
            ":hover": {
              boxShadow: "none",
            }
          }}
        >
          {selectLabel ?? "Select"}
        </LoadingButton>
      }
      sx={{
        filter: disabled ? "grayscale(30%) opacity(70%)" : undefined
      }}
    />
  );
}
