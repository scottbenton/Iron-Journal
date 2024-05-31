import { useGameSystemValue } from "hooks/useGameSystemValue";
import { useStore } from "stores/store";
import { GAME_SYSTEMS } from "types/GameSystems.type";
import { Themes } from "./themes/theme.types";
import { useEffect } from "react";
import { useToggleTheme } from "./useToggleTheme";

export function useSyncTheme() {
  const { setTheme } = useToggleTheme();

  const defaultTheme = useGameSystemValue({
    [GAME_SYSTEMS.IRONSWORN]: Themes.Sunset,
    [GAME_SYSTEMS.STARFORGED]: Themes.Eidolon,
  });

  const hasCampaign = useStore(
    (store) => !!store.campaigns.currentCampaign.currentCampaignId
  );
  const campaignTheme = useStore(
    (store) => store.campaigns.currentCampaign?.currentCampaign?.theme
  );

  const hasCharacter = useStore(
    (store) => !!store.characters.currentCharacter.currentCharacterId
  );
  const characterTheme = useStore(
    (store) => store.characters.currentCharacter.currentCharacter?.theme
  );

  useEffect(() => {
    if (hasCampaign && campaignTheme) {
      setTheme(campaignTheme);
    } else if (!hasCampaign && hasCharacter && characterTheme) {
      setTheme(characterTheme);
    } else {
      setTheme(defaultTheme);
    }
    return () => {
      setTheme(defaultTheme);
    };
  }, [
    setTheme,
    defaultTheme,
    hasCampaign,
    campaignTheme,
    hasCharacter,
    characterTheme,
  ]);
}
