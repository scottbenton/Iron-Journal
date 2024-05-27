import { GAME_SYSTEMS } from "types/GameSystems.type";
import { useFeatureFlag } from "./useFeatureFlag";
import { useGameSystem } from "hooks/useGameSystem";

export function useNewHinterlandsTheme() {
  const { gameSystem } = useGameSystem();
  return (
    useFeatureFlag("new-hinterlands-theme") &&
    gameSystem === GAME_SYSTEMS.IRONSWORN
  );
}
