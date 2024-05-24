import { Button, List } from "@mui/material";
import { EmptyState } from "components/shared/EmptyState";
import { SectionHeading } from "components/shared/SectionHeading";
import { useState } from "react";
import { HomebrewOracleTableDocument } from "api-calls/homebrew/oracles/tables/_homebrewOracleTable.type";
import { HomebrewOracleCollectionDocument } from "api-calls/homebrew/oracles/collections/_homebrewOracleCollection.type";
import { OracleTableDialog } from "./OracleTableDialog";
import { OracleTableCard } from "./OracleTableCard";
import { useStore } from "stores/store";

export interface OracleTablesSectionProps {
  homebrewId: string;
  tables: Record<string, HomebrewOracleTableDocument>;
  collections: Record<string, HomebrewOracleCollectionDocument>;
  parentCollectionKey: string;
  ancestorIds: string[];
  isEditor: boolean;
}

export function OracleTablesSection(props: OracleTablesSectionProps) {
  const {
    homebrewId,
    tables,
    collections,
    parentCollectionKey,
    isEditor,
    ancestorIds,
  } = props;

  const openLinkedDialog = useStore((store) => store.appState.openDialog);

  const [oracleTableDialogState, setOracleTableDialogState] = useState<{
    open: boolean;
    editingOracleTableId?: string;
  }>({ open: false });

  const sortedKeys = Object.keys(tables)
    .filter((k) => tables[k].oracleCollectionId === parentCollectionKey)
    .sort((k1, k2) => tables[k1].label.localeCompare(tables[k2].label));

  return (
    <>
      <SectionHeading
        label="Tables"
        action={
          isEditor && (
            <Button
              color={"inherit"}
              onClick={() => setOracleTableDialogState({ open: true })}
            >
              Create Table
            </Button>
          )
        }
        floating
      />

      {sortedKeys.length > 0 ? (
        <List>
          {sortedKeys.map((key) => (
            <OracleTableCard
              key={key}
              oracleId={key}
              oracle={tables[key]}
              onClick={() => {
                if (isEditor) {
                  setOracleTableDialogState({
                    open: true,
                    editingOracleTableId: key,
                  });
                } else {
                  openLinkedDialog(
                    `${homebrewId}/collections/oracles/${ancestorIds.join(
                      "/"
                    )}/${parentCollectionKey}/${key}`
                  );
                }
              }}
              collections={collections}
              isEditor={isEditor}
            />
          ))}
        </List>
      ) : (
        <EmptyState
          message={
            isEditor
              ? "Add an oracle table to get started"
              : "No oracle tables found"
          }
          callToAction={
            isEditor && (
              <Button
                color={"inherit"}
                variant={"outlined"}
                onClick={() => setOracleTableDialogState({ open: true })}
              >
                Create Table
              </Button>
            )
          }
        />
      )}
      <OracleTableDialog
        homebrewId={homebrewId}
        parentCollectionId={parentCollectionKey}
        open={oracleTableDialogState.open}
        onClose={() => setOracleTableDialogState({ open: false })}
        tables={tables}
        editingOracleTableId={oracleTableDialogState.editingOracleTableId}
      />
    </>
  );
}
