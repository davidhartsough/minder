export type Period = "Daily" | "Weekly" | "Fortnightly" | "Monthly";
export type Weekday =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";
export type Schedule = {
  period: Period;
  weekday: Weekday;
  date: number;
  start: string;
  end: string;
};
export const offsets: Record<Period, number> = {
  Daily: 1,
  Weekly: 7,
  Fortnightly: 14,
  Monthly: 0,
};
export const periods: Period[] = ["Daily", "Weekly", "Fortnightly", "Monthly"];
export const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export const nums: number[] = Array.from({ length: 30 }, (_, i) => i + 1);
export const hours = [
  "1am",
  "2am",
  "3am",
  "4am",
  "5am",
  "6am",
  "7am",
  "8am",
  "9am",
  "10am",
  "11am",
  "12pm",
  "1pm",
  "2pm",
  "3pm",
  "4pm",
  "5pm",
  "6pm",
  "7pm",
  "8pm",
  "9pm",
  "10pm",
  "11pm",
];

function getHourFromLabel(hour: string) {
  return hours.indexOf(hour) + 1;
}

function getTimeDiff(hour1: number, hour2: number): number {
  return Math.abs(hour2 - hour1) * 60 * 60 * 1000;
}

function getRandomNum(max: number) {
  return Math.floor(Math.random() * max) + 1;
}

export function getRandomTime(h1: string, h2: string): number {
  const hour1 = getHourFromLabel(h1);
  const hour2 = getHourFromLabel(h2);
  return getRandomNum(getTimeDiff(hour1, hour2));
}

function isTooLateToday(end: string): boolean {
  return new Date().getHours() >= getHourFromLabel(end);
}

export function getNextTargetTime({
  period,
  weekday,
  date,
  start,
  end,
}: Schedule): Date {
  const nt = new Date();
  nt.setHours(getHourFromLabel(start), 0, 0, 0);
  const currDateNum = nt.getDate();
  if (isTooLateToday(end)) nt.setDate(currDateNum + 1);
  if (period === "Weekly" || period === "Fortnightly") {
    const daysUntilNext = (weekdays.indexOf(weekday) - nt.getDay() + 7) % 7;
    nt.setDate(currDateNum + daysUntilNext);
  } else if (period === "Monthly") {
    if (currDateNum > date) nt.setMonth(nt.getMonth() + 1);
    const daysInMonth = new Date(
      nt.getFullYear(),
      nt.getMonth() + 1,
      0
    ).getDate();
    nt.setDate(Math.min(date, daysInMonth));
  }
  return nt;
}
