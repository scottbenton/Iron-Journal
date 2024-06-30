import { DialogContent, IconButton, Tooltip } from "@mui/material";
import { LinkedDialogContentTitle } from "../LinkedDialogContentTitle";
import PinnedIcon from "@mui/icons-material/PushPin";
import { useStore } from "stores/store";
import { OracleRollableTable } from "./OracleRollableTable";
import { MarkdownRenderer } from "components/shared/MarkdownRenderer";
import { OracleTableSharedRolls } from "./OracleTableSharedRolls";
import { OracleTableSharedResults } from "./OracleTableSharedResults";
import { OracleCollection } from "./OracleCollection";
import { OracleRollableColumn } from "./OracleRollableColumn";
import { OracleButton } from "components/features/charactersAndCampaigns/OracleSection/OracleButton";

export interface OracleDialogContentProps {
  id: string;
  handleBack: () => void;
  handleClose: () => void;
  isLastItem: boolean;
}

export function OracleDialogContent(props: OracleDialogContentProps) {
  const { id, handleBack, handleClose, isLastItem } = props;

  const oracles = useStore((store) => store.rules.oracleMaps.allOraclesMap);
  const oracle = oracles[id];

  const pinnedOracles = useStore((store) => store.settings.pinnedOraclesIds);
  const updatePinnedOracles = useStore(
    (store) => store.settings.togglePinnedOracle
  );

  if (!oracle) {
    return (
      <>
        <LinkedDialogContentTitle
          id={id}
          handleBack={handleBack}
          handleClose={handleClose}
          isLastItem={isLastItem}
        >
          Oracle Not Found
        </LinkedDialogContentTitle>
        <DialogContent>Sorry, we could not find that oracle.</DialogContent>
      </>
    );
  }

  const pinned = !!pinnedOracles[id];

  return (
    <>
      <LinkedDialogContentTitle
        id={id}
        handleBack={handleBack}
        handleClose={handleClose}
        isLastItem={isLastItem}
        actions={
          <Tooltip title={pinned ? "Unpin Oracle" : "Pin Oracle"}>
            <IconButton
              color={pinned ? "primary" : "default"}
              onClick={() => updatePinnedOracles(id, !pinned).catch(() => {})}
            >
              <PinnedIcon />
            </IconButton>
          </Tooltip>
        }
      >
        {oracle.name}
      </LinkedDialogContentTitle>
      <DialogContent>
        {Object.prototype.hasOwnProperty.call(oracle, "summary") ||
          (Object.prototype.hasOwnProperty.call(oracle, "description") && (
            <MarkdownRenderer
              markdown={
                (oracle as { summary?: string }).summary ??
                (oracle as { description?: string }).description ??
                ""
              }
            />
          ))}
        {oracle.oracle_type !== "table_shared_text" &&
          oracle.oracle_type !== "table_shared_text2" &&
          oracle.oracle_type !== "table_shared_text3" &&
          oracle.oracle_type !== "tables" && (
            <OracleButton
              oracleId={id}
              color={"inherit"}
              variant={"outlined"}
              sx={{ mt: 1 }}
            />
          )}
        {(oracle.oracle_type === "table_text" ||
          oracle.oracle_type === "table_text2" ||
          oracle.oracle_type === "table_text3") && (
          <OracleRollableTable oracle={oracle} />
        )}
        {(oracle.oracle_type === "column_text" ||
          oracle.oracle_type === "column_text2" ||
          oracle.oracle_type === "column_text3") && (
          <OracleRollableColumn oracle={oracle} />
        )}
        {oracle.oracle_type === "table_shared_rolls" && (
          <OracleTableSharedRolls oracle={oracle} />
        )}
        {(oracle.oracle_type === "table_shared_text" ||
          oracle.oracle_type === "table_shared_text2") && (
          <OracleTableSharedResults oracle={oracle} />
        )}
        {oracle.oracle_type === "tables" && (
          <OracleCollection collection={oracle} />
        )}
      </DialogContent>
    </>
  );
}
