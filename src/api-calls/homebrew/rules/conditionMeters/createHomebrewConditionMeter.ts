import { createApiFunction } from "api-calls/createApiFunction";
import { addDoc } from "firebase/firestore";
import { getHomebrewConditionMeterCollection } from "./_getRef";
import { HomebrewConditionMeterDocument } from "api-calls/homebrew/rules/conditionMeters/_homebrewConditionMeters.type";

export const createHomebrewConditionMeter = createApiFunction<
  {
    conditionMeter: HomebrewConditionMeterDocument;
  },
  void
>((params) => {
  const { conditionMeter } = params;
  return new Promise((resolve, reject) => {
    addDoc(getHomebrewConditionMeterCollection(), conditionMeter)
      .then(() => {
        resolve();
      })
      .catch(reject);
  });
}, "Failed to create condition meter.");
