import { Datasworn } from "@datasworn/core";
import { Box, Button } from "@mui/material";
import { MarkdownRenderer } from "components/shared/MarkdownRenderer";

export interface MoveOutcomesProps {
  move: Datasworn.Move;
}

export function MoveOutcomes(props: MoveOutcomesProps) {
  const { move } = props;

  if (move.outcomes) {
    // console.debug(move.outcomes);
    return (
      <Box mt={4}>
        <MarkdownRenderer markdown={move.outcomes.strong_hit.text} />
        {(move.outcomes.strong_hit.oracle_rolls?.length ?? 0) > 0 && (
          <Box>
            {move.outcomes.strong_hit.oracle_rolls?.map((oracleRoll) => (
              <Button key={oracleRoll.oracle}>{oracleRoll.oracle}</Button>
            ))}
          </Box>
        )}
        <MarkdownRenderer markdown={move.outcomes.weak_hit.text} />
        {(move.outcomes.weak_hit.oracle_rolls?.length ?? 0) > 0 && (
          <Box>
            {move.outcomes.weak_hit.oracle_rolls?.map((oracleRoll) => (
              <Button key={oracleRoll.oracle}>{oracleRoll.oracle}</Button>
            ))}
          </Box>
        )}
        <MarkdownRenderer markdown={move.outcomes.miss.text} />
        {(move.outcomes.miss.oracle_rolls?.length ?? 0) > 0 && (
          <Box>
            {move.outcomes.miss.oracle_rolls?.map((oracleRoll) => (
              <Button key={oracleRoll.oracle}>{oracleRoll.oracle}</Button>
            ))}
          </Box>
        )}
      </Box>
    );
  }
  console.debug("MOVE HAD NO OUTCOMES");

  return <></>;
}
