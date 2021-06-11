import { useAuth } from "../context/AuthContext";
// import { db } from "../firebase/config";

interface Props {}

const Notes = (props: Props) => {
    const { user, logout } = useAuth();

    return (
        <section>
            <div>
                user: {user?.name}
                <button onClick={logout}>logout</button>
            </div>
        </section>
    );
};

export default Notes;
