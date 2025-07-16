export const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleString("en-GB", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    })
}
