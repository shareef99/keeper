import { MdDelete } from "react-icons/md";

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
        <li className="p-3 w-60 m-4 rounded-lg bg-gray-300 float-left">
            <h1 className="mb-4 text-xl font-medium">{title}</h1>
            <p
                className="mb-3 whitespace-pre-wrap text-lg font-light"
                style={{ wordWrap: "break-word" }}
            >
                {content}
            </p>
            <button
                onClick={handleDeleteNote}
                className="relative float-right cursor-pointer"
            >
                <MdDelete size="1.75rem" color="#555" />
            </button>
        </li>
    );
};

export default Note;
