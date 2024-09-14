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
  // const lastCall = new Date();
  // lastCall.setHours(getHourFromLabel(end), 0, 0, 0);
  // return Date.now() > lastCall.getTime();
  return new Date().getHours() >= getHourFromLabel(end);
}

/*
function addDays(date: Date, days: number): Date {
  date.setDate(date.getDate() + days);
  return date;
}

function getNextWeeklyDate(
  nt: Date,
  weekday: Weekday,
  isFortnightly: boolean
): Date {
  const targetIndex = weekdays.indexOf(weekday);
  const daysUntilNext = (targetIndex - nt.getDay() + 7) % 7;
  const increment =
    daysUntilNext === 0 && isTooLateToday(weekday) ? 7 : daysUntilNext;
  return addDays(nt, isFortnightly ? increment + 7 : increment);
}

function getNextMonthlyDate(nt: Date, date: number): Date {
  const currMonth = nt.getMonth();
  const daysInCurrentMonth = new Date(
    nt.getFullYear(),
    currMonth + 1,
    0
  ).getDate();
  const targetDate = Math.min(date, daysInCurrentMonth);
  if (
    nt.getDate() > targetDate ||
    (nt.getDate() === targetDate && isTooLateToday(nt.toString()))
  ) {
    nt.setMonth(currMonth + 1);
    const daysInNextMonth = new Date(
      nt.getFullYear(),
      nt.getMonth() + 1,
      0
    ).getDate();
    nt.setDate(Math.min(date, daysInNextMonth));
  } else {
    nt.setDate(targetDate);
  }
  return nt;
}
*/

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

/*
export function old_getNextTargetTime({
  period,
  weekday,
  date,
  start,
  end,
}: Schedule) {
  // const total = items.length;
  // const today = new Date();
  // today.setHours(0, 1, 0, 0);
  // const diff = lastCall.getTime() - nextTargetDay.getTime();
  const nt = new Date();
  nt.setHours(getHourFromLabel(start), 1, 0, 0);
  const lastCall = new Date();
  lastCall.setHours(getHourFromLabel(end), 0, 0, 0);
  const tooLate = Date.now() > lastCall.getTime();
  const thisDateNum = nt.getDate();
  switch (period) {
    case "Daily":
      if (tooLate) nt.setDate(thisDateNum + 1);
      return nt;
    case "Weekly":
    case "Fortnightly":
      const targetIndex = weekdays.indexOf(weekday);
      const currentDay = nt.getDay();
      // check if today
      if (targetIndex === currentDay) {
        // is today
        if (tooLate) nt.setDate(thisDateNum + 7);
      } else {
        // not today
        const daysUntilTarget = (targetIndex - currentDay + 7) % 7;
        nt.setDate(thisDateNum + daysUntilTarget);
      }
      return nt;
    case "Monthly":
      const currMonth = nt.getMonth();
      const daysInCurrMonth = new Date(
        nt.getFullYear(),
        currMonth + 1,
        0
      ).getDate();
      // check if today
      if (
        thisDateNum === date ||
        (date > thisDateNum && thisDateNum === daysInCurrMonth)
      ) {
        // is today
        if (tooLate) {
          nt.setMonth(currMonth + 1);
        }
        return nt;
      }
      if (date > thisDateNum) {
        nt.setDate(Math.min(date, daysInCurrMonth));
        return nt;
      }
      nt.setMonth(currMonth + 1);
      const daysInNextMonth = new Date(
        nt.getFullYear(),
        nt.getMonth() + 1,
        0
      ).getDate();
      nt.setDate(Math.min(date, daysInNextMonth));
      return nt;
    default:
      return nt;
  }
}

function getLastDayOfCurrMonth(): number {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
}
*/
