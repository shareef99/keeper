import { MdDelete } from "react-icons/md";
import Zoom from "@material-ui/core/Zoom";
import { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import UpdateNote from "./UpdateNote";
import { OptionalNote } from "../../interface";
import { useCallback } from "react";
import { useNote } from "../../context/NoteContext";

interface Props {
    id: string;
    index: number;
    title: string;
    content: string;
    onUpdateNote: (note: OptionalNote, id: string) => void;
}

const Note = (props: Props) => {
    const { id, index, title, content, onUpdateNote } = props;

    // Context
    const { deleteNote } = useNote();

    // States
    const [selectedNote, setSelectedNote] = useState<string>("none");
    const [note, setNote] = useState<OptionalNote | null>(null);

    // Handlers
    const handleClose = () => {
        setSelectedNote("none");
        if (note) {
            onUpdateNote(note, id);
        }
    };

    const handleSetNote = useCallback((note: OptionalNote) => {
        setNote(note);
    }, []);

    return (
        <>
            <Zoom in={true} style={{ transitionDelay: `${300 * index}ms` }}>
                <li
                    className={`p-3 w-60 m-4 rounded-lg bg-gray-300 shadow-lg 
                `}
                    aria-label={id}
                    onClick={() => setSelectedNote(id)}
                >
                    <h1 className="mb-4 text-xl font-medium">{title}</h1>
                    <p
                        className="mb-3 whitespace-pre-wrap text-lg"
                        style={{ wordWrap: "break-word" }}
                    >
                        {content}
                    </p>
                    <button
                        onClick={() => deleteNote(id)}
                        className="relative float-right cursor-pointer hover:text-red-400"
                        title="Delete note"
                    >
                        <MdDelete size="1.75rem" color="#555" />
                    </button>
                </li>
            </Zoom>
            <Dialog
                onClose={handleClose}
                open={id === selectedNote}
                className=""
            >
                <UpdateNote
                    id={id}
                    title={title}
                    content={content}
                    onUpdateNote={onUpdateNote}
                    onSetNote={handleSetNote}
                    onClose={handleClose}
                />
            </Dialog>
        </>
    );
};

export default Note;
