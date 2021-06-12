import { useState } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { NoteFormType, NoteType } from "../../interface";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import { useEffect } from "react";

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
    const [content, setContent] = useState<string>("");
    const [rows, setRows] = useState<number>(3);

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
        setRows(3);
        console.log(values);

        actions.setSubmitting(false);
        actions.resetForm();
    };

    const handleContentHeight = (e: any) => {
        const lastIndex = content.length - 1;

        setTimeout(() => {
            if (e.code === "Enter") {
                setRows((prevRows) => prevRows + 1);
            }

            if (e.code === "Backspace" && content.charAt(lastIndex) === "\n") {
                setRows((prevRows) => prevRows - 1);
            }
        }, 0);
    };

    return (
        <Formik initialValues={initialValues} onSubmit={submitNote}>
            {({ values }) => {
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
                                placeholder="Title"
                                className="w-full border-none p-1 outline-none resize-none text-lg 
                            bg-gray-200 form"
                            />
                        )}
                        {setContent(values.content)}
                        <Field
                            as="textarea"
                            name="content"
                            id="content"
                            onKeyDown={handleContentHeight}
                            placeholder="Take a note..."
                            rows={isExpanded ? rows : 1}
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
                                className="form"
                            >
                                <AddIcon />
                            </Fab>
                        </Zoom>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default CreateNote;
