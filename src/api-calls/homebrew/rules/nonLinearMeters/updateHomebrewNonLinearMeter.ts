import { createApiFunction } from "api-calls/createApiFunction";
import { PartialWithFieldValue, updateDoc } from "firebase/firestore";
import { getHomebrewNonLinearMeterDoc } from "./_getRef";
import { StoredNonLinearMeter } from "types/homebrew/HomebrewRules.type";

export const updateHomebrewNonLinearMeter = createApiFunction<
  {
    meterId: string;
    meter: PartialWithFieldValue<StoredNonLinearMeter>;
  },
  void
>((params) => {
  const { meterId, meter } = params;
  return new Promise((resolve, reject) => {
    updateDoc(getHomebrewNonLinearMeterDoc(meterId), meter)
      .then(() => {
        resolve();
      })
      .catch(reject);
  });
}, "Failed to update meter.");
