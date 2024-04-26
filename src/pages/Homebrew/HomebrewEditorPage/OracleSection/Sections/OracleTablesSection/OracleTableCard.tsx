import { Box, Card, IconButton, Tooltip, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import {
  StoredOracleCollection,
  StoredOracleTable,
} from "types/homebrew/HomebrewOracles.type";
import { useStore } from "stores/store";
import DeleteIcon from "@mui/icons-material/Delete";
import { useConfirm } from "material-ui-confirm";
import { useState } from "react";
import MoveIcon from "@mui/icons-material/DriveFileMove";
import ViewIcon from "@mui/icons-material/Visibility";
import { MoveOracleTableDialog } from "./MoveOracleTableDialog";

export interface OracleTableCardProps {
  oracleId: string;
  oracle: StoredOracleTable;
  onClick: () => void;
  collections: Record<string, StoredOracleCollection>;
  isEditor: boolean;
}

export function OracleTableCard(props: OracleTableCardProps) {
  const { oracleId, oracle, onClick, collections, isEditor } = props;
  const confirm = useConfirm();

  const deleteOracle = useStore((store) => store.homebrew.deleteOracleTable);
  const handleDeleteOracle = () => {
    confirm({
      title: `Delete ${oracle.label}`,
      description:
        "Are you sure you want to delete this oracle? This cannot be undone.",
      confirmationText: "Delete",
      confirmationButtonProps: {
        variant: "contained",
        color: "error",
      },
    })
      .then(() => {
        deleteOracle(oracleId).catch(() => {});
      })
      .catch(() => {});
  };

  const [moveOracleDialogOpen, setMoveOracleDialogOpen] = useState(false);

  return (
    <>
      <Card
        variant={"outlined"}
        component={"li"}
        sx={{
          px: 2,
          py: 1,
          mb: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography variant={"overline"} color={"textSecondary"}>
            Table
          </Typography>
          <Typography variant={"h6"}>{oracle.label}</Typography>
        </Box>
        <Box>
          {isEditor ? (
            <>
              <Tooltip title={"Move Oracle"}>
                <IconButton onClick={() => setMoveOracleDialogOpen(true)}>
                  <MoveIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={"Edit Oracle"}>
                <IconButton onClick={onClick}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={"Delete Oracle"}>
                <IconButton onClick={handleDeleteOracle}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip title={"Preview Oracle"}>
                <IconButton onClick={onClick}>
                  <ViewIcon />
                </IconButton>
              </Tooltip>
            </>
          )}
        </Box>
      </Card>
      <MoveOracleTableDialog
        open={moveOracleDialogOpen}
        onClose={() => setMoveOracleDialogOpen(false)}
        oracleCollectionId={oracle.oracleCollectionId}
        oracleId={oracleId}
        oracleCollections={collections}
      />
    </>
  );
}
