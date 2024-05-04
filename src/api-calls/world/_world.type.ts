import { Bytes } from "firebase/firestore";
import { World } from "types/World.type";

export type WorldDocument = Omit<World, "worldDescription"> & {
  worldDescription?: Bytes;
};
