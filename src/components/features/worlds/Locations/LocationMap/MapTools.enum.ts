import { MapEntryBackgroundColors } from "types/Locations.type";

export enum MapTools {
  AddLocation,
  AddPath,
  MoveLocation,
  BackgroundPaint,
  BackgroundEraser,
}

interface BaseMapTool {
  type: MapTools;
}

export interface AddLocationTool extends BaseMapTool {
  type: MapTools.AddLocation;
  locationType: string;
}
export interface AddPathTool extends BaseMapTool {
  type: MapTools.AddPath;
}
export interface MoveLocationTool extends BaseMapTool {
  type: MapTools.MoveLocation;
  locationId: string;
}
export interface BackgroundPaintTool extends BaseMapTool {
  type: MapTools.BackgroundPaint;
  color: MapEntryBackgroundColors;
}
export interface BackgroundEraserTool extends BaseMapTool {
  type: MapTools.BackgroundEraser;
}

export type MapTool =
  | AddLocationTool
  | AddPathTool
  | MoveLocationTool
  | BackgroundPaintTool
  | BackgroundEraserTool;

export const draggableMapTools = [
  MapTools.BackgroundPaint,
  MapTools.BackgroundEraser,
];
