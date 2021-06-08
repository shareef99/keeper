import { ChangeEvent, FormEvent, useState } from "react";
import { NoteType } from "../../interface/note";

interface Props {
    onAddNote: (note: NoteType) => void;
}

const CreateNote = ({ onAddNote }: Props) => {
    // States
    const [note, setNote] = useState<NoteType>({ title: "", content: "" });

    // Handlers
    const updateNote = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setNote((prevNote) => ({ ...prevNote, [name]: value }));
    };

    const submitNote = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onAddNote(note);
    };

    return (
        <form onSubmit={submitNote}>
            <input
                name="title"
                value={note.title}
                placeholder="Title"
                onChange={updateNote}
            />
            <textarea
                name="content"
                value={note.content}
                placeholder="Take a note..."
                rows={3}
                onChange={updateNote}
            />
            <button type="submit">Add</button>
        </form>
    );
};

export default CreateNote;
