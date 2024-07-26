import { Box, Typography } from "@mui/material";
import { momentumTrack } from "data/defaultTracks";
import { MobileStatTrack } from "pages/Character/CharacterSheetPage/components/MobileStatTrack";
import { useStore } from "stores/store";

export function CharacterRollAffects() {
  const numberOfActiveDebilities = useStore((store) => {
    return Object.values(
      store.characters.currentCharacter.currentCharacter?.debilities ?? {}
    ).filter((debility) => debility).length;
  });
  const momentum = useStore(
    (store) => store.characters.currentCharacter.currentCharacter?.momentum ?? 0
  );

  const maxMomentum = momentumTrack.max - numberOfActiveDebilities;

  const updateCharacter = useStore(
    (store) => store.characters.currentCharacter.updateCurrentCharacter
  );
  const updateMomentum = (newValue: number) => {
    return updateCharacter({
      momentum: newValue,
    });
  };

  const adds = useStore(
    (store) => store.characters.currentCharacter.currentCharacter?.adds ?? 0
  );
  const updateAdds = (newValue: number) => {
    return updateCharacter({
      adds: newValue,
    });
  };

  return (
    <Box mt={2}>
      <Typography
        fontFamily={(theme) => theme.fontFamilyTitle}
        variant={"h6"}
        color={"text.secondary"}
      >
        Condition Meters
      </Typography>
      <Box display={"flex"} flexWrap={"wrap"} gap={1}>
        <MobileStatTrack
          label={"Momentum"}
          value={momentum}
          onChange={(newValue) => updateMomentum(newValue)}
          disableRoll
          min={momentumTrack.min}
          max={maxMomentum}
          smallSize
        />
        <MobileStatTrack
          label={"Adds"}
          value={adds}
          onChange={(newValue) => updateAdds(newValue)}
          disableRoll
          min={-9}
          max={9}
          smallSize
        />
      </Box>
    </Box>
  );
}
