import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import { useCampaignType } from "hooks/useCampaignType";
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import { NoteSource, ROLL_LOG_ID } from "stores/notes/notes.slice.type";
import { useStore } from "stores/store";
import { Note } from "types/Notes.type";
import { StrictModeDroppable } from "./StrictModeDroppable";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";

export interface NoteSidebarSectionProps {
  notes: Note[];
  openNote?: typeof ROLL_LOG_ID | { source: NoteSource; id: string };
  noteSource: NoteSource;
}

export function NoteSidebarSection(props: NoteSidebarSectionProps) {
  const { notes, openNote, noteSource } = props;

  const { showGuidedPlayerView, showGuideTips } = useCampaignType();

  const setOpenNote = useStore((store) => store.notes.setOpenNoteId);

  const tempReorder = useStore((store) => store.notes.temporarilyReorderNotes);
  const updateNoteOrder = useStore((store) => store.notes.updateNoteOrder);
  const handleDragEnd = (evt: DropResult) => {
    const { source, destination } = evt;
    if (!destination) {
      return;
    }

    let noteBefore: Note | undefined;
    let noteAfter: Note | undefined;

    if (source.index === destination.index) {
      return;
    } else if (source.index < destination.index) {
      noteBefore = notes[destination.index];
      noteAfter =
        destination.index + 1 < notes.length
          ? notes[destination.index + 1]
          : undefined;
    } else {
      noteBefore =
        destination.index - 1 >= 0 ? notes[destination.index - 1] : undefined;
      noteAfter = notes[destination.index];
    }
    const noteId = notes[source.index].noteId;

    let order: number = 1;
    if (noteBefore && noteAfter) {
      order = (noteBefore.order + noteAfter.order) / 2;
    } else if (noteBefore) {
      order = noteBefore.order + 1;
    } else if (noteAfter) {
      order = noteAfter.order - 1;
    }

    tempReorder({ source: noteSource, id: noteId }, order);
    updateNoteOrder({ source: noteSource, id: noteId }, order).catch(() => {});
  };

  const [loading, setLoading] = useState<boolean>(false);
  const createNote = useStore((store) => store.notes.addNote);
  const handleCreateNote = () => {
    setLoading(true);
    createNote &&
      createNote(
        noteSource,
        notes.length > 0 ? notes[notes.length - 1].order + 1 : 1,
        noteSource === NoteSource.Campaign && showGuidedPlayerView
          ? true
          : false
      )
        .then((noteId) => {
          setOpenNote({ source: noteSource, id: noteId });
        })
        .catch(() => {})
        .finally(() => {
          setLoading(false);
        });
  };

  const sectionHeader = (
    <>
      <Divider />
      <ListItem sx={{ bgcolor: "background.paperInlayDarker" }}>
        <ListItemText
          primary={
            noteSource === NoteSource.Campaign
              ? "Campaign Notes"
              : "Character Notes"
          }
        />
        <ListItemSecondaryAction>
          <IconButton
            aria-label={"Add Note"}
            disabled={loading}
            onClick={handleCreateNote}
          >
            <AddIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </>
  );

  const canDrag = noteSource === NoteSource.Character || !showGuidedPlayerView;
  if (canDrag) {
    return (
      <>
        {sectionHeader}
        <DragDropContext onDragEnd={handleDragEnd}>
          <StrictModeDroppable droppableId={`notes-sidebar-list-${noteSource}`}>
            {(provided) => (
              <List {...provided.droppableProps} ref={provided.innerRef}>
                {notes.map((note, index) => (
                  <Draggable
                    key={note.noteId}
                    draggableId={note.noteId}
                    index={index}
                    isDragDisabled={!updateNoteOrder}
                  >
                    {(provided) => (
                      <ListItem
                        disablePadding
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={provided.draggableProps.style}
                      >
                        <ListItemButton
                          selected={
                            openNote &&
                            typeof openNote !== "string" &&
                            note.noteId === openNote.id
                          }
                          onClick={() =>
                            setOpenNote({ source: noteSource, id: note.noteId })
                          }
                        >
                          <ListItemText
                            primaryTypographyProps={{
                              sx: {
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              },
                            }}
                            primary={note.title}
                            secondary={
                              showGuideTips
                                ? note.shared
                                  ? "Shared"
                                  : "Private"
                                : undefined
                            }
                          >
                            {note.title}
                          </ListItemText>
                        </ListItemButton>
                      </ListItem>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </List>
            )}
          </StrictModeDroppable>
        </DragDropContext>
      </>
    );
  }

  return (
    <>
      {sectionHeader}
      <List>
        {notes.map((note, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              selected={
                openNote &&
                typeof openNote !== "string" &&
                note.noteId === openNote.id
              }
              onClick={() =>
                setOpenNote({ source: noteSource, id: note.noteId })
              }
            >
              <ListItemText
                primaryTypographyProps={{
                  sx: {
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  },
                }}
              >
                {note.title}
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
}
