export interface UserDocument {
  displayName: string;
  photoURL?: string;
  hidePhoto?: boolean;
  updateAlerts?: {
    homebrewMigration: boolean;
  };
}
