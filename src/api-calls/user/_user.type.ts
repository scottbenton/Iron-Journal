import { ReferenceSidebarLocation } from "types/Layouts.type";

export interface UserDocument {
  displayName: string;
  photoURL?: string;
  hidePhoto?: boolean;
  appVersion?: string;
  layout?: {
    referenceSidebarLocation?: ReferenceSidebarLocation;
  };
  hideDice?: boolean;
}
