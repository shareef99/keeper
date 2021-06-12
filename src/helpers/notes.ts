import { db } from "../firebase/config";

export const getNotesRef = (uid: string) => {
    return db.collection("users").doc(uid).collection("notes");
};
