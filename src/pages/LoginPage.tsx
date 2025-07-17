import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/useAuth.ts";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const loginSchema = z.object({
    username: z.email(),
    password: z.string().min(1, { message: "Password is required" }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const { loginUser } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormValues) => {
        try {
            await loginUser(data);
            toast.success("Logged in successfully!");
            navigate("/dashboard");
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Invalid credentials");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow-md bg-slate-50">
            <h2 className="text-2xl font-bold mb-4">Login</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-5">
                <div>
                    <Label className="mb-1" htmlFor="username">Email</Label>
                    <Input
                        autoFocus
                        id="username"
                        {...register("username")}
                        placeholder="Enter your email"
                        disabled={isSubmitting}
                    />
                    {errors.username && (
                        <p className="text-sm text-red-500">{errors.username.message}</p>
                    )}
                </div>

                <div>
                    <Label className="mb-1" htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        autoFocus
                        type="password"
                        {...register("password")}
                        placeholder="Enter your password"
                        disabled={isSubmitting}
                    />
                    {errors.password && (
                        <p className="text-sm text-red-500">{errors.password.message}</p>
                    )}
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Logging in..." : "Login"}
                </Button>
            </form>
        </div>
    );
}