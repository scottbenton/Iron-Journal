import { Button, ButtonProps } from "@mui/material";
import { useRoller } from "stores/appState/useRoller";
import { useStore } from "stores/store";
import RollIcon from "@mui/icons-material/Casino";
import { getOracle } from "data/datasworn";

export interface OracleButtonProps extends ButtonProps {
  oracleId: string;
}

export function OracleButton(props: OracleButtonProps) {
  const { oracleId, ...buttonProps } = props;

  const oracle = getOracle(oracleId);

  const shouldOracleRollBeGMSOnly = useStore(
    (store) => !store.characters.currentCharacter.currentCharacterId
  );

  const { rollOracleTable } = useRoller();

  if (!oracle || oracle.oracle_type === "tables") {
    return null;
  }
  return (
    <Button
      {...buttonProps}
      onClick={() => rollOracleTable(oracleId, true, shouldOracleRollBeGMSOnly)}
      endIcon={<RollIcon />}
    >
      {oracle.name}
    </Button>
  );
}
