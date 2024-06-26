import { ILocationConfig } from "config/locations.config";
import { IconColors } from "types/Icon.type";

export const ironlandsLocationConfig: ILocationConfig = {
  name: {
    oracleIds: [
      "classic/oracles/settlement/name/landscape_feature",
      "classic/oracles/settlement/name/manmade_edifice",
      "classic/oracles/settlement/name/creature",
      "classic/oracles/settlement/name/historical_event",
      "classic/oracles/settlement/name/old_world_language",
      "classic/oracles/settlement/name/environmental_aspect",
      [
        "classic/oracles/settlement/quick_name/prefix",
        "classic/oracles/settlement/quick_name/suffix",
      ],
    ],
  },
  gmFields: [
    {
      key: "descriptor",
      label: "Description",
      type: "oracle",
      oracleId: "classic/oracles/place/descriptor",
    },
    {
      key: "trouble",
      label: "Trouble",
      type: "oracle",
      oracleId: "classic/oracles/settlement/trouble",
    },
    {
      key: "locationFeatures",
      label: "Location Features",
      type: "oracle",
      oracleId: "classic/oracles/place/location",
    },
  ],
  showBasicBond: true,
  defaultIcon: {
    key: "GiCompass",
    color: IconColors.White,
  },
  locationTypeOverrides: {
    settlement: {
      label: "Settlement",
      config: {
        defaultIcon: {
          key: "GiVikingLonghouse",
          color: IconColors.Brown,
        },
      },
    },
    tower: {
      label: "Tower",
      config: {
        defaultIcon: {
          key: "GiStoneTower",
          color: IconColors.Grey,
        },
      },
    },
    ruin: {
      label: "Ruin",
      config: {
        defaultIcon: {
          key: "GiBrokenWall",
          color: IconColors.Grey,
        },
      },
    },
    camp: {
      label: "Camp",
      config: {
        defaultIcon: {
          key: "GiCampfire",
          color: IconColors.Orange,
        },
      },
    },
  },
};
