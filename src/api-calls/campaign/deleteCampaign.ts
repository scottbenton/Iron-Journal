import { deleteDoc, deleteField, updateDoc } from "firebase/firestore";
import { getCharacterDoc } from "../character/_getRef";
import { getCampaignDoc } from "./_getRef";
import { createApiFunction } from "api-calls/createApiFunction";
import { deleteNotes } from "api-calls/notes/deleteNotes";
import { getCampaignSettingsDoc } from "api-calls/character-campaign-settings/_getRef";
import { deleteAllProgressTracks } from "api-calls/tracks/deleteAllProgressTracks";
import { deleteAllLogs } from "api-calls/game-log/deleteAllLogs";
import { deleteAllAssets } from "api-calls/assets/deleteAllAssets";

export const deleteCampaign = createApiFunction<
  { campaignId: string; characterIds: string[] },
  void
>((params) => {
  const { campaignId, characterIds } = params;

  return new Promise((resolve, reject) => {
    const characterPromises = characterIds.map((characterId) => {
      return updateDoc(getCharacterDoc(characterId), {
        campaignId: deleteField(),
      });
    });

    Promise.all(characterPromises)
      .then(() => {
        const promises: Promise<unknown>[] = [];

        promises.push(deleteDoc(getCampaignDoc(campaignId)));
        promises.push(deleteNotes({ campaignId }));
        promises.push(deleteAllLogs({ campaignId }));
        promises.push(deleteAllAssets({ campaignId }));
        promises.push(deleteAllProgressTracks({ campaignId }));
        promises.push(deleteDoc(getCampaignSettingsDoc(campaignId)));

        Promise.all(promises)
          .then(() => {
            resolve();
          })
          .catch((e) => {
            console.error(e);
            reject(e);
          });
      })
      .catch((e) => {
        reject(e);
        console.error(e);
      });
  });
}, "Failed to delete campaign.");
