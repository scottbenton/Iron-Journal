import { CharacterDocument } from "api-calls/character/_character.type";
import { Unsubscribe } from "firebase/firestore";
import { StoredAsset } from "types/Asset.type";
import { ProgressTrack, TrackTypes } from "types/Track.type";

export interface CampaignCharactersSliceData {
  characterMap: Record<string, CharacterDocument>;
  characterAssets: { [characterId: string]: StoredAsset[] };

  characterTracks: {
    [characterId: string]: {
      [TrackTypes.Fray]: {
        [key: string]: ProgressTrack;
      };
      [TrackTypes.Journey]: {
        [key: string]: ProgressTrack;
      };
      [TrackTypes.Vow]: {
        [key: string]: ProgressTrack;
      };
    };
  };
}
export interface CampaignCharactersSliceActions {
  listenToCampaignCharacters: (characterIds: string[]) => Unsubscribe;
  listenToCampaignCharacterAssets: (characterIds: string[]) => Unsubscribe;
  listenToCampaignCharacterTracks: (characterIds: string[]) => Unsubscribe;

  updateCharacter: (
    characterId: string,
    character: Partial<CharacterDocument>
  ) => Promise<void>;

  resetStore: () => void;
}

export type CampaignCharactersSlice = CampaignCharactersSliceData &
  CampaignCharactersSliceActions;
