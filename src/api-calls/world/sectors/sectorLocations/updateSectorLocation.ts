import { updateDoc } from "firebase/firestore";
import { getSectorLocationDoc } from "./_getRef";
import { createApiFunction } from "api-calls/createApiFunction";
import { SectorLocationDocument } from "api-calls/world/sectors/sectorLocations/_sectorLocations.type";

interface Params {
  worldId: string;
  sectorId: string;
  locationId: string;
  location: Partial<SectorLocationDocument>;
}

export const updateSectorLocation = createApiFunction<Params, void>(
  (params) => {
    const { worldId, sectorId, locationId, location } = params;

    return new Promise((resolve, reject) => {
      updateDoc(getSectorLocationDoc(worldId, sectorId, locationId), location)
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
