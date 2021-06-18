import { createContext, ReactNode, useContext } from "react";
import { getCurrentTime, getNoteRef, getUserRef } from "../lib/helpers/notes";
import { OptionalNote, TitleNContent } from "../lib/interface";
import { useAuth } from "./AuthContext";

interface noteContextType {
    deleteNote: (id: string) => Promise<void>;
    addNote: (note: TitleNContent) => Promise<void>;
    updateNote: (note: OptionalNote, id: string) => Promise<void>;
    addLabel: (label: string) => Promise<void>;
}

const noteContextDefaultValues: noteContextType = {
    addNote: () => new Promise((resolve) => resolve()),
    updateNote: () => new Promise((resolve) => resolve()),
    deleteNote: () => new Promise((resolve) => resolve()),
    addLabel: () => new Promise((resolve) => resolve()),
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
        await noteRef.set({ id, title, content, createdAt });
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

        await noteRef.update(updatedNote);
    };

    const addLabel = async (label: string) => {
        const userRef = getUserRef(user?.uid!);
        const prevLabels = (await userRef.get()).data()?.labels || [];
        const newLabels = [...prevLabels, label];
        userRef.update({ labels: newLabels });
    };

    // const addLabelToNote = async (label: string) => {};

    const value = {
        addNote,
        updateNote,
        deleteNote,
        addLabel,
    };

    return (
        <>
            <NoteContext.Provider value={value}>
                {children}
            </NoteContext.Provider>
        </>
    );
}
