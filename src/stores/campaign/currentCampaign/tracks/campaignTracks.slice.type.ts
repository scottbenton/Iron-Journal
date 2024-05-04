import { Unsubscribe } from "firebase/firestore";
import {
  Clock,
  ProgressTrack,
  TrackStatus,
  TrackTypes,
  Track,
} from "types/Track.type";

export interface CampaignTracksSliceData {
  loadCompletedTracks: boolean;
  trackMap: Record<
    TrackStatus,
    {
      [TrackTypes.Fray]: { [trackId: string]: ProgressTrack };
      [TrackTypes.Journey]: { [trackId: string]: ProgressTrack };
      [TrackTypes.Vow]: { [trackId: string]: ProgressTrack };
      [TrackTypes.Clock]: { [clockId: string]: Clock };
    }
  >;
  error?: string;
  loading: boolean;
}

export interface CampaignTracksSliceActions {
  subscribe: (campaignId: string, status?: TrackStatus) => Unsubscribe;

  addTrack: (track: Track) => Promise<void>;
  updateTrack: (trackId: string, track: Partial<Track>) => Promise<void>;

  updateCharacterTrack: (
    characterId: string,
    trackId: string,
    track: Partial<Track>
  ) => Promise<void>;

  setLoadCompletedTracks: () => void;

  resetStore: () => void;
}

export type CampaignTracksSlice = CampaignTracksSliceData &
  CampaignTracksSliceActions;
