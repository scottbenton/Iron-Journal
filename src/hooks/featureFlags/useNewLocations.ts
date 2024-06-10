import { useFeatureFlag } from "./useFeatureFlag";

export function useNewLocations() {
  return useFeatureFlag("maps-update");
}
