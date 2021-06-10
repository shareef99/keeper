import { createContext, ReactNode, useContext } from "react";

interface authContextType {
    user: boolean;
}

const authContextDefaultValues: authContextType = {
    user: false,
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export function useAuth() {
    return useContext(AuthContext);
}

interface Props {
    children: ReactNode;
}

export function AuthProvider({ children }: Props) {
    const user = true;

    const value = {
        user,
    };
    return (
        <>
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
        </>
    );
}
