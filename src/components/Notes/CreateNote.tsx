import { ChangeEvent, FormEvent, useState } from "react";
import { NoteType } from "../../interface";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

interface Props {
    onAddNote: (note: NoteType) => void;
}

const CreateNote = ({ onAddNote }: Props) => {
    // States
    const [note, setNote] = useState<NoteType>({ title: "", content: "" });
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    // Handlers
    const updateNote = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setNote((prevNote) => ({ ...prevNote, [name]: value }));
    };

    const submitNote = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setNote({ title: "", content: "" });
        onAddNote(note);
    };

    return (
        <form
            onSubmit={submitNote}
            className="create-note relative bg-gray-200 container sm:max-w-lg p-4 mx-auto mt-8 mb-5
                rounded-lg shadow-2xl"
        >
            {isExpanded && (
                <input
                    name="title"
                    value={note.title}
                    placeholder="Title"
                    onChange={updateNote}
                    className="w-full border-none p-1 outline-none resize-none text-lg 
                        bg-gray-200"
                />
            )}
            <textarea
                name="content"
                value={note.content}
                placeholder="Take a note..."
                rows={isExpanded ? 3 : 1}
                onClick={() => setIsExpanded(true)}
                onChange={updateNote}
                className="w-full border-none p-1 outline-none resize-none text-lg bg-gray-200"
            />
            <Zoom in={isExpanded}>
                <Fab
                    type="submit"
                    style={{
                        position: "absolute",
                        right: "18px",
                        bottom: "-18px",
                        backgroundColor: "var(--yellow)",
                        color: "var(--white)",
                        border: "none",
                        borderRadius: "50%",
                        width: "36px",
                        height: "36px",
                        cursor: "pointer",
                        outline: "none",
                    }}
                >
                    <AddIcon />
                </Fab>
            </Zoom>
        </form>
    );
};

export default CreateNote;
