import { GAME_SYSTEMS, GameSystemChooser } from "types/GameSystems.type";

export const appDetails: GameSystemChooser<{
  title: string;
  description: string;
  game: string;
}> = {
  [GAME_SYSTEMS.IRONSWORN]: {
    title: "Iron Fellowship for Ironsworn",
    description:
      "A character sheet and campaign manager for players and guides playing Ironsworn",
    game: "Ironsworn",
  },
  [GAME_SYSTEMS.STARFORGED]: {
    title: "Crew Link for Starforged",
    description:
      "A character sheet and campaign manager for players and guides playing Starforged",
    game: "Starforged",
  },
};
