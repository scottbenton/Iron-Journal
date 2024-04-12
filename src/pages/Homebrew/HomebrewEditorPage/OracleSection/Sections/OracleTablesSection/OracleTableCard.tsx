import { Box, Card, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { StoredOracleTable } from "types/homebrew/HomebrewOracles.type";
import { useStore } from "stores/store";
import DeleteIcon from "@mui/icons-material/Delete";
import { useConfirm } from "material-ui-confirm";

export interface OracleTableCardProps {
  oracleId: string;
  oracle: StoredOracleTable;
  onClick: () => void;
}

export function OracleTableCard(props: OracleTableCardProps) {
  const { oracleId, oracle, onClick } = props;
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

  return (
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
        <IconButton onClick={onClick}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={handleDeleteOracle}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Card>
  );
}
