import { useState } from "react";
import CreateNote from "./components/Notes/CreateNote";
import Note from "./components/Notes/Note";
import { NoteType } from "./interface";
import dummyNotes from "./notes";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Layout from "./components/layout/Layout";
import Notes from "./keeper/Notes";
import { AuthProvider } from "./context/AuthContext";

function App() {
    // States
    const [notes, setNotes] = useState<Array<NoteType>>(dummyNotes);

    const addNote = (note: NoteType) => {
        setNotes((prevNotes) => [...prevNotes, note]);
    };

    const deleteNote = (id: number) => {
        setNotes((prevNotes) =>
            prevNotes.filter((note, index) => index !== id)
        );
    };

    return (
        <Router>
            <Layout>
                <AuthProvider>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route
                            exact
                            path="/keeper/:userName"
                            component={Notes}
                        />
                        {/* Place a route at the bottom with path "/" under switch to catch 404 page */}
                        <Route path="/" render={() => <h1>404</h1>} />
                        <CreateNote onAddNote={addNote} />
                        <ul>
                            {notes.map((note, index) => (
                                <Note
                                    key={index}
                                    id={index}
                                    title={note.title}
                                    content={note.content}
                                    onDeleteNote={deleteNote}
                                />
                            ))}
                        </ul>
                    </Switch>
                </AuthProvider>
            </Layout>
        </Router>
    );
}

export default App;
