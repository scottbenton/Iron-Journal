import { Dialog, DialogContent, Stack } from "@mui/material";
import { HomebrewLegacyTrackDocument } from "api-calls/homebrew/rules/legacyTracks/_homebrewLegacyTrack.type";
import { DialogTitleWithCloseButton } from "components/shared/DialogTitleWithCloseButton";
import { MarkdownRenderer } from "components/shared/MarkdownRenderer";
import { useGameSystem } from "hooks/useGameSystem";
import { GAME_SYSTEMS } from "types/GameSystems.type";
import { LegacyTrack } from "pages/Character/CharacterSheetPage/Tabs/TracksSection/LegacyTrack";
import { ProgressTrack } from "components/features/ProgressTrack";

export interface LegacyTrackPreviewDialogProps {
  legacyTrack: HomebrewLegacyTrackDocument;
  open: boolean;
  onClose: () => void;
}

export function LegacyTrackPreviewDialog(props: LegacyTrackPreviewDialogProps) {
  const { open, onClose, legacyTrack } = props;

  const isIronsworn = useGameSystem().gameSystem === GAME_SYSTEMS.IRONSWORN;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitleWithCloseButton onClose={onClose}>
        {legacyTrack.label}
      </DialogTitleWithCloseButton>
      <DialogContent>
        <Stack spacing={2}>
          {legacyTrack.description && (
            <MarkdownRenderer markdown={legacyTrack.description} />
          )}

          {isIronsworn ? (
            <ProgressTrack
              label={legacyTrack.label}
              value={0}
              max={40}
              onValueChange={() => {}}
            />
          ) : (
            <LegacyTrack
              label={legacyTrack.label}
              value={0}
              checkedExperience={{}}
              onValueChange={() => {}}
              onExperienceChecked={() => {}}
              isLegacy={false}
            />
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
