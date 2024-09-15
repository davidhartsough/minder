export type Period = "Daily" | "Weekly";
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
  start: string;
  end: string;
};
const offsets: Record<Period, number> = {
  Daily: 1,
  Weekly: 7,
};
export const periods: Period[] = ["Daily", "Weekly"];
export const weekdays: Weekday[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
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

export function getNextTargetTime({
  period,
  weekday,
  start,
  end,
}: Schedule): Date {
  const nt = new Date();
  nt.setHours(getHourFromLabel(start), 0, 0, 0);
  const isTooLateToday = new Date().getHours() >= getHourFromLabel(end);
  if (isTooLateToday) nt.setDate(nt.getDate() + 1);
  if (period === "Weekly") {
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
  const { period, start, end } = sched;
  const firstTS = Math.max(
    ntt.getTime() + getRandomTime(start, end),
    tenMinFromNow()
  );
  const timestamps: number[] = [firstTS];
  const currDate = ntt.getDate();
  const offset = offsets[period];
  for (let i = 1; i < total; i++) {
    const nextTime = new Date(ntt);
    nextTime.setDate(currDate + i * offset);
    const ts = nextTime.getTime() + getRandomTime(start, end);
    timestamps.push(ts);
  }
  return timestamps;
}
