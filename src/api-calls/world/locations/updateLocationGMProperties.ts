import { setDoc } from "firebase/firestore";
import { GMLocation } from "types/Locations.type";
import { getPrivateDetailsLocationDoc } from "./_getRef";
import { createApiFunction } from "api-calls/createApiFunction";

interface Params {
  worldId: string;
  locationId: string;
  locationGMProperties: Partial<GMLocation>;
}

export const updateLocationGMProperties = createApiFunction<Params, void>(
  (params) => {
    const { worldId, locationId, locationGMProperties } = params;

    return new Promise((resolve, reject) => {
      setDoc(
        getPrivateDetailsLocationDoc(worldId, locationId),
        locationGMProperties,
        { merge: true }
      )
        .then(() => {
          resolve();
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  "Failed to update location."
);
