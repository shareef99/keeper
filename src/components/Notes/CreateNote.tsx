import { FormEvent } from "react";
import { NoteType } from "../../interface";
import Zoom from "@material-ui/core/Zoom";
import { useRef } from "react";
import { PlusButton } from "../atoms/Buttons";

interface Props {
    onAddNote: (note: NoteType) => void;
    isExpanded: boolean;
}

const CreateNote = ({ onAddNote, isExpanded }: Props) => {
    // Refs
    const contentRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);

    // Handlers
    const submitNote = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let title = titleRef?.current?.innerText.trim() || "Untitled";
        let content = contentRef?.current?.innerText.trim() || "Empty note...";

        onAddNote({ title, content });
    };

    return (
        <form
            onSubmit={submitNote}
            className="relative bg-gray-200 container sm:max-w-lg p-4 mx-auto mt-8 mb-5 rounded-lg 
                shadow-2xl"
        >
            <div
                id="title"
                contentEditable={true}
                ref={titleRef}
                data-placeholder="Title"
                className="w-full p-1 outline-none text-xl font-medium bg-gray-200 editableTitle"
            />
            <div
                id="content"
                contentEditable={true}
                ref={contentRef}
                data-placeholder="Content..."
                className="w-full p-1 outline-none text-lg bg-gray-200 editableContent"
            />
            <Zoom in={true}>
                <PlusButton
                    className="flexCenter absolute right-[18px] -bottom-[18px] border-none rounded-full 
                        w-9 h-9 outline-none text-white bg-yellow-400 hover:bg-yellow-500
                        transitionIn"
                    iconSize="1.45rem"
                    type="button"
                />
            </Zoom>
        </form>
    );
};

export default CreateNote;
