import { firebase } from "../firebase/config";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { UserType } from "../interface";
import { convertDateToINS } from "../helpers/context";
import { useHistory } from "react-router-dom";
// import firebase from "firebase";

interface authContextType {
    user: UserType | undefined;
    login: () => void;
    logout: () => void;
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

    // Methods/Functions
    const login = () => {
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase
            .auth()
            .signInWithPopup(provider)
            .then((result) => {
                const { user, additionalUserInfo } = result;
                setUser({
                    uid: user?.uid!,
                    email: user?.email!,
                    name: user?.displayName!,
                    imgURL: user?.photoURL!,
                    isNewUser: additionalUserInfo?.isNewUser!,
                    signInMethod: user?.providerId!,
                    isAnonymous: user?.isAnonymous,
                    createdTime: convertDateToINS(
                        user?.metadata?.creationTime!
                    ),
                    lastSignInTime: convertDateToINS(
                        user?.metadata?.lastSignInTime!
                    ),
                });
            })
            .then(() => {
                history.push(`/keeper/${user?.name}`);
            });
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
    };

    return (
        <>
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
        </>
    );
}
