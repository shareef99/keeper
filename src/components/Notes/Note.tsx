import { Delete } from "@material-ui/icons";

interface Props {
    id: number;
    title: string;
    content: string;
    onDeleteNote: (id: number) => void;
}

const Note = ({ id, title, content, onDeleteNote }: Props) => {
    const handleDeleteNote = () => {
        onDeleteNote(id);
    };

    return (
        <li className="note">
            <h1>{title}</h1>
            <p>{content}</p>
            <button onClick={handleDeleteNote}>
                <Delete />
            </button>
        </li>
    );
};

export default Note;
