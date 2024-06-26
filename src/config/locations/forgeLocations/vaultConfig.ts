import { ILocationConfig } from "config/locations.config";
import { IconColors } from "types/Icon.type";

export const vaultConfig: ILocationConfig = {
  defaultIcon: {
    key: "GiMartyrMemorial",
    color: IconColors.Blue,
  },
  gmFields: [
    {
      key: "vaultLocation",
      label: "Location",
      type: "oracle",
      oracleId: "starforged/oracles/vaults/location",
    },
    {
      key: "vaultScale",
      label: "Scale",
      type: "oracle",
      oracleId: "starforged/oracles/vaults/scale",
    },
    {
      key: "vaultForm",
      label: "Form",
      type: "oracle",
      oracleId: "starforged/oracles/vaults/form",
    },
    {
      key: "vaultShape",
      label: "Shape",
      type: "oracle",
      oracleId: "starforged/oracles/vaults/shape",
    },
    {
      key: "vaultMaterial",
      label: "Material",
      type: "oracle",
      oracleId: "starforged/oracles/vaults/material",
    },
    {
      key: "vaultOuterFirstLook",
      label: "Trouble",
      type: "oracle",
      oracleId: "starforged/oracles/vaults/outer_first_look",
    },
    {
      key: "interiorTitle",
      label: "Interior",
      type: "section-title",
    },
    {
      key: "vaultInnerFirstLook",
      label: "First Look",
      type: "oracle",
      oracleId: "starforged/oracles/vaults/interior/first_look",
    },
    {
      key: "vaultInnerFeature",
      label: "Feature",
      type: "oracle",
      oracleId: "starforged/oracles/vaults/interior/feature",
    },
    {
      key: "vaultInnerPeril",
      label: "Peril",
      type: "oracle",
      oracleId: "starforged/oracles/vaults/interior/peril",
    },
    {
      key: "vaultInnerOpportunity",
      label: "Opportunity",
      type: "oracle",
      oracleId: "starforged/oracles/vaults/interior/opportunity",
    },
    {
      key: "sanctumTitle",
      label: "Sanctum",
      type: "section-title",
    },
    {
      key: "vaultSanctumPurpose",
      label: "Purpose",
      type: "oracle",
      oracleId: "starforged/oracles/vaults/sanctum/purpose",
    },
    {
      key: "vaultSanctumFeature",
      label: "Feature",
      type: "oracle",
      oracleId: "starforged/oracles/vaults/sanctum/feature",
    },
    {
      key: "vaultSanctumPeril",
      label: "Peril",
      type: "oracle",
      oracleId: "starforged/oracles/vaults/sanctum/peril",
    },
    {
      key: "vaultSanctumOpportunity",
      label: "Opportunity",
      type: "oracle",
      oracleId: "starforged/oracles/vaults/sanctum/opportunity",
    },
  ],
};
