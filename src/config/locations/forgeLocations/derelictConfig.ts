import { ILocationConfig } from "config/locations.config";
import { IconColors } from "types/Icon.type";

export const derelictConfig: ILocationConfig = {
  defaultIcon: {
    key: "GiFragmentedMeteor",
    color: IconColors.Orange,
  },
  gmFields: [
    {
      key: "derelictLocation",
      label: "Location",
      type: "oracle",
      oracleId: "starforged/oracles/derelicts/location",
    },
    (locationId, location) => {
      const locationOracleId = location.gmProperties?.fields?.derelictLocation
        ?.toLocaleLowerCase()
        .replaceAll(" ", "_");

      return {
        key: "derelictType",
        label: "Type",
        type: "oracle",
        oracleId: locationOracleId
          ? "starforged/oracles/derelicts/type/" + locationOracleId
          : "",
      };
    },
    {
      key: "derelictCondition",
      label: "Condition",
      type: "oracle",
      oracleId: "starforged/oracles/derelicts/condition",
    },
    {
      key: "derelictOuterFirstLook",
      label: "Outer First Look",
      type: "oracle",
      oracleId: "starforged/oracles/derelicts/outer_first_look",
    },
    {
      key: "derelictInnerFirstLook",
      label: "Inner First Look",
      type: "oracle",
      oracleId: "starforged/oracles/derelicts/inner_first_look",
    },
  ],
};
