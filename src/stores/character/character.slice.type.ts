import { Unsubscribe } from "firebase/firestore";
import { AssetDocument } from "api-calls/assets/_asset.type";
import { CurrentCharacterSlice } from "./currentCharacter/currentCharacter.slice.type";
import {
  CharacterDocument,
  StatsMap,
} from "api-calls/character/_character.type";

export interface CharacterSliceData {
  characterMap: { [characterId: string]: CharacterDocument };
  characterPortraitMap: {
    [characterId: string]: { filename: string; url?: string; loading: boolean };
  };
  error?: string;
  loading: boolean;
}

export interface CharacterSliceActions {
  subscribe: (uid?: string) => Unsubscribe | undefined;

  createCharacter: (
    name: string,
    stats: StatsMap,
    assets: AssetDocument[],
    portrait?: {
      image: File | string;
      scale: number;
      position: {
        x: number;
        y: number;
      };
    },
    expansionIds?: string[]
  ) => Promise<string>;
  deleteCharacter: (characterId: string) => Promise<void>;
  loadCharacterPortrait: (
    uid: string,
    characterId: string,
    filename?: string
  ) => void;
}

export type CharacterSlice = CharacterSliceData &
  CharacterSliceActions & {
    currentCharacter: CurrentCharacterSlice;
  };
