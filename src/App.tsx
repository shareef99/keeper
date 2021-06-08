import { Fragment } from "react";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import CreateNote from "./components/Notes/CreateNote";
import Note from "./components/Notes/Note";
import notes from "./notes";

function App() {
    return (
        <Fragment>
            <Header />
            <main>
                <CreateNote />
                <ul>
                    {notes.map((note) => (
                        <Note
                            key={note.key}
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
