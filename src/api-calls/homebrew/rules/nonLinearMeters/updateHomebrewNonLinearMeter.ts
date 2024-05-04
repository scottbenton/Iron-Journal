import { createApiFunction } from "api-calls/createApiFunction";
import { PartialWithFieldValue, updateDoc } from "firebase/firestore";
import { getHomebrewNonLinearMeterDoc } from "./_getRef";
import { HomebrewNonLinearMeterDocument } from "api-calls/homebrew/rules/nonLinearMeters/_homebrewNonLinearMeter.type";

export const updateHomebrewNonLinearMeter = createApiFunction<
  {
    meterId: string;
    meter: PartialWithFieldValue<HomebrewNonLinearMeterDocument>;
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
