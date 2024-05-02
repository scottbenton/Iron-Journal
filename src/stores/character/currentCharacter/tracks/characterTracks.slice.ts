import { CreateSliceType } from "stores/store.type";
import { CharacterTracksSlice } from "./characterTracks.slice.type";
import { defaultCharacterTracksSlice } from "./characterTracks.slice.default";
import { listenToProgressTracks } from "api-calls/tracks/listenToProgressTracks";
import {
  Clock,
  ProgressTrack,
  TrackStatus,
  TrackTypes,
} from "types/Track.type";
import { addProgressTrack } from "api-calls/tracks/addProgressTrack";
import { updateProgressTrack } from "api-calls/tracks/updateProgressTrack";

export const createCharacterTracksSlice: CreateSliceType<
  CharacterTracksSlice
> = (set, getState) => ({
  ...defaultCharacterTracksSlice,

  subscribe: (characterId, status = TrackStatus.Active) => {
    const unsubscribe = listenToProgressTracks(
      undefined,
      characterId,
      status,
      (tracks) => {
        set((store) => {
          Object.keys(tracks).forEach((trackId) => {
            const track = tracks[trackId];
            switch (track.type) {
              case TrackTypes.Fray:
                store.characters.currentCharacter.tracks.trackMap[status][
                  TrackTypes.Fray
                ][trackId] = track as ProgressTrack;
                break;
              case TrackTypes.Journey:
                store.characters.currentCharacter.tracks.trackMap[status][
                  TrackTypes.Journey
                ][trackId] = track as ProgressTrack;
                break;
              case TrackTypes.Vow:
                store.characters.currentCharacter.tracks.trackMap[status][
                  TrackTypes.Vow
                ][trackId] = track as ProgressTrack;
                break;
              case TrackTypes.Clock:
                store.characters.currentCharacter.tracks.trackMap[status][
                  TrackTypes.Clock
                ][trackId] = track as Clock;
                break;
              default:
                break;
            }
          });
        });
      },
      (trackId, type) => {
        set((store) => {
          delete store.characters.currentCharacter.tracks.trackMap[status][
            type
          ][trackId];
        });
      },
      (error) => {
        console.error(error);
      }
    );

    if (!unsubscribe) {
      return () => {};
    }
    return unsubscribe;
  },

  addTrack: (track) => {
    const characterId =
      getState().characters.currentCharacter.currentCharacterId;
    return addProgressTrack({ characterId, track });
  },
  updateTrack: (trackId, track) => {
    const characterId =
      getState().characters.currentCharacter.currentCharacterId;
    return updateProgressTrack({ characterId, trackId, track });
  },

  setLoadCompletedTracks: () => {
    set((store) => {
      store.characters.currentCharacter.tracks.loadCompletedTracks = true;
    });
  },

  resetStore: () => {
    set((store) => {
      store.characters.currentCharacter.tracks = {
        ...store.characters.currentCharacter.tracks,
        ...defaultCharacterTracksSlice,
      };
    });
  },
});
