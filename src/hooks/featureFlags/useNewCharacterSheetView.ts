import { useFeatureFlag } from "./useFeatureFlag";

export function useNewCharacterSheetView() {
  return useFeatureFlag("new-character-sheet-view");
}
