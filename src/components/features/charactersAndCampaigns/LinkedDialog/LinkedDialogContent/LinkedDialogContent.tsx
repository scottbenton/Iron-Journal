import { DialogContent } from "@mui/material";
import { LinkedDialogContentTitle } from "./LinkedDialogContentTitle";
import { NewOracleDialogContent } from "./NewOracleDialogContent";
import { NewMoveDialogContent } from "./NewMoveDialogContent";
import { AssetDialogContent } from "./AssetDialogContent";

export interface LinkedDialogContentProps {
  id?: string;
  handleBack: () => void;
  handleClose: () => void;
  isLastItem: boolean;
}

export function LinkedDialogContent(props: LinkedDialogContentProps) {
  const { id, handleBack, handleClose, isLastItem } = props;

  if (id?.match(/^[^/]*\/moves/)) {
    return (
      <NewMoveDialogContent
        id={id}
        handleBack={handleBack}
        handleClose={handleClose}
        isLastItem={isLastItem}
      />
    );
  }

  if (id?.includes("collections/oracles") || id?.match(/^[^/]*\/oracles/)) {
    return (
      <NewOracleDialogContent
        id={id}
        handleBack={handleBack}
        handleClose={handleClose}
        isLastItem={isLastItem}
      />
    );
  }

  if (id?.match(/^[^/]*\/assets/)) {
    return (
      <AssetDialogContent
        id={id}
        handleBack={handleBack}
        handleClose={handleClose}
        isLastItem={isLastItem}
      />
    );
  }

  return (
    <>
      <LinkedDialogContentTitle
        id={id ?? ""}
        handleBack={handleBack}
        handleClose={handleClose}
        isLastItem={isLastItem}
      >
        Not Supported
      </LinkedDialogContentTitle>
      <DialogContent>
        Sorry. Displaying this item is not yet supported by our application.
      </DialogContent>
    </>
  );
}
