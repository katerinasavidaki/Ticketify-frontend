import {z} from "zod";

export const loginSchema = z.object({
    username: z.email().trim(),
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

const baseUrl = import.meta.env.VITE_API_URL;

export async function login({
                                username,
                                password
                            }: LoginFields): Promise<LoginResponse> {

    const form = new URLSearchParams();
    form.append("username", username);
    form.append("password", password);

    const res = await fetch(baseUrl + "/auth/login",
        {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: form.toString()
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