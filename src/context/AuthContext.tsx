import { db, firebase } from "../lib/firebase/config";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { UserType } from "../lib/interface";
import { convertDateToINS } from "../lib/helpers/context";
import { useHistory } from "react-router-dom";
// import firebase from "firebase";

interface authContextType {
    user: UserType | undefined;
    login: () => void;
    logout: () => void;
    error: string | undefined;
}

const authContextDefaultValues: authContextType = {
    user: {
        uid: "",
        email: "",
        name: "",
        imgURL: "",
        isNewUser: true,
        signInMethod: "",
        createdTime: "",
        lastSignInTime: "",
    },
    login: () => {},
    logout: () => {},
    error: "",
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export function useAuth() {
    return useContext(AuthContext);
}

interface Props {
    children: ReactNode;
}

export function AuthProvider({ children }: Props) {
    const history = useHistory();
    const [user, setUser] = useState<UserType>();
    const [error, setError] = useState<string | undefined>();

    // Methods/Functions
    const login = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();

        try {
            const result = await firebase.auth().signInWithPopup(provider);
            const { user, additionalUserInfo } = result;

            const userValues = {
                uid: user?.uid!,
                email: user?.email!,
                name: user?.displayName!,
                imgURL: user?.photoURL!,
                isNewUser: additionalUserInfo?.isNewUser!,
                signInMethod: user?.providerId!,
                isAnonymous: user?.isAnonymous,
                createdTime: convertDateToINS(user?.metadata?.creationTime!),
                lastSignInTime: convertDateToINS(
                    user?.metadata?.lastSignInTime!
                ),
            };

            setUser(userValues);

            try {
                await db.collection("users").doc(user?.uid).set(userValues);

                history.push(`/keeper/${user?.displayName}`);
            } catch (err) {
                setError(err || "Failed to save user data!");
            }
        } catch (err) {
            setError(err || "Failed to login");
        }
    };

    const logout = async () => {
        await firebase.auth().signOut();

        history.push("/");
    };

    // Effects
    // This useEffect will check for the already login user
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (!user?.email) {
                return setUser(undefined);
            }

            setUser({
                uid: user?.uid,
                email: user?.email!,
                name: user?.displayName!,
                imgURL: user?.photoURL!,
                isNewUser: false,
                signInMethod: user?.providerId!,
                isAnonymous: user?.isAnonymous,
                createdTime: convertDateToINS(user?.metadata?.creationTime!),
                lastSignInTime: convertDateToINS(
                    user?.metadata?.lastSignInTime!
                ),
            });
        });
    }, []);

    const value = {
        user,
        login,
        logout,
        error,
    };

    return (
        <>
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
        </>
    );
}
