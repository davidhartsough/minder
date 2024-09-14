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
const offsets: Record<Period, number> = {
  Daily: 1,
  Weekly: 7,
  Fortnightly: 14,
  Monthly: 0,
};
export const periods: Period[] = ["Daily", "Weekly", "Fortnightly", "Monthly"];
export const weekdays: Weekday[] = [
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

function getRandomTime(h1: string, h2: string): number {
  const hour1 = getHourFromLabel(h1);
  const hour2 = getHourFromLabel(h2);
  return getRandomNum(getTimeDiff(hour1, hour2));
}

function getTotalDaysInMonth(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
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
  const isTooLateToday = new Date().getHours() >= getHourFromLabel(end);
  if (period === "Monthly") {
    const currDate = nt.getDate();
    if (
      currDate > date ||
      (isTooLateToday &&
        (currDate === date ||
          (getTotalDaysInMonth(nt) === currDate && date > currDate)))
    ) {
      nt.setMonth(nt.getMonth() + 1);
    }
    nt.setDate(Math.min(date, getTotalDaysInMonth(nt)));
    return nt;
  }
  if (isTooLateToday) {
    nt.setDate(nt.getDate() + 1);
  }
  if (period === "Weekly" || period === "Fortnightly") {
    const weekdayIndex = weekdays.indexOf(weekday);
    const daysUntilNext = (weekdayIndex - nt.getDay() + 7) % 7;
    nt.setDate(nt.getDate() + daysUntilNext);
  }
  return nt;
}

const tenMin = 600000;
const tenMinFromNow = () => Date.now() + tenMin + getRandomNum(tenMin);

export function getTimestamps(sched: Schedule, total: number): number[] {
  const ntt = getNextTargetTime(sched);
  const { period, start, end, date } = sched;
  const firstTS = Math.max(
    ntt.getTime() + getRandomTime(start, end),
    tenMinFromNow()
  );
  const timestamps: number[] = [firstTS];
  const currMonth = ntt.getMonth();
  const currDate = ntt.getDate();
  const offset = offsets[period];
  for (let i = 1; i < total; i++) {
    const nextTime = new Date(ntt);
    if (period === "Monthly") {
      nextTime.setDate(1);
      nextTime.setMonth(currMonth + i);
      nextTime.setDate(Math.min(date, getTotalDaysInMonth(nextTime)));
    } else {
      nextTime.setDate(currDate + i * offset);
    }
    const ts = nextTime.getTime() + getRandomTime(start, end);
    timestamps.push(ts);
  }
  return timestamps;
}
