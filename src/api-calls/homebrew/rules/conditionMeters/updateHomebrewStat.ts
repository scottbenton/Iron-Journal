import { createApiFunction } from "api-calls/createApiFunction";
import { PartialWithFieldValue, updateDoc } from "firebase/firestore";
import { getHomebrewConditionMeterDoc } from "./_getRef";
import { HomebrewConditionMeterDocument } from "api-calls/homebrew/rules/conditionMeters/_homebrewConditionMeters.type";

export const updateHomebrewConditionMeter = createApiFunction<
  {
    conditionMeterId: string;
    conditionMeter: PartialWithFieldValue<HomebrewConditionMeterDocument>;
  },
  void
>((params) => {
  const { conditionMeterId, conditionMeter } = params;
  return new Promise((resolve, reject) => {
    updateDoc(getHomebrewConditionMeterDoc(conditionMeterId), conditionMeter)
      .then(() => {
        resolve();
      })
      .catch(reject);
  });
}, "Failed to update condition meter.");
