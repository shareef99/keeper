import { useAuth } from "../context/AuthContext";
import CreateNote from "../components/Notes/CreateNote";
import { NoteType } from "../interface";
import { useState } from "react";
import dummyNotes from "../notes";
import Note from "../components/Notes/Note";
// import { db } from "../firebase/config";

interface Props {}

const Notes = (props: Props) => {
    // Context
    const { user, logout } = useAuth();

    // State
    const [notes, setNotes] = useState<Array<NoteType>>(dummyNotes);

    const addNote = (note: NoteType) => {
        setNotes((prevNotes) => [...prevNotes, note]);
    };

    const deleteNote = (id: number) => {
        setNotes((prevNotes) =>
            prevNotes.filter((note, index) => index !== id)
        );
    };

    return (
        <section>
            <div>
                <CreateNote onAddNote={addNote} />
                <ul className="flex justify-center flex-wrap items-start">
                    {notes.map((note, index) => (
                        <Note
                            key={index}
                            id={index}
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
