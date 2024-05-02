import { TrackStatus, TrackTypes } from "types/Track.type";
import { CampaignTracksSliceData } from "./campaignTracks.slice.type";

export const defaultCampaignTracksSlice: CampaignTracksSliceData = {
  loadCompletedTracks: false,
  trackMap: {
    [TrackStatus.Active]: {
      [TrackTypes.Fray]: {},
      [TrackTypes.Journey]: {},
      [TrackTypes.Vow]: {},
      [TrackTypes.Clock]: {},
    },
    [TrackStatus.Completed]: {
      [TrackTypes.Fray]: {},
      [TrackTypes.Journey]: {},
      [TrackTypes.Vow]: {},
      [TrackTypes.Clock]: {},
    },
  },
  error: "",
  loading: false,
};
