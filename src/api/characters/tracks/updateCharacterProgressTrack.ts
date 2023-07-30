import { CharacterNotFoundException } from "api/error/CharacterNotFoundException";
import { UserNotLoggedInException } from "api/error/UserNotLoggedInException";
import { useCharacterSheetStore } from "pages/Character/CharacterSheetPage/characterSheet.store";
import { updateDoc } from "firebase/firestore";
import { ApiFunction, useApiState } from "hooks/useApiState";
import { useAuth } from "providers/AuthProvider";
import { getCharacterTracksDoc } from "./_getRef";
import { StoredTrack, TRACK_TYPES } from "types/Track.type";

export const updateCharacterProgressTrack: ApiFunction<
  {
    uid?: string;
    characterId?: string;
    type: TRACK_TYPES;
    trackId: string;
    track: StoredTrack;
  },
  boolean
> = function (params) {
  const { uid, characterId, type, trackId, track } = params;
  return new Promise((resolve, reject) => {
    if (!uid) {
      reject(new UserNotLoggedInException());
      return;
    }

    if (!characterId) {
      reject(new CharacterNotFoundException());
      return;
    }

    updateDoc(
      getCharacterTracksDoc(uid, characterId),
      //@ts-ignore
      {
        [`${type}.${trackId}`]: track,
      }
    )
      .then(() => {
        resolve(true);
      })
      .catch((e) => {
        console.error(e);
        reject("Failed to update progress track");
      });
  });
};

export function useUpdateCharacterProgressTrack() {
  const { call, loading, error } = useApiState(updateCharacterProgressTrack);

  return {
    updateCharacterProgressTrack: call,
    loading,
    error,
  };
}

export function useUpdateCharacterSheetCharacterProgressTrack() {
  const uid = useAuth().user?.uid;
  const characterId = useCharacterSheetStore((store) => store.characterId);

  const { updateCharacterProgressTrack, loading, error } =
    useUpdateCharacterProgressTrack();

  return {
    updateCharacterProgressTrack: (params: {
      type: TRACK_TYPES;
      trackId: string;
      track: StoredTrack;
    }) => updateCharacterProgressTrack({ ...params, uid, characterId }),
    loading,
    error,
  };
}
