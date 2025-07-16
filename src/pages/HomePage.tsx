import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth.ts"
import { useEffect, useState } from "react"
import { getUpcomingEvents } from "@/api/event"
import {toast} from "sonner";

export type EventType = {
    id: number
    title: string
    description: string
    location: string
    dateTime: string
    availableTickets: number
    status: "ACTIVE" | "CANCELLED"
}

const HomePage = () => {

    useEffect(() => {
        document.title = "Home Page"
    }, []);

    const { isAuthenticated } = useAuth()
    const [events, setEvents] = useState<EventType[]>([])

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data: EventType[] = await getUpcomingEvents()
                setEvents(data.slice(0, 3))
            } catch (err) {
                console.error("Error fetching events:", err)
                toast.error(err instanceof Error ? err.message : "Failed to fetch events");
            }
        }

        fetchEvents()
    }, [])

    return (
        <div className="p-6 max-w-6xl mx-auto space-y-12">
            {/* HERO */}
            <section className="text-center py-10">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Ticketify</h1>
                <p className="text-lg text-muted-foreground mb-6">Your gateway to events, music, and memories.</p>

                {isAuthenticated ? (
                    <div className="flex justify-center gap-4">
                        <Link to="/events">
                            <Button>Browse Events</Button>
                        </Link>
                        <Link to="/tickets">
                            <Button variant="outline">My Tickets</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="flex justify-center gap-4">
                        <Link to="/login">
                            <Button className="cursor-pointer">Login</Button>
                        </Link>
                        <Link to="/register">
                            <Button variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">Get Started</Button>
                        </Link>
                    </div>
                )}
            </section>

            {/* UPCOMING EVENTS */}
            <section>
                <h2 className="text-2xl font-semibold mb-4 text-center">Upcoming Events</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.length > 0 ? (
                        events.map((event) => (
                            <div key={event.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
                                <h3 className="text-xl font-bold">{event.title}</h3>
                                <p className="text-muted-foreground text-sm">{event.description}</p>
                                <p className="text-sm mt-2">📍 {event.location}</p>
                                <p className="text-sm">🕒 {new Date(event.dateTime).toLocaleString()}</p>

                                <div className="mt-4">
                                    <Link to={`/events/${event.id}`}>
                                        <Button size="sm">View</Button>
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-muted-foreground text-center">No events found</p>
                    )}
                </div>
            </section>
        </div>
    )
}

export default HomePage