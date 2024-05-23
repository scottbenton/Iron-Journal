import { createApiFunction } from "api-calls/createApiFunction";
import { updateDoc } from "firebase/firestore";
import { getUsersDoc } from "./_getRef";

export const markUpdatesAsRead = createApiFunction<
  { uid: string; updateIds: string[] },
  void
>((params) => {
  const { uid, updateIds } = params;
  return new Promise((resolve, reject) => {
    const updateObj: Record<string, boolean> = {};
    updateIds.forEach((updateId) => {
      updateObj[`updateAlerts.${updateId}`] = false;
    });
    updateDoc(getUsersDoc(uid), updateObj).then(resolve).catch(reject);
  });
}, "Failed to mark updates as read.");
