import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { getNoteRef, getNotesRef, getUserRef } from "../helpers/notes";
import { NoteType } from "../interface";

export const useFetchNotes = () => {
    const [notes, setNotes] = useState<Array<NoteType>>([]);
    const { user } = useAuth();

    useEffect(() => {
        getNotesRef(user?.uid!).onSnapshot((snap) =>
            setNotes(
                snap.docs.map((doc) => ({
                    id: doc.data().id,
                    title: doc.data().title,
                    content: doc.data().content,
                    createdAt: doc.data().createdAt,
                    lastEditedAt: doc.data().lastEditedAt || "Original",
                    noteLabels: doc.data().noteLabels,
                }))
            )
        );
    }, [user?.uid]);

    return notes;
};

export const useFetchLabels = () => {
    const [userLabel, setUserLabels] = useState<Array<string>>([]);
    const { user } = useAuth();

    useEffect(() => {
        getUserRef(user?.uid!).onSnapshot((snap) =>
            setUserLabels(snap.data()?.userLabels || [])
        );
    }, [user?.uid]);

    return userLabel;
};

export const useFetchNoteLabels = (id: string) => {
    const [noteLabels, setNoteLabels] = useState<Array<string>>([]);
    const { user } = useAuth();

    useEffect(() => {
        getNoteRef(user?.uid!, id).onSnapshot((snap) =>
            setNoteLabels(snap.data()?.noteLabels || [])
        );
    }, [user?.uid, id]);

    return noteLabels;
};
