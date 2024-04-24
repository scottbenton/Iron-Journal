import { LoadingButton } from "@mui/lab";
import { Box, Button } from "@mui/material";
import { MarkdownRenderer } from "components/shared/MarkdownRenderer";
import { SectionHeading } from "components/shared/SectionHeading";
import { useConfirm } from "material-ui-confirm";
import { useState } from "react";
import { useStore } from "stores/store";
import { StoredOracleCollection } from "types/homebrew/HomebrewOracles.type";
import { MoveOracleCollectionDialog } from "./OracleCollectionsSection/MoveOracleCollectionDialog";

export interface OracleInfoSectionProps {
  homebrewId: string;
  oracleCollectionId: string;
  oracleCollection: StoredOracleCollection;
  oracleCollections: Record<string, StoredOracleCollection>;
  openCollectionDialog: () => void;
  closeCurrentOracleCollection: () => void;
}

export function OracleInfoSection(props: OracleInfoSectionProps) {
  const {
    homebrewId,
    oracleCollectionId,
    oracleCollection,
    oracleCollections,
    openCollectionDialog,
    closeCurrentOracleCollection,
  } = props;

  const deleteOracleCollection = useStore(
    (store) => store.homebrew.deleteOracleCollection
  );

  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const confirm = useConfirm();
  const handleDelete = () => {
    confirm({
      title: `Delete ${oracleCollection.label}`,
      description:
        "Are you sure you want to delete this oracle collection? This will also delete the oracles and collections under this category. This cannot be undone.",
      confirmationText: "Delete",
      confirmationButtonProps: {
        variant: "contained",
        color: "error",
      },
    })
      .then(() => {
        setIsDeleteLoading(true);
        deleteOracleCollection(homebrewId, oracleCollectionId)
          .then(() => {
            closeCurrentOracleCollection();
          })
          .catch(() => {})
          .finally(() => {
            setIsDeleteLoading(false);
          });
      })
      .catch(() => {});
  };

  const [moveCollectionDialogOpen, setMoveCollectionDialogOpen] =
    useState(false);

  return (
    <>
      <SectionHeading
        label={oracleCollection.label}
        action={
          <>
            <LoadingButton
              color={"error"}
              onClick={handleDelete}
              loading={isDeleteLoading}
            >
              Delete Collection
            </LoadingButton>
            <Button
              color={"inherit"}
              onClick={() => setMoveCollectionDialogOpen(true)}
            >
              Move Collection
            </Button>
            <Button
              color={"inherit"}
              variant={"outlined"}
              onClick={openCollectionDialog}
            >
              Edit Collection
            </Button>
          </>
        }
        floating
      />
      {oracleCollection.description ? (
        <Box px={2}>
          <MarkdownRenderer markdown={oracleCollection.description} />
        </Box>
      ) : null}
      <MoveOracleCollectionDialog
        open={moveCollectionDialogOpen}
        onClose={() => setMoveCollectionDialogOpen(false)}
        oracleCollectionId={oracleCollectionId}
        oracleCollections={oracleCollections}
        parentOracleCollectionId={oracleCollection.parentOracleCollectionId}
      />
    </>
  );
}
