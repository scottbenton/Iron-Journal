import { useNewCharacterSheetView } from "hooks/featureFlags/useNewCharacterSheetView";
import { CharacterSheetPage } from "./CharacterSheetPage";
import { NoteLayoutCharacterSheet } from "./noteLayout/NoteLayoutCharacterSheet";

export function Component() {
  const newCharacterSheetView = useNewCharacterSheetView();

  if (newCharacterSheetView) {
    return <NoteLayoutCharacterSheet />;
  }
  return <CharacterSheetPage />;
}
