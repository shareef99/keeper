import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { getNoteRef } from "../helpers/notes";
import { useAuth } from "./AuthContext";

interface noteContextType {
    deleteNote: (id: string) => Promise<void>;
}

const noteContextDefaultValues: noteContextType = {
    deleteNote: (id: string) => new Promise((resolve) => resolve()),
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

    const value = {
        deleteNote,
    };

    return (
        <>
            <NoteContext.Provider value={value}>
                {children}
            </NoteContext.Provider>
        </>
    );
}
