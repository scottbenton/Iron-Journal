import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { NoteSource, ROLL_LOG_ID } from "stores/notes/notes.slice.type";
import DieIcon from "@mui/icons-material/Casino";
import { useStore } from "stores/store";
import { NoteSidebarSection } from "./NoteSidebarSection";

export interface NoteSidebarProps {
  selectedNote?: typeof ROLL_LOG_ID | { source: NoteSource; id: string };
  isMobile: boolean;
}

export function NoteSidebar(props: NoteSidebarProps) {
  const { selectedNote, isMobile } = props;

  const notes = useStore((store) => store.notes.notes);

  const hasCharacter = useStore(
    (store) => !!store.characters.currentCharacter.currentCharacterId
  );
  const hasCampaign = useStore(
    (store) => !!store.campaigns.currentCampaign.currentCampaignId
  );

  const setOpenNote = useStore((store) => store.notes.setOpenNoteId);

  return (
    <Box
      sx={(theme) => ({
        bgcolor: theme.palette.background.paperInlay,
      })}
      width={isMobile ? "100%" : "33%"}
      maxWidth={isMobile ? undefined : "250px"}
      display={"flex"}
      flexDirection={"column"}
    >
      <List sx={{ overflowY: "auto" }}>
        <ListItemButton
          selected={ROLL_LOG_ID === selectedNote}
          onClick={() => setOpenNote(ROLL_LOG_ID)}
        >
          <ListItemIcon>
            <DieIcon />
          </ListItemIcon>
          <ListItemText>Roll Log</ListItemText>
        </ListItemButton>

        {hasCampaign && (
          <NoteSidebarSection
            notes={notes[NoteSource.Campaign]}
            openNote={selectedNote}
            noteSource={NoteSource.Campaign}
          />
        )}
        {hasCharacter && (
          <NoteSidebarSection
            notes={notes[NoteSource.Character]}
            openNote={selectedNote}
            noteSource={NoteSource.Character}
          />
        )}
      </List>
    </Box>
  );
}
