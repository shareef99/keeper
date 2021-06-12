import { useAuth } from "../context/AuthContext";
import CreateNote from "../components/Notes/CreateNote";
import { NoteType } from "../interface";
import { useEffect, useState } from "react";
import Note from "../components/Notes/Note";
import { db } from "../firebase/config";
import Zoom from "@material-ui/core/Zoom";

interface Props {}

const Notes = (props: Props) => {
    // Context
    const { user, logout } = useAuth();

    // State
    const [notes, setNotes] = useState<Array<NoteType>>([]);
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

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
                    }))
                )
            );
    }, [user?.uid]);

    const addNote = async (note: NoteType) => {
        let { title, content } = note;

        const id = title + Math.floor(Math.random() * 10000000);

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
        await db
            .collection("users")
            .doc(user?.uid)
            .collection("notes")
            .doc(id)
            .delete();
    };

    return (
        <section>
            <div
                onClick={(e: any) => {
                    if (e.target.id === "title" || e.target.id === "content")
                        return setIsExpanded(true);

                    setIsExpanded(false);
                }}
            >
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
                        />
                    ))}
                </ul>
                <button onClick={logout}>logout</button>
            </div>
        </section>
    );
};

export default Notes;
