import { db } from "./firebase";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  Timestamp,
} from "firebase/firestore";

export interface AuthorizedUser {
  email: string;
  expirationDate: string;
  authorized: boolean;
}

export const addAuthorizedUser = async (
  email: string,
  expirationDate: Date,
) => {
  try {
    const formattedDate = expirationDate.toISOString().split("T")[0];
    await setDoc(doc(db, "authorizedUsers", email), {
      expirationDate: formattedDate,
      authorized: true,
      createdAt: Timestamp.now(),
    });
    return { success: true };
  } catch (error) {
    console.error("Error adding user:", error);
    return { error: "Failed to authorize user" };
  }
};

export const getAuthorizedUsers = async (): Promise<AuthorizedUser[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "authorizedUsers"));
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        email: doc.id,
        expirationDate: data.expirationDate,
        authorized: data.authorized,
      };
    });
  } catch (error) {
    console.error("Error getting users:", error);
    return [];
  }
};
