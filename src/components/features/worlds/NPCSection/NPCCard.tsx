import { LocationWithGMProperties } from "stores/world/currentWorld/locations/locations.slice.type";
import { NPCDocumentWithGMProperties } from "stores/world/currentWorld/npcs/npcs.slice.type";
import { Sector } from "types/Sector.type";
import { useGameSystem } from "hooks/useGameSystem";
import { GAME_SYSTEMS } from "types/GameSystems.type";
import { CardWithImage } from "../common/CardWithImage";
import { mergeIcons } from "components/shared/GameIcons/mergeIcons";
import { IconColors } from "types/Icon.type";

export interface NPCCardProps {
  npc: NPCDocumentWithGMProperties;
  locations: { [key: string]: LocationWithGMProperties };
  sectors: { [key: string]: Sector };
  openNPC: () => void;
  showHiddenTag?: boolean;
}

export function NPCCard(props: NPCCardProps) {
  const { npc, locations, sectors, openNPC, showHiddenTag } = props;

  const showSectors = useGameSystem().gameSystem === GAME_SYSTEMS.STARFORGED;

  const npcLocation = showSectors
    ? npc.lastSectorId
      ? sectors[npc.lastSectorId]
      : undefined
    : npc.lastLocationId
    ? locations[npc.lastLocationId]
    : undefined;

  const icon = mergeIcons(
    { key: "GiPerson", color: IconColors.White },
    undefined,
    npc.icon
  );

  return (
    <CardWithImage
      name={npc.name}
      secondaryText={npcLocation?.name}
      imageUrl={npc.imageUrl}
      icon={icon}
      showHiddenTag={showHiddenTag && !npc.sharedWithPlayers}
      handleClick={openNPC}
    />
  );
}
