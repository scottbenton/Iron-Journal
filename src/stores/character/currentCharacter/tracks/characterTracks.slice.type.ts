import { Unsubscribe } from "firebase/firestore";
import {
  Clock,
  ProgressTrack,
  TrackStatus,
  TrackTypes,
  Track,
} from "types/Track.type";

export interface CharacterTracksSliceData {
  loadCompletedTracks: boolean;
  trackMap: Record<
    TrackStatus,
    {
      [TrackTypes.Fray]: { [trackId: string]: ProgressTrack };
      [TrackTypes.Journey]: { [trackId: string]: ProgressTrack };
      [TrackTypes.Vow]: { [trackId: string]: ProgressTrack };
      [TrackTypes.Clock]: { [trackId: string]: Clock };
    }
  >;
  error?: string;
  loading: boolean;
}

export interface CharacterTracksSliceActions {
  subscribe: (characterId: string, status?: TrackStatus) => Unsubscribe;

  addTrack: (track: Track) => Promise<void>;
  updateTrack: (trackId: string, track: Partial<Track>) => Promise<void>;

  setLoadCompletedTracks: () => void;
  resetStore: () => void;
}

export type CharacterTracksSlice = CharacterTracksSliceData &
  CharacterTracksSliceActions;
