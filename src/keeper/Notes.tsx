import { useAuth } from "../context/AuthContext";
import CreateNote from "../components/Notes/CreateNote";
import { NoteType, OptionalNote } from "../interface";
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

    return (
        <section>
            <div>
                <CreateNote />
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
