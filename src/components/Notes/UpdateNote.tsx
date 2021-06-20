import { FormEvent, useRef, useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNote } from "../../context/NoteContext";
import { getNoteRef } from "../../lib/helpers/notes";
import { useFetchNoteLabels } from "../../lib/hooks/notes";
import { OptionalNote } from "../../lib/interface";
import Options from "./components/Options";

interface Props {
    id: string;
    title: string;
    content: string;
    onSetNote: (note: OptionalNote) => void;
    onClose: () => void;
    labels: Array<string>;
}

const UpdateNote = (props: Props) => {
    const { id, title, content, onSetNote, onClose } = props;

    const noteLabels = useFetchNoteLabels(id);

    // Refs
    const titleRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Content
    const { user } = useAuth();
    const { updateNote } = useNote();

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
    const handleUpdateNote = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const updatedTitle = titleRef.current?.innerText || title || "Untitled";
        const updatedContent =
            contentRef.current?.innerText || content || "Empty note...";
        await updateNote({ title: updatedTitle, content: updatedContent }, id);
        // Closing Dialog.
        onClose();
    };

    return (
        <section>
            <form
                onSubmit={handleUpdateNote}
                className="p-4 bg-gray-200 min-w-[300px] xs:min-w-[400px] sm:min-w-[500px] rounded-lg"
            >
                <div
                    contentEditable={true}
                    className="w-full p-1 outline-none text-xl font-medium"
                    ref={titleRef}
                />
                <div
                    contentEditable={true}
                    className="w-full p-1 outline-none text-lg"
                    ref={contentRef}
                />
                <div className="mt-8 py-3 flex flex-col space-y-2">
                    <div className="flex items-center space-x-4 flex-wrap space-y-4">
                        <div className="mr-auto space-x-2 space-y-2">
                            {noteLabels.map((label, index) => (
                                <span
                                    key={index}
                                    className="bg-gray-500 rounded-2xl px-3 py-1"
                                >
                                    {label}
                                </span>
                            ))}
                        </div>
                        {lastEditedAt && (
                            <div className="">
                                <span>
                                    Edited{" "}
                                    <time className="font-medium text-black">
                                        {lastEditedAt}
                                    </time>
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="mr-auto rowCenter">
                            <span className="">
                                created{" "}
                                <time className="font-medium text-black">
                                    {createdAt}
                                </time>
                            </span>
                            <Options id={id} />
                        </div>
                        <button
                            type="submit"
                            className="cursor-pointer font-medium text-xl"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </form>
        </section>
    );
};

export default UpdateNote;
