export enum IconColors {
  Pink = "pink",
  Red = "red",
  Orange = "orange",
  Yellow = "yellow",
  Green = "green",
  Blue = "blue",
  Purple = "purple",
  White = "white",
  Grey = "grey",
  Brown = "brown",
}

export interface IconDefinition {
  key: string | null;
  color: IconColors | null;
}

export interface RequiredIconDefinition {
  key: string;
  color: IconColors;
}
