export type RegisterFormFields = {
    firstname: string;
    lastname: string;
    username: string; // email in our case
    password: string;
    confirmPassword: string;
    phone: string;
    regionId: number;
};

export const registerUser = async (formData: RegisterFormFields): Promise<void> => {
    const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    if (!res.ok) {
        const error = await res.text();
        throw new Error(`Registration failed: ${error}`);
    }
};