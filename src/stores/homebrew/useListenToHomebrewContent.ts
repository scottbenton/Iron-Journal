import { useConfigureDataswornTree } from "data/datasworn";
import { useGameSystemValue } from "hooks/useGameSystemValue";
import { useEffect } from "react";
import { useStore } from "stores/store";
import { GAME_SYSTEMS } from "types/GameSystems.type";

export function useListenToHomebrewContent(homebrewIds: string[]) {
  const subscribeToHomebrewContent = useStore(
    (store) => store.homebrew.subscribeToHomebrewContent
  );

  const defaultRuleset = useGameSystemValue({
    [GAME_SYSTEMS.IRONSWORN]: "classic",
    [GAME_SYSTEMS.STARFORGED]: "starforged",
  });
  const expansions: Record<string, boolean> = {};
  homebrewIds.forEach((id) => (expansions[id] = true));

  useConfigureDataswornTree(
    {
      [defaultRuleset]: true,
    },
    {
      [defaultRuleset]: expansions,
    }
  );

  useEffect(() => {
    const unsubscribe = subscribeToHomebrewContent(homebrewIds);

    return () => {
      unsubscribe();
    };
  }, [homebrewIds, subscribeToHomebrewContent]);
}
