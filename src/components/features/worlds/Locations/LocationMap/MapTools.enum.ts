export enum MapTools {
  AddLocation,
  AddPath,
  MoveLocation,
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

export type MapTool = AddLocationTool | AddPathTool | MoveLocationTool;
