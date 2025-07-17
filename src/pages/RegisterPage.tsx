import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { getRegions } from "@/api/region.ts"
import { useNavigate } from "react-router-dom"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {registerUser} from "@/api/register.ts";
import {zodResolver} from "@hookform/resolvers/zod";

const formSchema = z.object({
    username: z.email(),
    password: z.string().min(8, "Password must be at least 8 characters long, include an upper/lowercase letter, a number and a special character"),
    confirmPassword: z.string().min(8, "Confirm password must match the password"),
    firstname: z.string().min(2, "Firstname must be at least 2 characters long"),
    lastname: z.string().min(2, "Lastname must be at least 2 characters long"),
    phone: z.string().min(10, "Phone must be at least 10 characters long"),
    regionId: z.number().min(1, "Region is required")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>

export default function RegisterPage() {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
            confirmPassword: "",
            firstname: "",
            lastname: "",
            phone: ""
        }
    });

    const [regions, setRegions] = useState<{ id: number; name: string }[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate()

    useEffect(() => {
        getRegions()
            .then((data) => setRegions(data))
            .catch(() => toast.error("Failed to fetch regions"))
            .finally(() => setLoading(false));
    }, [])

    const onSubmit = async (data: FormValues) => {
        try {
            await registerUser(data)
            toast.success("Registration successful!")
            navigate("/login")
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Registration failed");
        }
    }

    if (loading) return <div className="text-center p-8">Loading...</div>

    return (
        <div className="max-w-md mx-auto mt-10 mb-10 p-6 border rounded-xl shadow-2xl bg-slate-50">
            <h2 className="text-2xl font-bold mb-4">Register</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <Label className="mb-1" htmlFor="username">Email</Label>
                    <Input autoFocus id="username" type="text" {...register("username")}
                           placeholder="Enter your email"
                    />
                    {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}
                </div>

                <div>
                    <Label className="mb-1" htmlFor="password">Password</Label>
                    <Input id="password" type="password" {...register("password")}
                    placeholder="Enter your password"
                    />
                    {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                </div>

                <div>
                    <Label className="mb-1" htmlFor="confirmPassword">Confirm Password</Label>
                    <Input id="confirmPassword" type="password" {...register("confirmPassword")}
                           placeholder="Confirm your password"
                    />
                    {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>}
                </div>

                <div>
                    <Label className="mb-1" htmlFor="firstname">Firstname</Label>
                    <Input id="firstname" {...register("firstname")}
                    placeholder="Enter your firstname"
                    />
                    {errors.firstname && <p className="text-sm text-red-500">{errors.firstname.message}</p>}
                </div>

                <div>
                    <Label className="mb-1" htmlFor="lastname">Lastname</Label>
                    <Input id="lastname" {...register("lastname")}
                    placeholder="Enter your lastname"
                    />
                    {errors.lastname && <p className="text-sm text-red-500">{errors.lastname.message}</p>}
                </div>

                <div>
                    <Label className="mb-1" htmlFor="phone">Phone</Label>
                    <Input id="phone" {...register("phone")}
                    placeholder="Enter your phone number"
                    />
                    {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
                </div>

                <div>
                    <Label className="mb-1" htmlFor="region">Region</Label>
                    <Select onValueChange={(value) => setValue("regionId", Number(value))}>
                        <SelectTrigger id="region">
                            <SelectValue placeholder="Select your region" />
                        </SelectTrigger>
                        <SelectContent>
                            {regions.map((region) => (
                                <SelectItem key={region.id} value={region.id.toString()}>
                                    {region.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.regionId && <p className="text-sm text-red-500">{errors.regionId.message}</p>}
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Registering..." : "Register"}
                </Button>
            </form>
        </div>
    )
}
