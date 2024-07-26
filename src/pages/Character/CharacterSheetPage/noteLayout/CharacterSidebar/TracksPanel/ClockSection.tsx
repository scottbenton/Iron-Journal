import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useStore } from "stores/store";
import { Clock as IClock } from "types/Track.type";
import { SidebarHeading } from "./SidebarHeading";
import { Clocks } from "components/features/charactersAndCampaigns/Clocks/Clocks";
import { ClockDialog } from "components/features/charactersAndCampaigns/Clocks/ClockDialog";

export interface ClockSectionProps {
  showCompletedClocks?: boolean;
}

export function ClockSection(props: ClockSectionProps) {
  const { showCompletedClocks } = props;

  const setLoadCompletedCharacterTracks = useStore(
    (store) => store.characters.currentCharacter.tracks.setLoadCompletedTracks
  );
  const setLoadCompletedCampaignTracks = useStore(
    (store) => store.campaigns.currentCampaign.tracks.setLoadCompletedTracks
  );

  useEffect(() => {
    if (showCompletedClocks) {
      setLoadCompletedCharacterTracks();
      setLoadCompletedCampaignTracks();
    }
  }, [
    showCompletedClocks,
    setLoadCompletedCampaignTracks,
    setLoadCompletedCharacterTracks,
  ]);

  const isInCampaign = useStore(
    (store) => !!store.campaigns.currentCampaign.currentCampaignId
  );
  const isInCharacterSheet = useStore(
    (store) => !!store.characters.currentCharacter.currentCharacterId
  );

  const [addClockDialogOpen, setAddClockDialogOpen] = useState<{
    open: boolean;
    shared?: boolean;
  }>({ open: false });

  const addCharacterClock = useStore(
    (store) => store.characters.currentCharacter.tracks.addTrack
  );
  const addCampaignClock = useStore(
    (store) => store.campaigns.currentCampaign.tracks.addTrack
  );

  const handleAddClock = (clock: IClock, shared?: boolean) => {
    const addFn = shared ? addCampaignClock : addCharacterClock;
    return addFn(clock);
  };

  return (
    <>
      {isInCampaign && (
        <>
          <SidebarHeading
            label={"Shared Clocks"}
            action={
              <Button
                color={"inherit"}
                onClick={() =>
                  setAddClockDialogOpen({ open: true, shared: true })
                }
              >
                Add Shared Clock
              </Button>
            }
          />
          <Clocks isCampaignSection headingBreakContainer />
          {showCompletedClocks && (
            <Clocks isCampaignSection isCompleted headingBreakContainer />
          )}
        </>
      )}
      {isInCharacterSheet && !isInCampaign && (
        <>
          <SidebarHeading
            label={"Character Clocks"}
            action={
              <Button
                color={"inherit"}
                onClick={() => setAddClockDialogOpen({ open: true })}
              >
                Add Character Clock
              </Button>
            }
          />

          <Clocks headingBreakContainer />
          {showCompletedClocks && <Clocks isCompleted headingBreakContainer />}
        </>
      )}
      <ClockDialog
        open={addClockDialogOpen.open}
        handleClose={() => setAddClockDialogOpen({ open: false })}
        shared={addClockDialogOpen.shared}
        onClock={(clock) => handleAddClock(clock, addClockDialogOpen.shared)}
      />
    </>
  );
}
