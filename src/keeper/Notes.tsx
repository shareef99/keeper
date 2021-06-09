import { useHistory } from "react-router";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/config";

interface Props {}

const Notes = (props: Props) => {
    const history = useHistory();
    const { user } = useAuth();
    console.log(user);

    db.collection("testing").onSnapshot((snap) => {
        snap.docs.map((doc) => console.log(doc.data()));
    });

    if (user) {
        history.push("/login");
    }

    return <div>user: {user ? "true" : "false"}</div>;
};

export default Notes;
