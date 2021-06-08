interface Props {
    title: string;
    content: string;
}

const Note = ({ title, content }: Props) => {
    return (
        <li className="note">
            <h1>{title}</h1>
            <p>{content}</p>
        </li>
    );
};

export default Note;
