import { createApiFunction } from "api-calls/createApiFunction";
import { PartialWithFieldValue, updateDoc } from "firebase/firestore";
import { getHomebrewLegacyTrackDoc } from "./_getRef";
import { HomebrewLegacyTrackDocument } from "api-calls/homebrew/rules/legacyTracks/_homebrewLegacyTrack.type";

export const updateHomebrewLegacyTrack = createApiFunction<
  {
    legacyTrackId: string;
    legacyTrack: PartialWithFieldValue<HomebrewLegacyTrackDocument>;
  },
  void
>((params) => {
  const { legacyTrackId, legacyTrack } = params;
  return new Promise((resolve, reject) => {
    updateDoc(getHomebrewLegacyTrackDoc(legacyTrackId), legacyTrack)
      .then(() => {
        resolve();
      })
      .catch(reject);
  });
}, "Failed to update legacy track.");
