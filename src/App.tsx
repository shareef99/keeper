import { Fragment, useState } from "react";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import CreateNote from "./components/Notes/CreateNote";
import Note from "./components/Notes/Note";
import { NoteType } from "./interface/note";
import dummyNotes from "./notes";

function App() {
    // States
    const [notes, setNotes] = useState<Array<NoteType>>(dummyNotes);

    const addNote = (note: NoteType) => {
        setNotes((prevNotes) => [...prevNotes, note]);
    };

    return (
        <Fragment>
            <Header />
            <main>
                <CreateNote onAddNote={addNote} />
                <ul>
                    {notes.map((note, index) => (
                        <Note
                            key={index}
                            title={note.title}
                            content={note.content}
                        />
                    ))}
                </ul>
            </main>
            <Footer />
        </Fragment>
    );
}

export default App;
