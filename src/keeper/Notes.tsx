import { useAuth } from "../context/AuthContext";
import CreateNote from "../components/Notes/CreateNote";
import { NoteType, OptionalNote, TitleNContent } from "../interface";
import { useEffect, useState } from "react";
import Note from "../components/Notes/Note";
import { db } from "../firebase/config";
import Zoom from "@material-ui/core/Zoom";
import { getCurrentTime, getNoteRef } from "../helpers/notes";

interface Props {}

const Notes = (props: Props) => {
    // Context
    const { user, logout } = useAuth();

    // State
    const [notes, setNotes] = useState<Array<NoteType>>([]);
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    // Effects
    useEffect(() => {
        db.collection("users")
            .doc(user?.uid)
            .collection("notes")
            .onSnapshot((snap) =>
                setNotes(
                    snap.docs.map((doc) => ({
                        id: doc.data().id,
                        title: doc.data().title,
                        content: doc.data().content,
                        createdAt: doc.data().createdAt,
                        lastEditedAt: doc.data().lastEditedAt || "Original",
                    }))
                )
            );
    }, [user?.uid]);

    // Handlers / Functions
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

    const deleteNote = async (id: string) => {
        await getNoteRef(user?.uid!, id).delete();
    };

    const updateNote = async (note: OptionalNote, id: string) => {
        const noteRef = getNoteRef(user?.uid!, id);
        const { title, content } = note;

        const newTitle = title?.trim() || "Untitled";
        const newContent = content?.trim() || "Empty note...";
        const lastEditedAt = getCurrentTime();

        const updatedNote = {
            id,
            title: newTitle,
            content: newContent,
            lastEditedAt,
        };

        await noteRef.update(updatedNote);
    };

    const handleExpanded = (e: any) => {
        if (e.target.id === "title" || e.target.id === "content")
            return setIsExpanded(true);
        setIsExpanded(false);
    };

    return (
        <section>
            <div onClick={handleExpanded}>
                <CreateNote onAddNote={addNote} isExpanded={isExpanded} />
                <ul className="flex justify-center flex-wrap items-start">
                    {notes.length < 1 && (
                        <Zoom in={true}>
                            <li className="font-medium text-2xl my-40 text-center px-2">
                                Welcome to keeper, anything in mind? Write it
                                down
                            </li>
                        </Zoom>
                    )}
                    {notes.map((note, index) => (
                        <Note
                            key={index}
                            id={note.id!}
                            index={index}
                            title={note.title}
                            content={note.content}
                            onDeleteNote={deleteNote}
                            onUpdateNote={updateNote}
                        />
                    ))}
                </ul>
                <button onClick={logout}>logout</button>
            </div>
        </section>
    );
};

export default Notes;
