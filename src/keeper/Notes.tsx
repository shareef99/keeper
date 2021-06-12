import { useAuth } from "../context/AuthContext";
import CreateNote from "../components/Notes/CreateNote";
import { NoteType } from "../interface";
import { useState } from "react";
import Note from "../components/Notes/Note";
import { db } from "../firebase/config";
import { getNotesRef } from "../helpers/notes";

interface Props {}

const Notes = (props: Props) => {
    // Context
    const { user, logout } = useAuth();

    // State
    const [notes, setNotes] = useState<Array<NoteType>>([]);

    db.collection("users")
        .doc(user?.uid)
        .collection("notes")
        .onSnapshot((snap) =>
            setNotes(
                snap.docs.map((doc) => ({
                    id: doc.data().id,
                    title: doc.data().title,
                    content: doc.data().content,
                }))
            )
        );

    const addNote = async (note: NoteType) => {
        let { title, content } = note;

        const id = title + Math.floor(Math.random() * 1000000);

        if (title === "") {
            title = "untitled";
        }

        await db
            .collection("users")
            .doc(user?.uid)
            .collection("notes")
            .doc(id)
            .set({ title, content, id });
    };

    const deleteNote = async (id: string) => {
        const notesRef = getNotesRef(user?.uid!);

        await notesRef.doc(id).delete();

        console.log("Deleted");
    };

    return (
        <section>
            <div>
                <CreateNote onAddNote={addNote} />
                <ul className="flex justify-center flex-wrap items-start">
                    {notes.map((note, index) => (
                        <Note
                            key={index}
                            id={note.id!}
                            index={index}
                            title={note.title}
                            content={note.content}
                            onDeleteNote={deleteNote}
                        />
                    ))}
                </ul>
                <button onClick={logout}>logout</button>
            </div>
        </section>
    );
};

export default Notes;
