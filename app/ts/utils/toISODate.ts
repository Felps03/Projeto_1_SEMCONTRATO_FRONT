export function toISODate(date: Date) {
    return date.toISOString().split('T')[0]
}