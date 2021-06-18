import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import CreateNote from "../components/Notes/CreateNote";
import Note from "../components/Notes/Note";
import Zoom from "@material-ui/core/Zoom";
import { useFetchNotes } from "../lib/hooks/notes";

interface Props {}

const Notes = (props: Props) => {
    const { logout } = useAuth();
    const notes = useFetchNotes();

    // State
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    return (
        <section>
            <div
                onClick={(e: any) => {
                    if (e.target.id === "notes-list")
                        return setIsExpanded(false);
                    setIsExpanded(true);
                }}
            >
                <CreateNote isExpanded={isExpanded} />
                <ul
                    id="notes-list"
                    className="flex justify-center flex-wrap items-start"
                >
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
                        />
                    ))}
                </ul>
                <button onClick={logout}>logout</button>
            </div>
        </section>
    );
};

export default Notes;
