import { db } from "../firebase/config";

export const getNotesRef = (uid: string) => {
    return db.collection("users").doc(uid).collection("notes");
};

export const getNoteRef = (uid: string, noteId: string) => {
    return db.collection("users").doc(uid).collection("notes").doc(noteId);
};

export const getUserRef = (uid: string) => {
    return db.collection("users").doc(uid);
};

export const getCurrentTime = () => {
    return `${new Date().toLocaleDateString(undefined, {
        month: "short",
        day: "2-digit",
        year: "numeric",
    })}`;
};
