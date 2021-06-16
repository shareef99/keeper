import { useAuth } from "../context/AuthContext";
import CreateNote from "../components/Notes/CreateNote";
import Note from "../components/Notes/Note";
import Zoom from "@material-ui/core/Zoom";
import { useFetchNotes } from "../hooks/notes";

interface Props {}

const Notes = (props: Props) => {
    const { logout } = useAuth();
    const notes = useFetchNotes();

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
                        />
                    ))}
                </ul>
                <button onClick={logout}>logout</button>
            </div>
        </section>
    );
};

export default Notes;
