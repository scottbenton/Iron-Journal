import { LinearProgress } from "@mui/material";
import { Notes } from "components/features/charactersAndCampaigns/Notes/Notes";
import { useStore } from "stores/store";

export function NoteTab() {
  const notes = useStore((store) => store.notes.notes);
  const temporarilyReorderNotes = useStore(
    (store) => store.notes.temporarilyReorderNotes
  );

  const characterId = useStore(
    (store) => store.characters.currentCharacter.currentCharacterId ?? ""
  );

  const noteContent = useStore((store) => store.notes.openNoteContent);
  const openNoteId = useStore((store) => store.notes.openNoteId);
  const setNoteId = useStore((store) => store.notes.setOpenNoteId);

  const addCharacterNote = useStore((store) => store.notes.addNote);
  const updateCharacterNote = useStore((store) => store.notes.updateNote);
  const updateCharacterNoteOrder = useStore(
    (store) => store.notes.updateNoteOrder
  );
  const removeCharacterNote = useStore((store) => store.notes.removeNote);

  if (!Array.isArray(notes)) {
    return <LinearProgress />;
  }

  const handleNoteReorder = (noteId: string, order: number) => {
    temporarilyReorderNotes(noteId, order);
    return updateCharacterNoteOrder(noteId, order);
  };
  return (
    <Notes
      source={{
        type: "character",
        characterId,
      }}
      notes={notes}
      selectedNoteId={openNoteId}
      selectedNoteContent={noteContent}
      openNote={(noteId) => setNoteId(noteId)}
      createNote={() =>
        addCharacterNote(
          notes && notes.length > 0 ? notes[notes.length - 1].order + 1 : 1
        )
      }
      updateNoteOrder={handleNoteReorder}
      onSave={({ noteId, title, content, isBeaconRequest }) =>
        updateCharacterNote(
          undefined,
          characterId,
          noteId,
          title,
          content,
          isBeaconRequest
        )
      }
      condensedView={false}
      hideSidebar
      onDelete={(noteId) =>
        removeCharacterNote(noteId)
          .then(() => {
            setNoteId(undefined);
          })
          .catch(() => {})
      }
    />
  );
}
