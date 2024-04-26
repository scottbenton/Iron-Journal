import { LinearProgress } from "@mui/material";
import { SectionWithSidebar } from "components/shared/Layout/SectionWithSidebar";
import { useStore } from "stores/store";
import { ExampleOracles } from "./ExampleOracles";
import { OracleEditorPane } from "./OracleEditorPane";

export interface OracleSectionProps {
  id: string;
  isEditor: boolean;
}

export function OracleSection(props: OracleSectionProps) {
  const { id, isEditor } = props;

  const oracleCollections = useStore(
    (store) => store.homebrew.collections[id].oracleCollections?.data ?? {}
  );
  const oracleCollectionsLoading = useStore(
    (store) => !store.homebrew.collections[id].oracleCollections?.loaded
  );

  const oracleTables = useStore(
    (store) => store.homebrew.collections[id].oracleTables?.data ?? {}
  );
  const oracleTablesLoading = useStore(
    (store) => !store.homebrew.collections[id].oracleTables?.loaded
  );

  if (oracleCollectionsLoading || oracleTablesLoading) {
    return <LinearProgress sx={{ mx: { xs: -2, sm: -3 } }} />;
  }

  return (
    <SectionWithSidebar
      sx={{ mt: 2 }}
      sidebar={<ExampleOracles />}
      mainContent={
        <OracleEditorPane
          homebrewId={id}
          oracleCollections={oracleCollections}
          oracleTables={oracleTables}
          isEditor={isEditor}
        />
      }
    />
  );
}
