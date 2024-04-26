import { Button } from "@mui/material";
import { SectionHeading } from "components/shared/SectionHeading";
import { OracleTablesCollectionCard } from "./OracleTablesCollectionCard";
import { EmptyState } from "components/shared/EmptyState";
import { StoredOracleCollection } from "types/homebrew/HomebrewOracles.type";

export interface OracleCollectionsSectionProps {
  openCollectionId?: string;
  oracleCollections: Record<string, StoredOracleCollection>;
  openCollection: (collectionId: string) => void;
  openCreateCollectionDialog: () => void;
  isEditor: boolean;
}

export function OracleCollectionsSection(props: OracleCollectionsSectionProps) {
  const {
    openCollectionId,
    oracleCollections,
    openCollection,
    openCreateCollectionDialog,
    isEditor,
  } = props;

  const filteredCollectionIds = Object.keys(oracleCollections).filter(
    (collectionKey) =>
      oracleCollections[collectionKey].parentOracleCollectionId ===
      openCollectionId
  );

  const sortedCollectionIds = filteredCollectionIds.sort((k1, k2) =>
    oracleCollections[k1].label.localeCompare(oracleCollections[k2].label)
  );

  return (
    <>
      <SectionHeading
        label={"Collections"}
        action={
          isEditor && (
            <Button color={"inherit"} onClick={openCreateCollectionDialog}>
              Create Collection
            </Button>
          )
        }
        floating
      />
      {sortedCollectionIds.length === 0 && (
        <EmptyState
          message={
            isEditor
              ? "No oracle collections found"
              : "Add an oracle collection to group your tables together"
          }
          callToAction={
            isEditor && (
              <Button
                variant="outlined"
                color={"inherit"}
                onClick={openCreateCollectionDialog}
              >
                Create Collection
              </Button>
            )
          }
        />
      )}
      {sortedCollectionIds.map((id) => (
        <OracleTablesCollectionCard
          key={id}
          oracle={oracleCollections[id]}
          onClick={() => (oracleCollections[id] ? openCollection(id) : {})}
        />
      ))}
    </>
  );
}
