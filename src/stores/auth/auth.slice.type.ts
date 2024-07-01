import { UserDocument } from "api-calls/user/_user.type";
import { Unsubscribe, User } from "firebase/auth";
import { UpdateData } from "firebase/firestore";

export enum AUTH_STATE {
  LOADING,
  UNAUTHENTICATED,
  AUTHENTICATED,
}

export interface AuthSliceData {
  user?: User;
  uid: string;
  status: AUTH_STATE;
  userNameDialogOpen: boolean;
  userDoc?: UserDocument;
}

export interface AuthSliceActions {
  subscribe: () => Unsubscribe;
  subscribeToUser: (uid: string) => Unsubscribe;
  closeUserNameDialog: () => void;
  updateUserDoc: (doc: UpdateData<UserDocument>) => void;
}

export type AuthSlice = AuthSliceData & AuthSliceActions;
