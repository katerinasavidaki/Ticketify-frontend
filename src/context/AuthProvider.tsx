import {useEffect, useState} from "react";
import {AuthContext, type Role} from "@/context/AuthContext.ts";
import {jwtDecode} from "jwt-decode";
import {login, type LoginFields} from "@/api/login.ts";

export type DecodedToken = {
    sub: string
    role: Role
}

export const AuthProvider = ({ children }: {children: React.ReactNode}) => {
    const [token, setToken] = useState<string | null>(null);
    const [role, setRole] = useState<Role | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const storedToken = localStorage.getItem('token');

        if (storedToken) {
            try {
                const decoded: DecodedToken = jwtDecode(storedToken);
                    setToken(storedToken);
                    setRole(decoded.role);
                    setUsername(decoded.sub)
            } catch {
                localStorage.removeItem('token');
            }
        }
        setLoading(false);
    }, []);

    const loginUser = async (fields: LoginFields)=> {

        try {
            const {token: fetchedToken } = await login(fields)
            const decoded: DecodedToken = jwtDecode(fetchedToken)
            localStorage.setItem('token', fetchedToken);
            setToken(fetchedToken);
            setUsername(decoded.sub);
            setRole(decoded.role);
        } catch(error) {
            console.error("Login Failed", error)
            throw error
        }
    }

    const logoutUser = () => {
        setToken(null);
        setUsername(null);
        setRole(null);
        localStorage.removeItem('token');
    }

    return(
        <>
            <AuthContext.Provider
                value={{
                isAuthenticated: !!token,
                token,
                role,
                logoutUser,
                username,
                loading,
                loginUser,}}
            >
                { loading ? null :  children}
            </AuthContext.Provider>
        </>
    )
}