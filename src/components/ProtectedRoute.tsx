import {Navigate, Outlet} from "react-router";
import {useAuth} from "@/hooks/useAuth.ts";

type Props = {
    allowedRoles: string[]
}

const ProtectedRoute = ({ allowedRoles }: Props) => {
    const {isAuthenticated, role, loading} = useAuth();

    if (loading) return <div className="text-center mt-10">Loading...</div>

    if (!isAuthenticated) {
        return <Navigate to="/login" replace/>
    }

    if (!role || !allowedRoles.includes(role)) return <Navigate to="/403" replace />

    return(
        <>
            <Outlet/>
        </>
    )
}

export default ProtectedRoute;