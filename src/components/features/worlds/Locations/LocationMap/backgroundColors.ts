import { MapEntryBackgroundColors } from "types/Locations.type";

export const backgroundColors: Record<
  MapEntryBackgroundColors,
  {
    color: string;
    label: string;
  }
> = {
  [MapEntryBackgroundColors.Grass]: {
    color: "#576e3b",
    label: "Grass",
  },
  [MapEntryBackgroundColors.Water]: {
    color: "#415c6b",
    label: "Water",
  },
  [MapEntryBackgroundColors.Rock]: {
    color: "#5b5b53",
    label: "Stone",
  },
  [MapEntryBackgroundColors.Sand]: {
    color: "#caa967",
    label: "Sand",
  },
  [MapEntryBackgroundColors.Dirt]: {
    color: "#533f28",
    label: "Dirt",
  },
  [MapEntryBackgroundColors.Volcanic]: {
    color: "#384042",
    label: "Volcanic",
  },
  [MapEntryBackgroundColors.TreeCover]: {
    color: "#3d532d",
    label: "Forest",
  },
  [MapEntryBackgroundColors.Snow]: {
    color: "#b4bfbf",
    label: "Snow",
  },
  [MapEntryBackgroundColors.Mesa]: {
    color: "#a25339",
    label: "Mesa",
  },
};
