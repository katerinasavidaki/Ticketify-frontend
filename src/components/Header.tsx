// src/components/layout/Header.tsx

import { Link } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu } from "lucide-react"
import logo from "../assets/logo.png"

const Header = () => {
    const { isAuthenticated, role, logoutUser } = useAuth()

    return (
        <header className="w-full bg-[#A4BBC0] fixed shadow-md px-4 py-1">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <img src={logo} alt="Ticketify Logo" className="h-24" />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-4">
                    {!isAuthenticated && (
                        <>
                            <Link to="/login" className="text-md font-medium hover:underline hover:underline-offset-4">Login</Link>
                            <Link to="/register" className="text-md font-medium hover:underline hover:underline-offset-4">Register</Link>
                        </>
                    )}

                    {isAuthenticated && role === "USER" && (
                        <>
                            <Link to="/dashboard" className="text-sm font-medium">Dashboard</Link>
                            <Link to="/events" className="text-sm font-medium">Events</Link>
                            <Link to="/tickets" className="text-sm font-medium">My Tickets</Link>
                            <Button variant="outline" size="sm" onClick={logoutUser}>Logout</Button>
                        </>
                    )}

                    {isAuthenticated && role === "ADMIN" && (
                        <>
                            <Link to="/admin/dashboard" className="text-sm font-medium">Admin</Link>
                            <Link to="/admin/events" className="text-sm font-medium">Events</Link>
                            <Link to="/admin/users" className="text-sm font-medium">Users</Link>
                            <Link to="/admin/tickets" className="text-sm font-medium">Tickets</Link>
                            <Button variant="outline" size="sm" onClick={logoutUser}>Logout</Button>
                        </>
                    )}
                </nav>

                {/* Mobile Burger Menu */}
                <div className="md:hidden">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            {!isAuthenticated && (
                                <>
                                    <DropdownMenuItem asChild>
                                        <Link to="/login"
                                              className="cursor-pointer hover:underline hover:underline-offset-4"
                                        >
                                            Login
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link to="/register"
                                              className="cursor-pointer hover:underline hover:underline-offset-4"
                                        >
                                            Register
                                        </Link>
                                    </DropdownMenuItem>
                                </>
                            )}

                            {isAuthenticated && role === "USER" && (
                                <>
                                    <DropdownMenuItem asChild>
                                        <Link to="/dashboard">Dashboard</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link to="/events">Events</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link to="/tickets">My Tickets</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={logoutUser}>Logout</DropdownMenuItem>
                                </>
                            )}

                            {isAuthenticated && role === "ADMIN" && (
                                <>
                                    <DropdownMenuItem asChild>
                                        <Link to="/admin/dashboard">Admin</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link to="/admin/events">Events</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link to="/admin/users">Users</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link to="/admin/tickets">Tickets</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={logoutUser}>Logout</DropdownMenuItem>
                                </>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    )
}

export default Header
