import { FormEvent } from "react";
import { useRef } from "react";
import { PlusButton } from "../atoms/Buttons";
import { useNote } from "../../context/NoteContext";
import Options from "./components/Options";

interface Props {
    isExpanded: boolean;
}

const CreateNote = ({ isExpanded }: Props) => {
    // Context
    const { addNote } = useNote();

    // Refs
    const contentRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);

    // Handlers
    const submitNote = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let title = titleRef?.current?.innerText.trim() || "Untitled";
        let content = contentRef?.current?.innerText.trim() || "Empty note...";

        await addNote({ title, content });

        if (titleRef) {
            if (titleRef.current) {
                titleRef.current.innerText = "";
            }
        }

        if (contentRef) {
            if (contentRef.current) {
                contentRef.current.innerText = "";
            }
        }
    };

    return (
        <form
            onSubmit={submitNote}
            className="relative bg-gray-200 container sm:max-w-lg p-4 mx-auto mt-8 mb-5 rounded-lg 
                shadow-2xl"
            id="create-note"
        >
            {isExpanded && (
                <div
                    id="title"
                    contentEditable={true}
                    ref={titleRef}
                    data-placeholder="Title"
                    className="w-full p-1 outline-none text-xl font-medium bg-gray-200 editableTitle"
                />
            )}
            <div
                id="content"
                contentEditable={true}
                ref={contentRef}
                data-placeholder="Take a note..."
                className="w-full p-1 outline-none text-lg bg-gray-200 editableContent"
            />
            {isExpanded && (
                <div id="options-container" className="mt-2 flex">
                    <Options />
                </div>
            )}
            <PlusButton
                className="flexCenter absolute right-[18px] -bottom-[18px] border-none rounded-full 
                        w-9 h-9 outline-none text-white bg-yellow-400 hover:bg-yellow-500
                        focus:bg-yellow-500 transitionIn"
                iconSize="1.45rem"
                type="submit"
            />
        </form>
    );
};

export default CreateNote;
