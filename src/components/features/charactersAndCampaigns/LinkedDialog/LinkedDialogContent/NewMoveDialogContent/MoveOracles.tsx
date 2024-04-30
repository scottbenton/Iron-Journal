import { Stack } from "@mui/material";
import { OracleButton } from "components/features/charactersAndCampaigns/NewOracleSection/OracleButton";

export interface MoveOraclesProps {
  oracles: string[] | undefined;
}

export function MoveOracles(props: MoveOraclesProps) {
  const { oracles } = props;

  if (!oracles) {
    return null;
  }

  return (
    <>
      {oracles && (
        <Stack direction={"row"} flexWrap={"wrap"} spacing={2} mt={2}>
          {oracles.map((oracleId) => (
            <OracleButton
              color={"inherit"}
              variant={"outlined"}
              key={oracleId}
              oracleId={oracleId}
            />
          ))}
        </Stack>
      )}
    </>
  );
}
