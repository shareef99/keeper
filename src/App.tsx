import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Layout from "./components/layout/Layout";
import Notes from "./keeper/Notes";
import { AuthProvider } from "./context/AuthContext";
import { NoteProvider } from "./context/NoteContext";

function App() {
    return (
        <Router>
            <Layout>
                <AuthProvider>
                    <NoteProvider>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route
                                exact
                                path="/keeper/:userName"
                                component={Notes}
                            />
                            {/* Place a route at the bottom with path "/" under switch to catch 404 page */}
                            <Route path="/" render={() => <h1>404</h1>} />
                        </Switch>
                    </NoteProvider>
                </AuthProvider>
            </Layout>
        </Router>
    );
}

export default App;
