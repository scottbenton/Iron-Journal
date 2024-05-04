import { createApiFunction } from "api-calls/createApiFunction";
import { PartialWithFieldValue, updateDoc } from "firebase/firestore";
import { HomebrewOracleTableDocument } from "api-calls/homebrew/oracles/tables/_homebrewOracleTable.type";
import { getHomebrewOracleTableDoc } from "./_getRef";

export const updateHomebrewOracleTable = createApiFunction<
  {
    oracleTableId: string;
    oracleTable: PartialWithFieldValue<HomebrewOracleTableDocument>;
  },
  void
>((params) => {
  const { oracleTableId, oracleTable } = params;
  return new Promise((resolve, reject) => {
    updateDoc(getHomebrewOracleTableDoc(oracleTableId), oracleTable)
      .then(resolve)
      .catch(reject);
  });
}, "Failed to update oracle table.");
