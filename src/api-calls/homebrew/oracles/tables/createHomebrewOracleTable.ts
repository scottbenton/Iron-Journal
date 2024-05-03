import { createApiFunction } from "api-calls/createApiFunction";
import { addDoc } from "firebase/firestore";
import { HomebrewOracleTableDocument } from "api-calls/homebrew/oracles/tables/_homebrewOracleTable.type";
import { getHomebrewOracleTableCollection } from "./_getRef";

export const createHomebrewOracleTable = createApiFunction<
  { oracleTable: HomebrewOracleTableDocument },
  void
>((params) => {
  const { oracleTable } = params;
  return new Promise((resolve, reject) => {
    addDoc(getHomebrewOracleTableCollection(), oracleTable)
      .then(() => resolve())
      .catch(reject);
  });
}, "Failed to create oracle table.");
