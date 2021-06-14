import React, { FormEvent, useRef } from "react";
import { useEffect } from "react";
import { OptionalNote } from "../../interface";
import { PlusButton } from "../atoms/Buttons";

interface Props {
    id: string;
    title: string;
    content: string;
    onUpdateNote: (note: OptionalNote, id: string) => void;
    onSetNote: (note: OptionalNote) => void;
    onClose: () => void;
}

const UpdateNote = ({
    id,
    title,
    content,
    onUpdateNote,
    onSetNote,
    onClose,
}: Props) => {
    // Refs
    const titleRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Effects
    useEffect(() => {
        if (titleRef) {
            if (titleRef.current) {
                titleRef.current.innerText = title;
            }
        }
        if (contentRef) {
            if (contentRef.current) {
                contentRef.current.innerText = content;
            }
        }
    }, [title, content]);

    useEffect(() => {
        titleRef?.current?.addEventListener("input", (e) => {
            // @ts-ignore
            const title = e.target?.innerText;
            onSetNote({ title });
        });
        contentRef?.current?.addEventListener("input", (e) => {
            // @ts-ignore
            const content = e.target?.innerText;
            onSetNote({ content });
        });
    }, [onSetNote]);

    // Handlers
    const updateNote = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const title = titleRef.current?.innerText || "Untitled";
        const content = contentRef.current?.innerText || "Empty note...";
        onUpdateNote({ title, content }, id);
        onClose();
    };

    return (
        <form
            onSubmit={updateNote}
            className="p-4 bg-gray-200 min-w-[300px] xs:min-w-[400px] sm:min-w-[500px] rounded-lg"
        >
            <div
                contentEditable={true}
                className="w-full p-1 outline-none text-xl font-medium"
                ref={titleRef}
            ></div>
            <div
                contentEditable={true}
                className="w-full p-1 outline-none text-lg"
                ref={contentRef}
            />
            <div className="flex justify-end">
                <PlusButton
                    type="submit"
                    className="flexCenter border-none rounded-full w-9 h-9 outline-none text-white 
                        bg-yellow-400 hover:bg-yellow-500 transitionIn"
                    iconSize="1.5rem"
                />
            </div>
        </form>
    );
};

export default UpdateNote;
