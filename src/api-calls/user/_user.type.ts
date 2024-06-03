import { ReferenceSidebarLocation } from "types/Layouts.type";

export interface UserDocument {
  displayName: string;
  photoURL?: string;
  hidePhoto?: boolean;
  updateAlerts?: {
    homebrewMigration: boolean;
  };
  layout?: {
    referenceSidebarLocation?: ReferenceSidebarLocation;
  };
}
