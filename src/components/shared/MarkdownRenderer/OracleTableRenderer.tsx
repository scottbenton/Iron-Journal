import { Datasworn } from "@datasworn/core";
import { OracleCollection } from "components/features/charactersAndCampaigns/LinkedDialog/LinkedDialogContent/NewOracleDialogContent/OracleCollection";
import { OracleRollableTable } from "components/features/charactersAndCampaigns/LinkedDialog/LinkedDialogContent/NewOracleDialogContent/OracleRollableTable";
import { OracleTableSharedResults } from "components/features/charactersAndCampaigns/LinkedDialog/LinkedDialogContent/NewOracleDialogContent/OracleTableSharedResults";
import { OracleTableSharedRolls } from "components/features/charactersAndCampaigns/LinkedDialog/LinkedDialogContent/NewOracleDialogContent/OracleTableSharedRolls";

export interface OracleTableRendererProps {
  oracle: Datasworn.OracleCollection | Datasworn.OracleRollable;
}

export function OracleTableRenderer(props: OracleTableRendererProps) {
  const { oracle } = props;

  if (
    oracle.oracle_type === "table_text" ||
    oracle.oracle_type === "table_text2" ||
    oracle.oracle_type === "table_text3"
  ) {
    return <OracleRollableTable oracle={oracle} />;
  } else if (oracle.oracle_type === "table_shared_rolls") {
    return <OracleTableSharedRolls oracle={oracle} />;
  } else if (
    oracle.oracle_type === "table_shared_text" ||
    oracle.oracle_type === "table_shared_text2" ||
    oracle.oracle_type === "table_shared_text3"
  ) {
    return <OracleTableSharedResults oracle={oracle} />;
  } else if (oracle.oracle_type === "tables") {
    return <OracleCollection collection={oracle} />;
  }
  return null;
}
