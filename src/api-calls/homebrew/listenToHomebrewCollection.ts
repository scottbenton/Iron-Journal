import { onSnapshot } from "firebase/firestore";
import { HomebrewCollectionDocument } from "types/homebrew/HomebrewCollection.type";
import { getHomebrewCollectionDoc } from "./_getRef";

export function listenToHomebrewCollection(
  collectionId: string,
  updateCollection: (collection: HomebrewCollectionDocument) => void,
  onError: (error: unknown) => void,
  onLoaded: () => void
) {
  return onSnapshot(
    getHomebrewCollectionDoc(collectionId),
    (snapshot) => {
      const data = snapshot.data();
      if (data) {
        updateCollection(data);
      } else {
        onLoaded();
      }
    },
    (error) => {
      console.error(error);
      onError(error);
    }
  );
}
