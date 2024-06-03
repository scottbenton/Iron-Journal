import { onSnapshot } from "firebase/firestore";
import { getUsersDoc } from "./_getRef";
import { UserDocument } from "api-calls/user/_user.type";

export const listenToUserDoc = (
  uid: string,
  onUser: (user: UserDocument) => void
) => {
  return onSnapshot(
    getUsersDoc(uid),
    (snapshot) => {
      const user: UserDocument | undefined = snapshot.data();
      if (user) {
        onUser(user);
      }
    },
    (error) => console.error(error)
  );
};
