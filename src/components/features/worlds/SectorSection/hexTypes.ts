import { PlanetIcon } from "./assets/PlanetIcon";
import { StarIcon } from "./assets/StarIcon";
import { VaultIcon } from "./assets/VaultIcon";
import { DerelictIcon } from "./assets/DerelictIcon";
import { SightingIcon } from "./assets/SightingIcon";
import { SettlementIcon } from "./assets/SettlementIcon";
import PathIcon from "@mui/icons-material/Timeline";
import { SectorHexTypes } from "types/Sector.type";

export { SectorHexTypes as SECTOR_HEX_TYPES };

export const hexTypeMap: {
  [key in SectorHexTypes]: {
    Icon: typeof PathIcon | typeof StarIcon;
    color?: string;
    name: string;
  };
} = {
  [SectorHexTypes.Path]: {
    Icon: PathIcon,
    color: "#cbd5e1",
    name: "Path",
  },
  [SectorHexTypes.Planet]: {
    Icon: PlanetIcon,
    color: "#2dd4bf",
    name: "Planet",
  },
  [SectorHexTypes.Settlement]: {
    Icon: SettlementIcon,
    color: "#e2e8f0",
    name: "Settlement",
  },
  [SectorHexTypes.Star]: { Icon: StarIcon, color: "#eab308", name: "Star" },
  [SectorHexTypes.Derelict]: {
    Icon: DerelictIcon,
    color: "#f59e0b",
    name: "Derelict",
  },
  [SectorHexTypes.Vault]: {
    Icon: VaultIcon,
    color: "#38bdf8",
    name: "Vault",
  },
  [SectorHexTypes.Other]: {
    Icon: SightingIcon,
    color: "#4ade80",
    name: "Other",
  },
};
