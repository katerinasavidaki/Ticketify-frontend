import type {EventType} from "@/pages/HomePage.tsx";



export const getUpcomingEvents = async (): Promise<EventType[]> => {
    const res = await fetch("http://localhost:8080/api/events/upcoming")
    if (!res.ok) throw new Error("Failed to fetch events")
    return await res.json()
}