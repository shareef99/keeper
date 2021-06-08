interface Props {}

const CreateNote = (props: Props) => {
    return (
        <form>
            <input name="title" placeholder="Title" />
            <textarea name="content" placeholder="Take a note..." rows={3} />
            <button>Add</button>
        </form>
    );
};

export default CreateNote;
