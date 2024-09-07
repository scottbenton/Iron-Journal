import { LinkedDialogContentTitle } from "./LinkedDialogContentTitle";
import { Box, DialogContent } from "@mui/material";
import { AssetCard } from "components/features/assets/AssetCard";
import { getAsset } from "data/datasworn";

export interface AssetDialogContentProps {
  id: string;
  handleBack: () => void;
  handleClose: () => void;
  isLastItem: boolean;
}

export function AssetDialogContent(props: AssetDialogContentProps) {
  const { id, handleBack, handleClose, isLastItem } = props;

  const asset = getAsset(id);

  if (!asset) {
    return (
      <>
        <LinkedDialogContentTitle
          id={id}
          handleBack={handleBack}
          handleClose={handleClose}
          isLastItem={isLastItem}
        >
          Asset Not Found
        </LinkedDialogContentTitle>
        <DialogContent>Sorry, we could not find that asset.</DialogContent>
      </>
    );
  }

  return (
    <>
      <LinkedDialogContentTitle
        id={id}
        handleBack={handleBack}
        handleClose={handleClose}
        isLastItem={isLastItem}
      >
        {asset.name}
      </LinkedDialogContentTitle>
      <DialogContent>
        <Box maxWidth={(theme) => theme.spacing(48)} mx={"auto"}>
          <AssetCard assetId={id} />
        </Box>
      </DialogContent>
    </>
  );
}
