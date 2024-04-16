import { createApiFunction } from "api-calls/createApiFunction";
import { addDoc } from "firebase/firestore";
import { getHomebrewNonLinearMeterCollection } from "./_getRef";
import { StoredNonLinearMeter } from "types/homebrew/HomebrewRules.type";

export const createHomebrewNonLinearMeter = createApiFunction<
  {
    meter: StoredNonLinearMeter;
  },
  void
>((params) => {
  const { meter } = params;
  return new Promise((resolve, reject) => {
    addDoc(getHomebrewNonLinearMeterCollection(), meter)
      .then(() => {
        resolve();
      })
      .catch(reject);
  });
}, "Failed to create meter.");
