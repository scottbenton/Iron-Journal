import { useFeatureFlag } from "./useFeatureFlag";

export function useNewMaps() {
  return useFeatureFlag("new-maps");
}
