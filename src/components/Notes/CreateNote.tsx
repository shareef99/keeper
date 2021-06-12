import { useState } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { NoteFormType, NoteType } from "../../interface";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import { db } from "../../firebase/config";
import { useAuth } from "../../context/AuthContext";

interface Props {
    onAddNote: (note: NoteType) => void;
}

const CreateNote = ({ onAddNote }: Props) => {
    // Constants
    const initialValues: NoteFormType = {
        title: "",
        content: "",
    };

    // Context
    const { user } = useAuth();

    // States
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    // Handlers
    const submitNote = async (
        values: NoteFormType,
        actions: FormikHelpers<NoteFormType>
    ) => {
        let { title, content } = values;

        if (!content || content === "") {
            return;
        }

        const id = title + Math.floor(Math.random() * 1000000);

        if (title === "") {
            title = "untitled";
        }

        await db
            .collection("users")
            .doc(user?.uid)
            .collection("notes")
            .doc(id)
            .set({ title, content, id });

        console.log(values);

        actions.setSubmitting(false);
    };

    return (
        <Formik initialValues={initialValues} onSubmit={submitNote}>
            <Form
                className="create-note relative bg-gray-200 container sm:max-w-lg p-4 mx-auto mt-8 mb-5
                    rounded-lg shadow-2xl"
            >
                {isExpanded && (
                    <Field
                        as="textarea"
                        name="title"
                        id="title"
                        row="1"
                        placeholder="Title"
                        className="w-full border-none p-1 outline-none resize-none text-lg 
                    bg-gray-200"
                    />
                )}
                <Field
                    as="textarea"
                    name="content"
                    placeholder="Take a note..."
                    rows={isExpanded ? 3 : 1}
                    onClick={() => setIsExpanded(true)}
                    className="w-full border-none p-1 outline-none resize-none text-lg bg-gray-200"
                />
                <Zoom in={isExpanded} style={{ transitionDelay: "500ms" }}>
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
                    >
                        <AddIcon />
                    </Fab>
                </Zoom>
            </Form>
        </Formik>
    );
};

export default CreateNote;
