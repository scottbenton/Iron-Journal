import { createApiFunction } from "api-calls/createApiFunction";
import { addDoc } from "firebase/firestore";
import { getHomebrewStatsCollection } from "./_getRef";
import { HomebrewStatDocument } from "api-calls/homebrew/rules/stats/_homebrewStat.type";

export const createHomebrewStat = createApiFunction<
  {
    stat: HomebrewStatDocument;
  },
  void
>((params) => {
  const { stat } = params;
  return new Promise((resolve, reject) => {
    addDoc(getHomebrewStatsCollection(), stat)
      .then(() => {
        resolve();
      })
      .catch(reject);
  });
}, "Failed to create stat.");
