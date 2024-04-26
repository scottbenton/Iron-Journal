import { Datasworn } from "@datasworn/core";
import { PartialWithFieldValue, Unsubscribe } from "firebase/firestore";
import {
  StoredHomebrewAsset,
  StoredHomebrewAssetCollection,
} from "types/homebrew/HomebrewAssets.type";
import {
  ExpansionDocument,
  HomebrewCollectionDocument,
} from "types/homebrew/HomebrewCollection.type";
import {
  StoredMove,
  StoredMoveCategory,
} from "types/homebrew/HomebrewMoves.type";
import {
  StoredOracleCollection,
  StoredOracleTable,
} from "types/homebrew/HomebrewOracles.type";
import {
  StoredConditionMeter,
  StoredImpact,
  StoredImpactCategory,
  StoredLegacyTrack,
  StoredNonLinearMeter,
  StoredStat,
} from "types/homebrew/HomebrewRules.type";

export interface HomebrewData<T> {
  data?: Record<string, T>;
  loaded: boolean;
  error?: string;
}

export interface HomebrewEntry {
  base: HomebrewCollectionDocument;

  stats?: HomebrewData<StoredStat>;
  conditionMeters?: HomebrewData<StoredConditionMeter>;
  nonLinearMeters?: HomebrewData<StoredNonLinearMeter>;
  impactCategories?: HomebrewData<StoredImpactCategory>;
  legacyTracks?: HomebrewData<StoredLegacyTrack>;

  oracleCollections?: HomebrewData<StoredOracleCollection>;
  oracleTables?: HomebrewData<StoredOracleTable>;
  dataswornOracles?: Record<string, Datasworn.OracleTablesCollection>;

  moveCategories?: HomebrewData<StoredMoveCategory>;
  moves?: HomebrewData<StoredMove>;
  dataswornMoves?: Record<string, Datasworn.MoveCategory>;

  assetCollections?: HomebrewData<StoredHomebrewAssetCollection>;
  assets?: HomebrewData<StoredHomebrewAsset>;
  dataswornAssets?: Record<string, Datasworn.AssetCollection>;
}

export interface HomebrewSliceData {
  sortedHomebrewCollectionIds: string[];
  collections: Record<string, HomebrewEntry>;
  loading: boolean;
  error?: string;
}

export interface HomebrewSliceActions {
  subscribe: (uid: string) => Unsubscribe;
  subscribeToHomebrewContent: (homebrewIds: string[]) => Unsubscribe;

  createExpansion: (expansion: ExpansionDocument) => Promise<string>;
  updateExpansion: (
    expansionId: string,
    expansion: PartialWithFieldValue<HomebrewCollectionDocument>
  ) => Promise<void>;
  deleteExpansion: (expansionId: string) => Promise<void>;

  createStat: (stat: StoredStat) => Promise<void>;
  updateStat: (statId: string, stat: StoredStat) => Promise<void>;
  deleteStat: (statId: string) => Promise<void>;

  createConditionMeter: (conditionMeter: StoredConditionMeter) => Promise<void>;
  updateConditionMeter: (
    conditionMeterId: string,
    conditionMeter: StoredConditionMeter
  ) => Promise<void>;
  deleteConditionMeter: (conditionMeterId: string) => Promise<void>;

  createNonLinearMeter: (meter: StoredNonLinearMeter) => Promise<void>;
  updateNonLinearMeter: (
    meterId: string,
    meter: StoredNonLinearMeter
  ) => Promise<void>;
  deleteNonLinearMeter: (meterId: string) => Promise<void>;

  createImpactCategory: (category: StoredImpactCategory) => Promise<void>;
  updateImpactCategory: (
    impactCategoryId: string,
    impactCategory: StoredImpactCategory
  ) => Promise<void>;
  deleteImpactCategory: (impactCategoryId: string) => Promise<void>;
  updateImpact: (
    impactCategoryId: string,
    impact: StoredImpact
  ) => Promise<void>;
  deleteImpact: (impactCategoryId: string, impactId: string) => Promise<void>;

  createLegacyTrack: (legacyTrack: StoredLegacyTrack) => Promise<void>;
  updateLegacyTrack: (
    legacyTrackId: string,
    legacyTrack: StoredLegacyTrack
  ) => Promise<void>;
  deleteLegacyTrack: (legacyTrackId: string) => Promise<void>;

  createOracleCollection: (
    oracleCollection: StoredOracleCollection
  ) => Promise<void>;
  updateOracleCollection: (
    oracleCollectionId: string,
    oracleCollection: PartialWithFieldValue<StoredOracleCollection>
  ) => Promise<void>;
  deleteOracleCollection: (
    homebrewId: string,
    oracleCollectionId: string
  ) => Promise<void>;

  createOracleTable: (oracleTable: StoredOracleTable) => Promise<void>;
  updateOracleTable: (
    oracleTableId: string,
    oracleTable: PartialWithFieldValue<StoredOracleTable>
  ) => Promise<void>;
  deleteOracleTable: (oracleTableId: string) => Promise<void>;

  updateDataswornOracles: (homebrewId: string) => void;

  createMoveCategory: (moveCategory: StoredMoveCategory) => Promise<void>;
  updateMoveCategory: (
    moveCategoryId: string,
    moveCategory: StoredMoveCategory
  ) => Promise<void>;
  deleteMoveCategory: (
    homebrewId: string,
    moveCategoryId: string
  ) => Promise<void>;

  createMove: (move: StoredMove) => Promise<void>;
  updateMove: (
    moveId: string,
    move: PartialWithFieldValue<StoredMove>
  ) => Promise<void>;
  deleteMove: (moveId: string) => Promise<void>;

  updateDataswornMoves: (homebrewId: string) => void;

  createAssetCollection: (
    assetCollection: StoredHomebrewAssetCollection
  ) => Promise<void>;
  updateAssetCollection: (
    assetCollectionId: string,
    assetCollection: StoredHomebrewAssetCollection
  ) => Promise<void>;
  deleteAssetCollection: (
    homebrewId: string,
    assetCollectionId: string
  ) => Promise<void>;

  createAsset: (asset: StoredHomebrewAsset) => Promise<void>;
  updateAsset: (
    assetId: string,
    asset: PartialWithFieldValue<StoredHomebrewAsset>
  ) => Promise<void>;
  deleteAsset: (assetId: string) => Promise<void>;

  updateDataswornAssets: (homebrewId: string) => void;
}

export type HomebrewSlice = HomebrewSliceData & HomebrewSliceActions;
