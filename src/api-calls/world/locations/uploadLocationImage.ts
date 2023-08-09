import { constructLocationImagesPath, getLocationDoc } from "./_getRef";
import {
  MAX_FILE_SIZE,
  MAX_FILE_SIZE_LABEL,
  uploadImage,
} from "lib/storage.lib";
import { updateDoc } from "firebase/firestore";
import { createApiFunction } from "api-calls/createApiFunction";

export const uploadLocationImage = createApiFunction<
  { worldId: string; locationId: string; image: File },
  void
>((params) => {
  const { worldId, locationId, image } = params;

  return new Promise((resolve, reject) => {
    const filename = image.name;

    if (image.size > MAX_FILE_SIZE) {
      reject(`Image must be smaller than ${MAX_FILE_SIZE_LABEL} in size.`);
      return;
    }

    uploadImage(constructLocationImagesPath(worldId, locationId), image)
      .then(() => {
        updateDoc(getLocationDoc(worldId, locationId), {
          imageFilenames: [filename],
        })
          .then(() => {
            resolve();
          })
          .catch((e) => {
            reject(e);
          });
      })
      .catch((e) => {
        reject(e);
      });
  });
}, "Failed to upload image");
