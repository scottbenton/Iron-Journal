import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { CharacterPortrait } from "pages/Character/CharacterSheetPage/components/CharacterPortrait";
import { CharacterSettingsMenu } from "pages/Character/CharacterSheetPage/components/CharacterSettings/CharacterSettingsMenu";
import { InitiativeButtons } from "pages/Character/CharacterSheetPage/components/InitiativeButtons";
import { useState } from "react";
import { useStore } from "stores/store";
import CharacterSettingsIcon from "@mui/icons-material/ManageAccounts";

export function CharacterDetails() {
  const name = useStore(
    (store) => store.characters.currentCharacter.currentCharacter?.name ?? ""
  );
  const [characterSettingsMenuState, setCharacterSettingsMenuState] = useState<{
    open: boolean;
    anchorEl: HTMLElement | null;
  }>({ open: false, anchorEl: null });

  return (
    <Box display={"flex"} alignItems={"flex-start"} mt={2}>
      <CharacterPortrait size={"large"} />
      <Box ml={1} flexGrow={1}>
        <Typography
          variant={"h4"}
          fontFamily={(theme) => theme.fontFamilyTitle}
        >
          {name}
        </Typography>
        <InitiativeButtons />
      </Box>
      <Tooltip title={"Character Settings"}>
        <IconButton
          sx={{ ml: 2 }}
          onClick={(evt) =>
            setCharacterSettingsMenuState({
              anchorEl: evt.currentTarget,
              open: true,
            })
          }
        >
          <CharacterSettingsIcon />
        </IconButton>
      </Tooltip>
      <CharacterSettingsMenu
        open={characterSettingsMenuState.open}
        anchorElement={characterSettingsMenuState.anchorEl}
        onClose={() =>
          setCharacterSettingsMenuState((prev) => ({ ...prev, open: false }))
        }
      />
    </Box>
  );
}
