import { World } from "api-calls/world/_world.type";
import { decodeWorld, getWorldCollection } from "./_getRef";
import { onSnapshot, or, query, where } from "firebase/firestore";

export function listenToUsersWorlds(
  uid: string,
  dataHandler: {
    onDocChange: (id: string, data: World) => void;
    onDocRemove: (id: string) => void;
    onLoaded: () => void;
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onError: (error: any) => void
) {
  const filter = or(
    where("ownerIds", "array-contains", uid ?? ""),
    where("campaignGuides", "array-contains", uid ?? "")
  );
  return onSnapshot(
    query(getWorldCollection(), filter),
    (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "removed") {
          dataHandler.onDocRemove(change.doc.id);
        } else {
          dataHandler.onDocChange(
            change.doc.id,
            decodeWorld(change.doc.data())
          );
        }
      });
      dataHandler.onLoaded();
    },
    (error) => onError(error)
  );
}
