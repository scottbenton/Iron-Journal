import { getHomebrewNonLinearMeterCollection } from "./_getRef";
import { createHomebrewListenerFunction } from "api-calls/homebrew/homebrewListenerFunction";

export const listenToHomebrewNonLinearMeters = createHomebrewListenerFunction(
  getHomebrewNonLinearMeterCollection()
);
