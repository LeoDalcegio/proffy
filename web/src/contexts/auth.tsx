import React, { createContext, useState, useEffect } from "react";
import api from "./../services/api";
import User from "../interfaces/User";

interface AuthContextData {
  signed: boolean;
  user: User | undefined;
  signIn(email: string, password: string, remember: boolean): Promise<void>;
  signOut(): void;
  signUp(newUser: User): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    async function loadStorageData() {
      const storagedUser = localStorage.getItem("user");
      const storagedToken = localStorage.getItem("auth-token");

      if (storagedUser && storagedToken) {
        setUser(JSON.parse(storagedUser));

        api.defaults.headers["auth-token"] = storagedToken;
      }
    }

    loadStorageData();
  }, []);

  async function signUp(newUser: User) {
    await api
      .post("/register", {
        email: newUser.email,
        name: newUser.name,
        password: newUser.password,
        surename: newUser.surename,
      })
      .catch(() => {
        throw Error("Erro ao realizar cadastro");
      });
  }

  async function signIn(email: string, password: string, remember: boolean) {
    const response = await api
      .post("/login", {
        email,
        password,
      })
      .catch(() => {
        throw Error("E-mail ou senha inválidos");
      });

    const signedUser: User = response.data;
    const token = response.headers["auth-token"];

    setUser(signedUser);

    api.defaults.headers["auth-token"] = token;

    if (remember) {
      localStorage.setItem("user", JSON.stringify(signedUser));
      localStorage.setItem("auth-token", JSON.stringify(token));
    }
  }

  async function signOut() {
    localStorage.clear();

    setUser(undefined);
  }

  return (
    <AuthContext.Provider
      value={{
        signed: Boolean(user),
        user,
        signIn,
        signOut,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
