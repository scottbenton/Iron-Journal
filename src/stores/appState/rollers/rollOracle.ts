import { Datasworn } from "@datasworn/core";
import { OracleTableRoll, ROLL_TYPE } from "types/DieRolls.type";
import { rollDie } from "./rollDie";

function rollOracleColumn(column: Datasworn.OracleRollable):
  | {
      roll: number;
      result: Datasworn.OracleTableRow;
    }
  | undefined {
  const roll = rollDie(column.dice);
  if (!roll) {
    return undefined;
  }
  const result = column.rows.find(
    (row) => row.min && row.max && row.min <= roll && row.max >= roll
  );
  if (!result) {
    console.error("Could not find result for roll", roll);
    return undefined;
  }

  return {
    roll,
    result,
  };
}

export function rollOracle(
  oracle: Datasworn.OracleCollection | Datasworn.OracleRollable,
  characterId: string | null,
  uid: string,
  gmsOnly: boolean
): OracleTableRoll | undefined {
  // We cannot roll across multiple tables like this
  if (oracle.oracle_type === "tables") {
    console.error("Oracle table collections cannot be rolled");
    return undefined;
  } else if (
    oracle.oracle_type === "table_shared_text" ||
    oracle.oracle_type === "table_shared_text2" ||
    oracle.oracle_type === "table_shared_text3"
  ) {
    console.error(
      "Shared Results tables cannot be rolled - please specify a contents table to roll instead."
    );
    return undefined;
  }

  let resultString: string | undefined = undefined;
  let rolls: number | number[] | undefined = undefined;
  let result2: string | undefined = undefined;
  let result3: string | undefined = undefined;

  if (oracle.oracle_type === "table_shared_rolls") {
    const tmpRolls: number[] = [];
    resultString = Object.values(oracle.contents ?? {})
      .sort((c1, c2) => c1.name.localeCompare(c2.name))
      .map((col) => {
        const rollResult = rollOracleColumn(col);
        if (!rollResult) {
          return "";
        } else {
          tmpRolls.push(rollResult.roll);
          return `* ${col.name}: ${rollResult.result.text}`;
        }
      })
      .join("\n");
    rolls = tmpRolls;
  } else {
    const rollResult = rollOracleColumn(oracle);
    if (rollResult) {
      rolls = rollResult.roll;
      resultString = rollResult.result.text;
      if (oracle.oracle_type === "table_text2") {
        result2 =
          oracle.column_labels.text2 +
            ": " +
            (rollResult.result as Datasworn.OracleTableRowText2).text2 ??
          undefined;
      }
      if (oracle.oracle_type === "table_text3") {
        result2 =
          oracle.column_labels.text2 +
            ": " +
            (rollResult.result as Datasworn.OracleTableRowText3).text2 ??
          undefined;
        result3 =
          oracle.column_labels.text3 +
            ": " +
            (rollResult.result as Datasworn.OracleTableRowText3).text3 ??
          undefined;
      }
    }
  }

  if (resultString && rolls !== undefined) {
    const roll: OracleTableRoll = {
      type: ROLL_TYPE.ORACLE_TABLE,
      rollLabel: oracle.name,
      timestamp: new Date(),
      characterId,
      uid,
      gmsOnly,
      roll: rolls,
      result: resultString,
      oracleId: oracle._id,
    };

    if (result2) {
      roll.text2 = result2;
    }
    if (result3) {
      roll.text3 = result3;
    }

    return roll;
  }

  return undefined;
}
