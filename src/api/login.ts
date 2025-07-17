import {z} from "zod";

export const loginSchema = z.object({
    username: z.email(),
    password: z.string()
        .min(8, "Password must be at least 8 characters long, include an upper/lowercase letter, a number and a special character").trim()
})

export type LoginFields = z.infer<typeof loginSchema>

export type LoginResponse = {
    token: string;
    token_type: string;
    role: string;
    username: string
    exp: number
}

export async function login({
                                username,
                                password
                            }: LoginFields): Promise<LoginResponse> {

    const res = await fetch("http://localhost:8080/api/auth/login",
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ username: username, password: password })
        });
    if (!res.ok) {
        let detail = "Login Failed";

        try {
            const data = await res.json();
            if (typeof data?.detail == "string") detail = data.detail;
        } catch (error) {
            console.error(error);
        }
        throw new Error(detail);
    }
    return await res.json();
}