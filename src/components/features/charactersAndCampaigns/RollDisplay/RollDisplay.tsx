import { Box, Card, CardActionArea } from "@mui/material";
import { ROLL_TYPE, Roll } from "types/DieRolls.type";
import { RollTitle } from "./RollTitle";
import { RollValues } from "./RollValues";
import { RollResult } from "./RollResult";
import { getRollResultLabel } from "./getRollResultLabel";
import { RollContainer } from "./RollContainer";
import { ReactNode } from "react";
import { getOracleRollables } from "data/datasworn";

export interface RollDisplayProps {
  roll: Roll;
  onClick?: () => void;
  isExpanded: boolean;
  actions?: ReactNode;
}

export function RollDisplay(props: RollDisplayProps) {
  const { roll, onClick, isExpanded, actions } = props;

  const oracles = getOracleRollables();

  return (
    <Card
      sx={(theme) => ({
        backgroundColor: theme.palette.darkGrey.dark,
        color: theme.palette.darkGrey.contrastText,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        position: "relative",
      })}
    >
      <Box
        component={onClick ? CardActionArea : "div"}
        onClick={onClick ? onClick : undefined}
        px={2}
        py={1}
      >
        {roll.type === ROLL_TYPE.STAT && (
          <>
            <RollTitle
              title={roll.moveName ? roll.moveName : roll.rollLabel}
              overline={roll.moveName ? roll.rollLabel : undefined}
              isExpanded={isExpanded}
            />
            <RollContainer>
              <RollValues
                d6Result={{
                  action: roll.action,
                  modifier: roll.modifier,
                  adds: roll.adds,
                  rollTotal:
                    (roll.matchedNegativeMomentum ? 0 : roll.action) +
                    (roll.modifier ?? 0) +
                    (roll.adds ?? 0),
                }}
                crossOutD6={!!roll.momentumBurned}
                crossOutD6Value={roll.matchedNegativeMomentum}
                d10Results={[roll.challenge1, roll.challenge2]}
                fixedResult={
                  roll.momentumBurned
                    ? { title: "Momentum", value: roll.momentumBurned }
                    : undefined
                }
                isExpanded={isExpanded}
              />
              <RollResult
                result={getRollResultLabel(roll.result)}
                extras={[
                  ...(roll.challenge1 === roll.challenge2 ? ["Match"] : []),
                  ...(roll.action === 1 ? ["One on the action die"] : []),
                  ...(roll.matchedNegativeMomentum
                    ? ["Matched negative momentum"]
                    : []),
                ]}
              />
            </RollContainer>
          </>
        )}
        {roll.type === ROLL_TYPE.TRACK_PROGRESS && (
          <>
            <RollTitle title={roll.rollLabel} isExpanded={isExpanded} />
            <RollContainer>
              <RollValues
                fixedResult={{
                  title: "Progress",
                  value: roll.trackProgress,
                }}
                d10Results={[roll.challenge1, roll.challenge2]}
                isExpanded={isExpanded}
              />
              <RollResult
                result={getRollResultLabel(roll.result)}
                extras={[
                  ...(roll.challenge1 === roll.challenge2 ? ["Doubles"] : []),
                ]}
              />
            </RollContainer>
          </>
        )}
        {roll.type === ROLL_TYPE.ORACLE_TABLE && (
          <>
            <RollTitle
              overline={roll.oracleCategoryName}
              title={roll.rollLabel}
              isExpanded={isExpanded}
            />
            <RollContainer>
              <RollValues d10Results={roll.roll} isExpanded={isExpanded} />
              <RollResult
                markdown={roll.result}
                extras={
                  roll.oracleId &&
                  !!oracles[roll.oracleId]?.match &&
                  !Array.isArray(roll.roll) &&
                  checkIfMatch(roll.roll)
                    ? ["Match"]
                    : undefined
                }
              />
            </RollContainer>
          </>
        )}
        {roll.type === ROLL_TYPE.CLOCK_PROGRESSION && (
          <>
            <RollTitle
              overline={roll.oracleTitle}
              title={roll.rollLabel}
              isExpanded={isExpanded}
            />
            <RollContainer>
              <RollValues d10Results={roll.roll} isExpanded={isExpanded} />
              <RollResult
                markdown={roll.result}
                extras={roll.match ? ["Match"] : undefined}
              />
            </RollContainer>
          </>
        )}
      </Box>
      <Box position={"absolute"} top={0} right={0}>
        {isExpanded && actions}
      </Box>
    </Card>
  );
}
// A bit hacky, check if the last two digits of the number are equal to each other.
function checkIfMatch(num: number) {
  return num % 10 === Math.floor(num / 10) % 10;
}
