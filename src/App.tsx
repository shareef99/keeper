import { Fragment } from "react";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Note from "./components/Notes/Note";

function App() {
    return (
        <Fragment>
            <Header />
            <main>
                <Note />
            </main>
            <Footer />
        </Fragment>
    );
}

export default App;
