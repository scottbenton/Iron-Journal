import { createApiFunction } from "api-calls/createApiFunction";
import { PartialWithFieldValue, updateDoc } from "firebase/firestore";
import { HomebrewOracleCollectionDocument } from "api-calls/homebrew/oracles/collections/_homebrewOracleCollection.type";
import { getHomebrewOracleCollectionDoc } from "./_getRef";

export const updateHomebrewOracleCollection = createApiFunction<
  {
    oracleCollectionId: string;
    oracleCollection: PartialWithFieldValue<HomebrewOracleCollectionDocument>;
  },
  void
>((params) => {
  const { oracleCollectionId, oracleCollection } = params;
  return new Promise((resolve, reject) => {
    updateDoc(
      getHomebrewOracleCollectionDoc(oracleCollectionId),
      oracleCollection
    )
      .then(() => resolve())
      .catch(reject);
  });
}, "Failed to update oracle collection.");
