import { useState } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { NoteFormType, NoteType } from "../../interface";
import Zoom from "@material-ui/core/Zoom";
import { BiPlus } from "react-icons/bi";
import { Fab } from "@material-ui/core";

interface Props {
    onAddNote: (note: NoteType) => void;
    isExpanded: boolean;
}

const CreateNote = ({ onAddNote, isExpanded }: Props) => {
    // Constants
    const initialValues: NoteFormType = {
        title: "",
        content: "",
    };

    // States
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [titleRows, setTitleRows] = useState<number>(1);
    const [contentRows, setContentRows] = useState<number>(2);

    // Handlers
    const submitNote = async (
        values: NoteFormType,
        actions: FormikHelpers<NoteFormType>
    ) => {
        let { content } = values;

        if (!content || content === "") {
            return;
        }

        onAddNote(values);
        // Resetting rows to default(3) values after submitting form
        setContentRows(2);
        setTitleRows(1);
        console.log(values);

        actions.setSubmitting(false);
        actions.resetForm();
    };

    const handleContentHeight = (e: any) => {
        const lastIndex = content.length - 1;

        if (e.code === "Enter") {
            setContentRows((prevRows) => prevRows + 1);
        }

        if (e.code === "Backspace" && content.charAt(lastIndex) === "\n") {
            setContentRows((prevRows) => prevRows - 1);
        }
    };

    const handleTitleHeight = (e: any) => {
        const lastIndex = title.length - 1;

        if (e.code === "Enter") {
            setTitleRows((prevRows) => prevRows + 1);
        }

        if (e.code === "Backspace" && title.charAt(lastIndex) === "\n") {
            setTitleRows((prevRows) => prevRows - 1);
        }
    };

    return (
        <Formik initialValues={initialValues} onSubmit={submitNote}>
            {({ values }) => {
                setContent(values.content);
                setTitle(values.title);
                return (
                    <Form
                        className={`relative bg-gray-200 container sm:max-w-lg p-4 mx-auto mt-8 mb-5
                    rounded-lg shadow-2xl`}
                    >
                        {isExpanded && (
                            <Field
                                as="textarea"
                                name="title"
                                id="title"
                                rows={titleRows}
                                onKeyDown={handleTitleHeight}
                                placeholder="Title"
                                className="w-full border-none p-1 outline-none resize-none text-lg 
                            bg-gray-200 form"
                            />
                        )}
                        <Field
                            as="textarea"
                            name="content"
                            id="content"
                            onKeyDown={handleContentHeight}
                            placeholder="Take a note..."
                            rows={isExpanded ? contentRows : 1}
                            className="w-full max-h-full border-none p-1 outline-none resize-none text-lg bg-gray-200"
                        />
                        <Zoom in={isExpanded}>
                            <Fab
                                type="submit"
                                style={{
                                    position: "absolute",
                                    right: "18px",
                                    bottom: "-18px",
                                    backgroundColor: "var(--yellow)",
                                    color: "var(--white)",
                                    border: "none",
                                    borderRadius: "50%",
                                    width: "36px",
                                    height: "36px",
                                    cursor: "pointer",
                                    outline: "none",
                                }}
                                title="Add notes"
                            >
                                <BiPlus size="1.45rem" />
                            </Fab>
                        </Zoom>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default CreateNote;
