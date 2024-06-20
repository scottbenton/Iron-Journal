import { addDoc } from "firebase/firestore";
import { convertToDatabase, getLocationCollection } from "./_getRef";
import { createApiFunction } from "api-calls/createApiFunction";
import { Location } from "types/Locations.type";

export const createSpecificLocation = createApiFunction<
  { worldId: string; location: Location },
  string
>((params) => {
  const { worldId, location } = params;
  return new Promise((resolve, reject) => {
    addDoc(getLocationCollection(worldId), convertToDatabase(location))
      .then((doc) => {
        resolve(doc.id);
      })
      .catch((e) => {
        reject(e);
      });
  });
}, "Failed to create a new location.");
