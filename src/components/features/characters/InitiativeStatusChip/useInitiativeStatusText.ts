import { InitiativeStatus } from "api-calls/character/_character.type";
import { useGameSystemValue } from "hooks/useGameSystemValue";
import { GAME_SYSTEMS } from "types/GameSystems.type";

export function useInitiativeStatusText(shortVariants?: boolean) {
  return useGameSystemValue({
    [GAME_SYSTEMS.IRONSWORN]: {
      [InitiativeStatus.HasInitiative]: "Has Initiative",
      [InitiativeStatus.DoesNotHaveInitiative]: shortVariants
        ? "No Initiative"
        : "Does not have Initiative",
      [InitiativeStatus.OutOfCombat]: "Out of Combat",
    },
    [GAME_SYSTEMS.STARFORGED]: {
      [InitiativeStatus.HasInitiative]: "In Control",
      [InitiativeStatus.DoesNotHaveInitiative]: "In a Bad Spot",
      [InitiativeStatus.OutOfCombat]: "Out of Combat",
    },
  });
}
