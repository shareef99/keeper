import { ChangeEvent, FormEvent, useState } from "react";
import { NoteType } from "../../interface/note";
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
        <form onSubmit={submitNote} className="create-note">
            {isExpanded && (
                <input
                    name="title"
                    value={note.title}
                    placeholder="Title"
                    onChange={updateNote}
                />
            )}
            <textarea
                name="content"
                value={note.content}
                placeholder="Take a note..."
                rows={isExpanded ? 3 : 1}
                onClick={() => setIsExpanded(true)}
                onChange={updateNote}
            />
            <Zoom in={isExpanded}>
                <Fab type="submit">
                    <AddIcon />
                </Fab>
            </Zoom>
        </form>
    );
};

export default CreateNote;
