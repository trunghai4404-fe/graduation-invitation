export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

export function parseEventDate(dateStr: string, timeStr: string): Date {
  const monthMatch = dateStr.match(/(\d+)\s+tháng\s+(\d+),?\s+(\d{4})/);
  if (monthMatch) {
    const day = parseInt(monthMatch[1], 10);
    const month = parseInt(monthMatch[2], 10) - 1;
    const year = parseInt(monthMatch[3], 10);

    const hourMatch = timeStr.match(/(\d+):(\d+)/);
    let hour = hourMatch ? parseInt(hourMatch[1], 10) : 9;
    const minute = hourMatch ? parseInt(hourMatch[2], 10) : 0;
    if (timeStr.includes('chiều') && hour < 12) hour += 12;

    return new Date(Date.UTC(year, month, day, hour - 7, minute, 0));
  }
  return new Date(Date.UTC(2026, 10, 8, 2, 0, 0));
}

export function calculateTimeLeft(targetDate: Date): TimeLeft {
  const now = Date.now();
  const total = targetDate.getTime() - now;

  if (total <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
  }

  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / 1000 / 60 / 60) % 24);
  const days = Math.floor(total / 1000 / 60 / 60 / 24);

  return { days, hours, minutes, seconds, total };
}

export function pad(n: number): string {
  return String(n).padStart(2, '0');
}

export function isEventInFuture(targetDate: Date): boolean {
  return targetDate.getTime() > Date.now();
}
