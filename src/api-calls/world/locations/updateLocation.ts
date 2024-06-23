import { UpdateData, updateDoc } from "firebase/firestore";
import { Location } from "types/Locations.type";
import { convertUpdateDataToDatabase, getLocationDoc } from "./_getRef";
import { createApiFunction } from "api-calls/createApiFunction";

interface LocationParams {
  worldId: string;
  locationId: string;
  location: UpdateData<Location>;
}

export const updateLocation = createApiFunction<LocationParams, void>(
  (params) => {
    const { worldId, locationId, location } = params;

    return new Promise((resolve, reject) => {
      updateDoc(
        getLocationDoc(worldId, locationId),
        convertUpdateDataToDatabase(location)
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
