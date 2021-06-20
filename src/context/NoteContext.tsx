import { createContext, ReactNode, useContext, useState } from "react";
import { getCurrentTime, getNoteRef, getUserRef } from "../lib/helpers/notes";
import { NoteType, OptionalNote, TitleNContent } from "../lib/interface";
import { useAuth } from "./AuthContext";

interface noteContextType {
    deleteNote: (id: string) => Promise<void>;
    addNote: (note: TitleNContent) => Promise<void>;
    updateNote: (note: OptionalNote, id: string) => Promise<void>;
    addLabel: (label: string) => Promise<void>;
    updateLabelsOfNote: (
        labels: string,
        id: string,
        state: boolean
    ) => Promise<void>;
    updateInitialNoteLabels: (label: string, state: boolean) => void;
    initialNoteLabels: Array<string>;
}

const noteContextDefaultValues: noteContextType = {
    addNote: () => new Promise((resolve) => resolve()),
    updateNote: () => new Promise((resolve) => resolve()),
    deleteNote: () => new Promise((resolve) => resolve()),
    addLabel: () => new Promise((resolve) => resolve()),
    updateLabelsOfNote: () => new Promise((resolve) => resolve()),
    updateInitialNoteLabels: () => {},
    initialNoteLabels: [],
};

const NoteContext = createContext<noteContextType>(noteContextDefaultValues);

export function useNote() {
    return useContext(NoteContext);
}

interface Props {
    children: ReactNode;
}

export function NoteProvider({ children }: Props) {
    const { user } = useAuth();
    const [initialNoteLabels, setInitialNoteLabels] = useState<Array<string>>(
        []
    );

    const deleteNote = async (id: string) => {
        await getNoteRef(user?.uid!, id).delete();
    };

    const addNote = async (note: TitleNContent) => {
        let { title, content } = note;

        const id = title + Math.floor(Math.random() * 10000000);
        const createdAt = getCurrentTime();
        if (title === "") {
            title = "untitled";
        }

        const noteRef = getNoteRef(user?.uid!, id);
        const newNote: NoteType = {
            id,
            title,
            content,
            createdAt,
            noteLabels: initialNoteLabels,
            lastEditedAt: "Original",
        };
        await noteRef.set(newNote);
    };

    const updateNote = async (note: OptionalNote, id: string) => {
        const noteRef = getNoteRef(user?.uid!, id);
        const { title, content } = note;
        const prevTitle = (await noteRef.get()).data()?.title;
        const prevContent = (await noteRef.get()).data()?.content;

        const newTitle = title?.trim() || prevTitle || "Untitled";
        const newContent = content?.trim() || prevContent || "Empty note...";
        const lastEditedAt = getCurrentTime();

        const updatedNote = {
            id,
            title: newTitle,
            content: newContent,
            lastEditedAt,
        };

        console.log("updating notes");

        await noteRef.update(updatedNote);
    };

    const addLabel = async (label: string) => {
        const userRef = getUserRef(user?.uid!);
        const prevLabels = (await userRef.get()).data()?.userLabels || [];
        // End function if label already exists
        if (prevLabels.includes(label)) return;
        const newLabels = [...prevLabels, label];
        userRef.update({ userLabels: newLabels });
    };

    const updateLabelsOfNote = async (
        label: string,
        id: string,
        state: boolean
    ) => {
        const noteRef = getNoteRef(user?.uid!, id);
        const prevLabels = (await noteRef.get()).data()?.noteLabels || [];
        // if state is true add the label else remove
        if (state) {
            const noteLabels = [...prevLabels, label];
            await noteRef.update({ noteLabels });
        } else {
            const noteLabels = prevLabels.filter((x: string) => x !== label);
            await noteRef.update({ noteLabels });
        }
    };

    const updateInitialNoteLabels = (label: string, state: boolean) => {
        if (state) {
            return setInitialNoteLabels((prevLabels) => [...prevLabels, label]);
        }
        setInitialNoteLabels((prevLabels) =>
            prevLabels.filter((x) => x !== label)
        );
    };

    const value = {
        addNote,
        updateNote,
        deleteNote,
        addLabel,
        updateLabelsOfNote,
        updateInitialNoteLabels,
        initialNoteLabels,
    };

    return (
        <>
            <NoteContext.Provider value={value}>
                {children}
            </NoteContext.Provider>
        </>
    );
}
