import { TextFieldProps } from "@mui/material";
import { TextFieldWithOracle } from "components/shared/TextFieldWithOracle/TextFieldWithOracle";
import { useDebouncedState } from "hooks/useDebouncedState";
import { useRoller } from "stores/appState/useRoller";
import { useStore } from "stores/store";

export type DebouncedOracleInputProps = Omit<TextFieldProps, "onChange"> & {
  initialValue: string;
  updateValue: (value: string) => void;
  oracleTableId: string | string[] | (string | string[])[] | undefined;
  joinOracleTables?: boolean;
};

export function DebouncedOracleInput(props: DebouncedOracleInputProps) {
  const {
    initialValue,
    updateValue,
    oracleTableId,
    joinOracleTables,
    ...textFieldProps
  } = props;

  const [value, setValue] = useDebouncedState(updateValue, initialValue);

  const { rollOracleTableNew } = useRoller();

  const oracleMap = useStore(
    (store) => store.rules.oracleMaps.oracleRollableMap
  );

  const doesOracleExist =
    Array.isArray(oracleTableId) ||
    (!!oracleTableId && oracleTableId in oracleMap);

  const handleOracleRoll = () => {
    if (!oracleTableId) return "";
    if (Array.isArray(oracleTableId) && joinOracleTables) {
      return oracleTableId
        .map((tableId) => {
          if (Array.isArray(tableId)) {
            return tableId
              .map((id) => rollOracleTableNew(id, false)?.result ?? "")
              .join("");
          }
          return rollOracleTableNew(tableId, false)?.result ?? "";
        })
        .join(" ");
    } else if (Array.isArray(oracleTableId)) {
      const oracleIndex = Math.floor(Math.random() * oracleTableId.length);
      const oracleId = oracleTableId[oracleIndex];
      console.debug("Rolling", oracleId);
      if (Array.isArray(oracleId)) {
        return oracleId
          .map((id) => {
            const result = rollOracleTableNew(id, false)?.result ?? "";
            console.debug("Rolled", id, result);
            return result;
          })
          .join("");
      }
      const result = rollOracleTableNew(oracleId, false)?.result ?? "";
      console.debug("Rolled", result);
      return result;
    }

    const result = rollOracleTableNew(oracleTableId, false)?.result ?? "";
    console.debug("Rolled", result);
    return result;
  };

  return (
    <TextFieldWithOracle
      value={value}
      onChange={setValue}
      getOracleValue={doesOracleExist ? () => handleOracleRoll() : undefined}
      fullWidth
      {...textFieldProps}
    />
  );
}
