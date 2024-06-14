import { Box } from "@mui/material";
import { LoreTag } from "./LoreTag";
import { LoreDocumentWithGMProperties } from "stores/world/currentWorld/lore/lore.slice.type";
import { CardWithImage } from "../common/CardWithImage";
import { mergeIcons } from "components/shared/GameIcons/mergeIcons";
import { IconColors } from "types/Icon.type";

export interface LoreCardProps {
  lore: LoreDocumentWithGMProperties;
  openLore: () => void;
  showHiddenTag?: boolean;
}

export function LoreCard(props: LoreCardProps) {
  const { lore, openLore, showHiddenTag } = props;

  const icon = mergeIcons(
    {
      key: "GiBookmarklet",
      color: IconColors.White,
    },
    undefined,
    lore.icon
  );

  return (
    <CardWithImage
      name={lore.name}
      secondaryText={
        <Box
          sx={{
            display: "flex",
            "&>*": {
              mt: 0.5,
              mr: 0.5,
            },
          }}
        >
          {lore.tags?.map((tag) => (
            <LoreTag size={"small"} label={tag} key={tag} />
          ))}
        </Box>
      }
      imageUrl={lore.imageUrl}
      icon={icon}
      showHiddenTag={showHiddenTag && !lore.sharedWithPlayers}
      handleClick={openLore}
    />
  );
}
