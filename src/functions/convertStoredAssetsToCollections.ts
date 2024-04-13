import { Datasworn } from "@datasworn/core";
import { License } from "types/Datasworn";
import {
  StoredHomebrewAsset,
  StoredHomebrewAssetCollection,
} from "types/homebrew/HomebrewAssets.type";
import { convertIdPart } from "./dataswornIdEncoder";

const DEFAULT_SOURCE: Datasworn.SourceInfo = {
  title: "Homebrew Content",
  authors: [],
  date: "2000-01-01",
  url: "",
  license: License.None,
};

export function convertStoredAssetsToCollections(
  homebrewId: string,
  storedCollections: Record<string, StoredHomebrewAssetCollection>,
  storedAssets: Record<string, StoredHomebrewAsset>
): Record<string, Datasworn.AssetCollection> {
  const collections: Record<string, Datasworn.AssetCollection> = {};

  Object.keys(storedCollections).forEach((collectionId) => {
    const storedCollection = storedCollections[collectionId];
    collections[collectionId] = {
      _id: `${homebrewId}/collections/assets/${collectionId}`,
      name: storedCollection.label,
      replaces: storedCollection.replacesId,
      enhances: storedCollection.enhancesId,
      description: storedCollection.description,
      _source: DEFAULT_SOURCE,
      contents: {},
    };
  });

  Object.keys(storedAssets).forEach((assetId) => {
    const asset = storedAssets[assetId];
    const convertedAsset = convertStoredAsset(
      homebrewId,
      assetId,
      asset,
      collections[asset.categoryKey].name
    );

    const assetCollection = collections[asset.categoryKey];

    if (!assetCollection.contents) {
      assetCollection.contents = { [assetId]: convertedAsset };
    } else {
      assetCollection.contents[assetId] = convertedAsset;
    }
  });

  return collections;
}

function convertStoredAsset(
  homebrewId: string,
  assetId: string,
  asset: StoredHomebrewAsset,
  categoryLabel: string
): Datasworn.Asset {
  const dataswornAbilities: Datasworn.AssetAbility[] = asset.abilities?.map(
    (ability, index) => ({
      _id: index + "",
      text: ability.text,
      name: ability.name,
      enabled: ability.defaultEnabled ?? false,
    })
  );

  const dataswornOptions: Record<string, Datasworn.AssetOptionField> = {};
  asset.options?.forEach((option) => {
    const optionId = convertIdPart(option.label);
    if (option.type === "text") {
      dataswornOptions[optionId] = {
        label: option.label,
        field_type: "text",
        value: "",
      };
    } else {
      const choices: Record<string, Datasworn.SelectEnhancementFieldChoice> =
        {};

      (option.options ?? []).forEach((optionChoice) => {
        choices[optionChoice] = {
          label: optionChoice,
          choice_type: "choice",
        };
      });

      dataswornOptions[optionId] = {
        label: option.label,
        field_type: "select_enhancement",
        value: "",
        choices,
      };
    }
  });

  const dataswornControls: Record<string, Datasworn.AssetControlField> = {};
  asset.controls?.forEach((control) => {
    const controlId = convertIdPart(control.label);
    if (control.type === "checkbox") {
      dataswornControls[controlId] = {
        field_type: "checkbox",
        label: control.label,
        value: false,
        is_impact: false,
        disables_asset: false,
      };
    } else if (control.type === "select") {
      const choices: Record<string, Datasworn.SelectEnhancementFieldChoice> =
        {};

      (control.options ?? []).forEach((optionChoice) => {
        choices[optionChoice] = {
          label: optionChoice,
          choice_type: "choice",
        };
      });

      dataswornControls[controlId] = {
        label: control.label,
        field_type: "select_enhancement",
        value: "",
        choices,
      };
    } else if (control.type === "conditionMeter") {
      dataswornControls[controlId] = {
        label: control.label,
        field_type: "condition_meter",
        value: control.max,
        max: control.max,
        min: control.min,
        rollable: true,
      };
    }
  });

  return {
    _id: `${homebrewId}/assets/${asset.categoryKey}/${assetId}`,
    name: asset.label,
    count_as_impact: false,
    shared: false,
    _source: DEFAULT_SOURCE,

    requirement: asset.requirement,
    category: categoryLabel,
    abilities: dataswornAbilities,
    options: dataswornOptions,
    controls: dataswornControls,
  };
}
