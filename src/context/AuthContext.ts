import {createContext} from 'react';
import type {LoginFields} from "@/api/login.ts";

export type Role = "USER" | "ADMIN"

type AuthContextProps = {
    isAuthenticated: boolean;
    token: string | null;
    username: string | null;
    role: Role | null;
    loginUser: (fields: LoginFields) => Promise<void>;
    logoutUser: () => void;
    loading: boolean;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);