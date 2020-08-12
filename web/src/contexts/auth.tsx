import React, { createContext, useState, useEffect, useContext } from "react";
import api from "./../services/api";
import AddUser from "../interfaces/AddUser";

interface AuthContextData {
    signed: boolean;
    user: object;
    signIn(email: string, password: string): Promise<void>;
    signOut(): void;
    signUp(newUser: AddUser): void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoadig] = useState(true);

    useEffect(() => {
        async function loadStorageData() {
            const storagedUser = await localStorage.getItem("user");
            const storagedToken = await localStorage.getItem("auth-token");

            if (storagedUser && storagedToken) {
                setUser(JSON.parse(storagedUser));

                api.defaults.headers["auth-token"] = storagedToken;
            }

            setLoadig(false);
        }

        loadStorageData();
    }, []);

    async function signUp(newUser: AddUser) {
        await api.post("/register", {
            email: newUser.email,
            name: newUser.name,
            password: newUser.password,
            surename: newUser.surename,
        });
    }

    async function signIn(email: string, password: string) {
        const response = await api.post("/login", {
            email,
            password,
        });

        const { user } = response.data;
        const token = response.headers["auth-token"];

        setUser(user);

        api.defaults.headers["auth-token"] = token;

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("auth-token", JSON.stringify(token));
    }

    async function signOut() {
        localStorage.clear();

        setUser(null);
    }

    return (
        <AuthContext.Provider
            value={{
                signed: Boolean(user),
                user: {},
                signIn,
                signOut,
                loading,
                signUp,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
