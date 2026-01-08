export function generateTimeOptions() {
  const times: string[] = [];

  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const h = String(hour).padStart(2, "0");
      const m = String(minute).padStart(2, "0");
      times.push(`${h}:${m}`);
    }
  }

  return times;
}
