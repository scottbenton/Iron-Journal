import { CustomTrack } from "types/CustomTrackSettings.type";

// Will be deprecated in favor of the new Homebrew Content Management
export interface OracleAndMoveVisibilitySettings {
  hiddenCustomOraclesIds: string[];
  hiddenCustomMoveIds: string[];
  hideDelveMoves?: boolean;
  hideDelveOracles?: boolean;
}

export interface SettingsDocument extends OracleAndMoveVisibilitySettings {
  customStats: string[];
  customTracks: { [key: string]: CustomTrack };
}
