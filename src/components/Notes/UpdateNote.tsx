import React, { FormEvent, useRef, useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase/config";
import { getNoteRef, getNotesRef } from "../../helpers/notes";
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

const UpdateNote = (props: Props) => {
    const { id, title, content, onUpdateNote, onSetNote, onClose } = props;
    // Refs
    const titleRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Content
    const { user } = useAuth();

    // States
    const [createdAt, setCreatedAt] = useState<string>("");
    const [lastEditedAt, setLastEditedAt] = useState<string>("");

    // Effects
    useEffect(() => {
        (async () => {
            const noteRef = await getNoteRef(user?.uid!, id).get();
            const createdAt = noteRef?.data()?.createdAt;
            const lastEditedAt = noteRef?.data()?.lastEditedAt;
            setCreatedAt(createdAt);
            setLastEditedAt(lastEditedAt);
        })();
    }, [user, id]);

    useEffect(() => {
        // This effect set the default values to title and content
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
        // This effect works as onChange and save the every change in onSetNote
        titleRef?.current?.addEventListener("input", (e) => {
            // I logged the value and check that innerText exist but I don't know why TS not getting it.
            // @ts-ignore
            const title = e.target?.innerText;
            onSetNote({ title });
        });
        contentRef?.current?.addEventListener("input", (e) => {
            // Same here as previous(title)
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
        // Closing Dialog.
        onClose();
    };

    return (
        <section>
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
                <div className="mt-8 py-3 flex justify-end items-center space-x-4">
                    <div>
                        <span>created at: {createdAt}</span>
                        <span>last edited at: {lastEditedAt}</span>
                    </div>
                    <span>Close</span>
                </div>
            </form>
            <div></div>
        </section>
    );
};

export default UpdateNote;
