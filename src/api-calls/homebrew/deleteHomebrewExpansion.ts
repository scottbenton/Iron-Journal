import {
  arrayRemove,
  deleteDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { getHomebrewCollectionDoc } from "./_getRef";
import { createApiFunction } from "api-calls/createApiFunction";
import { getCharacterCollection } from "api-calls/character/_getRef";
import { getCampaignCollection } from "api-calls/campaign/_getRef";

export const deleteHomebrewExpansion = createApiFunction<{ id: string }, void>(
  async (params) => {
    const { id } = params;

    const characterLoadPromise = getDocs(
      query(
        getCharacterCollection(),
        where("expansionIds", "array-contains", id)
      )
    );

    const campaignLoadPromise = getDocs(
      query(
        getCampaignCollection(),
        where("expansionIds", "array-contains", id)
      )
    );

    const characterSnapshot = await characterLoadPromise;
    const campaignSnapshot = await campaignLoadPromise;

    const promises: Promise<unknown>[] = [];

    characterSnapshot.docs.forEach((doc) => {
      promises.push(
        updateDoc(doc.ref, {
          expansionIds: arrayRemove(id),
        })
      );
    });
    campaignSnapshot.docs.forEach((doc) => {
      promises.push(
        updateDoc(doc.ref, {
          expansionIds: arrayRemove(id),
        })
      );
    });

    await Promise.all(promises);
    deleteDoc(getHomebrewCollectionDoc(id));
  },
  "Failed to delete expansion."
);
