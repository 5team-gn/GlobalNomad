export function formatDateKey(date: Date): string {
  return date.toISOString().split("T")[0];
}

export function parseReservationDate(dateString: string): Date {
  const [datePart] = dateString.split(" · ");
  const [year, month, day] = datePart.split(".").map(Number);

  return new Date(year, month - 1, day);
}

export function toDateKey(date: Date): string {
  return date.toISOString().split("T")[0];
}
