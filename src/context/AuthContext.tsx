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
// import firebase from "firebase";

interface authContextType {
    user: UserType | undefined;
    login: () => void;
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
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export function useAuth() {
    return useContext(AuthContext);
}

interface Props {
    children: ReactNode;
}

export function AuthProvider({ children }: Props) {
    const [user, setUser] = useState<UserType>();

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
            });
    };

    // Effects
    // This useEffect will check for the already login user
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            setUser({
                uid: user?.uid!,
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

    useEffect(() => {
        console.log(user);
    }, [user]);

    const value = {
        user,
        login,
    };

    return (
        <>
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
        </>
    );
}
