import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadImage = async (folder, file) => {
  if (!file || !folder) return null;

  // Create a storage reference
  const storageRef = ref(storage, `${folder}/${file.name}`);

  // Upload the file
  await uploadBytes(storageRef, file);

  // Get the download URL
  const url = await getDownloadURL(storageRef);

  return url; // Store this URL in MongoDB
};

export const storeTokenToCookies = async (cookies, token) => {
  cookies.set("token", token, {
    expires: Date.now() + process.env.COOKIE_EXPIRY * 24 * 60 * 60 * 1000,
  });
};
