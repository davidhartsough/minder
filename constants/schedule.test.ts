import { getNextTargetTime, getTimestamps, Schedule } from "./schedule";

jest.useFakeTimers();
describe("getNextTargetTime()", () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });
  //
  test("daily: today", () => {
    const mockDate = new Date(2024, 2, 31, 2, 1, 1, 1);
    jest.setSystemTime(mockDate);
    const t = getNextTargetTime({
      period: "Daily",
      start: "1am", // 1
      end: "7am", // 7
      weekday: "Sunday",
      date: 1,
    });
    expect(t.getMonth()).toBe(2);
    expect(t.getDate()).toBe(31);
    expect(t.getHours()).toBe(1);
  });
  test("daily: tomorrow", () => {
    const mockDate = new Date(2024, 2, 5, 7, 0, 0, 0);
    jest.setSystemTime(mockDate);
    const t = getNextTargetTime({
      period: "Daily",
      start: "3am", // 3
      end: "7am", // 7
      weekday: "Sunday",
      date: 1,
    });
    expect(t.getMonth()).toBe(2);
    expect(t.getDate()).toBe(6);
    expect(t.getHours()).toBe(3);
  });
  test("daily: next month", () => {
    const mockDate = new Date(2024, 2, 31, 9, 0, 0, 0);
    jest.setSystemTime(mockDate);
    const t = getNextTargetTime({
      period: "Daily",
      start: "3am", // 3
      end: "7am", // 7
      weekday: "Sunday",
      date: 1,
    });
    expect(t.getMonth()).toBe(3);
    expect(t.getDate()).toBe(1);
    expect(t.getHours()).toBe(3);
  });
  test("daily: next year", () => {
    const mockDate = new Date(2023, 11, 31, 9, 0, 0, 0);
    jest.setSystemTime(mockDate);
    const t = getNextTargetTime({
      period: "Daily",
      start: "3am", // 3
      end: "7am", // 7
      weekday: "Sunday",
      date: 1,
    });
    expect(t.getMonth()).toBe(0);
    expect(t.getDate()).toBe(1);
    expect(t.getHours()).toBe(3);
  });
  //
  test("weekly: today", () => {
    const mockDate = new Date(2024, 8, 8, 12, 1, 1, 1);
    jest.setSystemTime(mockDate);
    const t = getNextTargetTime({
      period: "Weekly",
      start: "10am", // 10
      end: "8pm", // 20
      weekday: "Sunday",
      date: 1,
    });
    expect(t.getMonth()).toBe(8);
    expect(t.getDate()).toBe(8);
    expect(t.getDay()).toBe(0);
    expect(t.getHours()).toBe(10);
  });
  test("weekly: next week", () => {
    const mockDate = new Date(2024, 8, 8, 21, 1, 1, 1);
    jest.setSystemTime(mockDate);
    const weekday = "Sunday";
    const t = getNextTargetTime({
      period: "Weekly",
      start: "10am", // 10
      end: "8pm", // 20
      weekday,
      date: 1,
    });
    expect(t.getMonth()).toBe(8);
    expect(t.getDate()).toBe(8 + 7);
    expect(t.getDay()).toBe(0);
    expect(t.getHours()).toBe(10);
  });
  test("weekly: tomorrow", () => {
    const mockDate = new Date(2024, 8, 8, 13, 1, 1, 1);
    jest.setSystemTime(mockDate);
    const weekday = "Monday";
    const t = getNextTargetTime({
      period: "Weekly",
      start: "10am", // 10
      end: "8pm", // 20
      weekday,
      date: 1,
    });
    expect(t.getMonth()).toBe(8);
    expect(t.getDate()).toBe(9);
    expect(t.getDay()).toBe(1);
    expect(t.getHours()).toBe(10);
  });
  test("weekly: next month", () => {
    const mockDate = new Date(2024, 7, 30, 9, 0, 0, 0);
    jest.setSystemTime(mockDate);
    const t = getNextTargetTime({
      period: "Weekly",
      start: "3am", // 3
      end: "7am", // 7
      weekday: "Tuesday",
      date: 1,
    });
    expect(t.getMonth()).toBe(8);
    expect(t.getDate()).toBe(3);
    expect(t.getDay()).toBe(2);
    expect(t.getHours()).toBe(3);
  });
  test("weekly: next year", () => {
    const mockDate = new Date(2023, 11, 31, 13, 1, 1, 1);
    jest.setSystemTime(mockDate);
    const weekday = "Wednesday";
    const t = getNextTargetTime({
      period: "Weekly",
      start: "10am", // 10
      end: "8pm", // 20
      weekday,
      date: 1,
    });
    expect(t.getMonth()).toBe(0);
    expect(t.getDate()).toBe(3);
    expect(t.getDay()).toBe(3);
    expect(t.getHours()).toBe(10);
  });
  test("weekly: next year #2", () => {
    const mockDate = new Date(2023, 11, 31, 2, 1, 1, 1);
    jest.setSystemTime(mockDate);
    const t = getNextTargetTime({
      period: "Weekly",
      start: "1am", // 1
      end: "3am", // 3
      weekday: "Sunday",
      date: 1,
    });
    expect(t.getMonth()).toBe(11);
    expect(t.getDate()).toBe(31);
    expect(t.getDay()).toBe(0);
    expect(t.getHours()).toBe(1);
  });
  //
  test("fortnightly: today", () => {
    const mockDate = new Date(2024, 8, 8, 12, 1, 1, 1);
    jest.setSystemTime(mockDate);
    const t = getNextTargetTime({
      period: "Fortnightly",
      start: "10am", // 10
      end: "8pm", // 20
      weekday: "Sunday",
      date: 1,
    });
    expect(t.getMonth()).toBe(8);
    expect(t.getDate()).toBe(8);
    expect(t.getDay()).toBe(0);
    expect(t.getHours()).toBe(10);
  });
  test("fortnightly: next week", () => {
    const mockDate = new Date(2024, 8, 8, 21, 1, 1, 1);
    jest.setSystemTime(mockDate);
    const weekday = "Sunday";
    const t = getNextTargetTime({
      period: "Fortnightly",
      start: "10am", // 10
      end: "8pm", // 20
      weekday,
      date: 1,
    });
    expect(t.getMonth()).toBe(8);
    expect(t.getDate()).toBe(8 + 7);
    expect(t.getDay()).toBe(0);
    expect(t.getHours()).toBe(10);
  });
  test("fortnightly: tomorrow", () => {
    const mockDate = new Date(2024, 8, 8, 13, 1, 1, 1);
    jest.setSystemTime(mockDate);
    const weekday = "Monday";
    const t = getNextTargetTime({
      period: "Fortnightly",
      start: "10am", // 10
      end: "8pm", // 20
      weekday,
      date: 1,
    });
    expect(t.getMonth()).toBe(8);
    expect(t.getDate()).toBe(9);
    expect(t.getDay()).toBe(1);
    expect(t.getHours()).toBe(10);
  });
  test("fortnightly: next month", () => {
    const mockDate = new Date(2024, 7, 30, 9, 0, 0, 0);
    jest.setSystemTime(mockDate);
    const t = getNextTargetTime({
      period: "Fortnightly",
      start: "3am", // 3
      end: "7am", // 7
      weekday: "Tuesday",
      date: 1,
    });
    expect(t.getMonth()).toBe(8);
    expect(t.getDate()).toBe(3);
    expect(t.getDay()).toBe(2);
    expect(t.getHours()).toBe(3);
  });
  test("fortnightly: next year", () => {
    const mockDate = new Date(2023, 11, 31, 13, 1, 1, 1);
    jest.setSystemTime(mockDate);
    const weekday = "Wednesday";
    const t = getNextTargetTime({
      period: "Fortnightly",
      start: "10am", // 10
      end: "8pm", // 20
      weekday,
      date: 1,
    });
    expect(t.getMonth()).toBe(0);
    expect(t.getDate()).toBe(3);
    expect(t.getDay()).toBe(3);
    expect(t.getHours()).toBe(10);
  });
  //
  test("Monthly: today", () => {
    const mockDate = new Date(2024, 8, 8, 12, 1, 1, 1);
    jest.setSystemTime(mockDate);
    const t = getNextTargetTime({
      period: "Monthly",
      start: "10am", // 10
      end: "8pm", // 20
      weekday: "Sunday",
      date: 8,
    });
    expect(t.getMonth()).toBe(8);
    expect(t.getDate()).toBe(8);
    expect(t.getHours()).toBe(10);
  });
  test("Monthly: too late, so next month", () => {
    const mockDate = new Date(2024, 8, 8, 21, 1, 1, 1);
    jest.setSystemTime(mockDate);
    const t = getNextTargetTime({
      period: "Monthly",
      start: "10am", // 10
      end: "8pm", // 20
      weekday: "Sunday",
      date: 8,
    });
    expect(t.getMonth()).toBe(9);
    expect(t.getDate()).toBe(8);
    expect(t.getHours()).toBe(10);
  });
  test("Monthly: tomorrow", () => {
    const mockDate = new Date(2024, 8, 8, 13, 1, 1, 1);
    jest.setSystemTime(mockDate);
    const t = getNextTargetTime({
      period: "Monthly",
      start: "10am", // 10
      end: "8pm", // 20
      weekday: "Sunday",
      date: 9,
    });
    expect(t.getMonth()).toBe(8);
    expect(t.getDate()).toBe(9);
    expect(t.getHours()).toBe(10);
  });
  test("Monthly: next month", () => {
    const mockDate = new Date(2024, 7, 30, 9, 0, 0, 0);
    jest.setSystemTime(mockDate);
    const t = getNextTargetTime({
      period: "Monthly",
      start: "3am", // 3
      end: "7am", // 7
      weekday: "Tuesday",
      date: 9,
    });
    expect(t.getMonth()).toBe(8);
    expect(t.getDate()).toBe(9);
    expect(t.getHours()).toBe(3);
  });
  test("Monthly: next year", () => {
    const mockDate = new Date(2023, 11, 31, 13, 1, 1, 1);
    jest.setSystemTime(mockDate);
    const t = getNextTargetTime({
      period: "Monthly",
      start: "10am", // 10
      end: "8pm", // 20
      weekday: "Sunday",
      date: 3,
    });
    expect(t.getMonth()).toBe(0);
    expect(t.getDate()).toBe(3);
    expect(t.getHours()).toBe(10);
  });
  test("Monthly: NOT next year, but today", () => {
    const mockDate = new Date(2023, 11, 31, 13, 1, 1, 1);
    jest.setSystemTime(mockDate);
    const t = getNextTargetTime({
      period: "Monthly",
      start: "10am", // 10
      end: "8pm", // 20
      weekday: "Sunday",
      date: 31,
    });
    expect(t.getMonth()).toBe(11);
    expect(t.getDate()).toBe(31);
    expect(t.getHours()).toBe(10);
  });
  test("Monthly: too late, so next year", () => {
    const mockDate = new Date(2023, 11, 31, 21, 1, 1, 1);
    jest.setSystemTime(mockDate);
    const t = getNextTargetTime({
      period: "Monthly",
      start: "10am", // 10
      end: "8pm", // 20
      weekday: "Sunday",
      date: 31,
    });
    expect(t.getMonth()).toBe(0);
    expect(t.getDate()).toBe(31);
    expect(t.getHours()).toBe(10);
  });
  test("Monthly: Feb 2023 (non leap year)", () => {
    const mockDate = new Date(2023, 1, 27, 13, 1, 1, 1);
    jest.setSystemTime(mockDate);
    const t = getNextTargetTime({
      period: "Monthly",
      start: "10am", // 10
      end: "8pm", // 20
      weekday: "Sunday",
      date: 31,
    });
    expect(t.getMonth()).toBe(1);
    expect(t.getDate()).toBe(28);
    expect(t.getHours()).toBe(10);
  });
  test("Monthly: Feb 2023 (non leap year) #2", () => {
    const mockDate = new Date(2023, 1, 27, 13, 1, 1, 1);
    jest.setSystemTime(mockDate);
    const t = getNextTargetTime({
      period: "Monthly",
      start: "10am", // 10
      end: "8pm", // 20
      weekday: "Sunday",
      date: 30,
    });
    expect(t.getMonth()).toBe(1);
    expect(t.getDate()).toBe(28);
    expect(t.getHours()).toBe(10);
  });
  test("Monthly: Feb 2023 (non leap year) #3", () => {
    const mockDate = new Date(2023, 1, 27, 13, 1, 1, 1);
    jest.setSystemTime(mockDate);
    const t = getNextTargetTime({
      period: "Monthly",
      start: "10am", // 10
      end: "8pm", // 20
      weekday: "Sunday",
      date: 29,
    });
    expect(t.getMonth()).toBe(1);
    expect(t.getDate()).toBe(28);
    expect(t.getHours()).toBe(10);
  });
  test("Monthly: leap year", () => {
    const mockDate = new Date(2024, 1, 28, 13, 1, 1, 1);
    jest.setSystemTime(mockDate);
    const t = getNextTargetTime({
      period: "Monthly",
      start: "10am", // 10
      end: "8pm", // 20
      weekday: "Sunday",
      date: 31,
    });
    expect(t.getMonth()).toBe(1);
    expect(t.getDate()).toBe(29);
    expect(t.getHours()).toBe(10);
  });
  test("monthly: too late: new years and next year (leap year)", () => {
    const mockDate = new Date(2023, 10, 30, 5, 1, 1, 1);
    jest.setSystemTime(mockDate);
    const t = getNextTargetTime({
      period: "Monthly",
      start: "1am", // 1
      end: "3am", // 3
      weekday: "Sunday",
      date: 31,
    });
    expect(t.getMonth()).toBe(11);
    expect(t.getDate()).toBe(31);
    expect(t.getHours()).toBe(1);
  });
});

describe("getTimestamps()", () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });
  test("daily: today, tomorrow, and the day after tomorrow", () => {
    const mockDate = new Date(2024, 2, 31, 2, 1, 1, 1);
    jest.setSystemTime(mockDate);
    const [ts1, ts2, ts3] = getTimestamps(
      {
        period: "Daily",
        start: "1am", // 1
        end: "3am", // 3
        weekday: "Sunday",
        date: 1,
      },
      3
    );
    expect(ts1).toBeGreaterThan(Date.now());
    expect(ts1).toBeLessThan(new Date(2024, 2, 31, 3, 0, 0, 0).getTime());
    expect(ts2).toBeGreaterThan(new Date(2024, 3, 1, 1, 0, 0, 0).getTime());
    expect(ts2).toBeLessThan(new Date(2024, 3, 1, 3, 0, 0, 0).getTime());
    expect(ts3).toBeGreaterThan(new Date(2024, 3, 2, 1, 0, 0, 0).getTime());
    expect(ts3).toBeLessThan(new Date(2024, 3, 2, 3, 0, 0, 0).getTime());
  });
  test("daily: too late: tomorrow and the 2 days after", () => {
    const mockDate = new Date(2023, 11, 31, 21, 1, 1, 1);
    jest.setSystemTime(mockDate);
    const [ts1, ts2, ts3] = getTimestamps(
      {
        period: "Daily",
        start: "1am", // 1
        end: "3am", // 3
        weekday: "Sunday",
        date: 1,
      },
      3
    );
    expect(ts1).toBeGreaterThan(new Date(2024, 0, 1, 1, 0, 0, 0).getTime());
    expect(ts1).toBeLessThan(new Date(2024, 0, 31, 3, 0, 0, 0).getTime());
    expect(ts2).toBeGreaterThan(new Date(2024, 0, 2, 1, 0, 0, 0).getTime());
    expect(ts2).toBeLessThan(new Date(2024, 0, 2, 3, 0, 0, 0).getTime());
    expect(ts3).toBeGreaterThan(new Date(2024, 0, 3, 1, 0, 0, 0).getTime());
    expect(ts3).toBeLessThan(new Date(2024, 0, 3, 3, 0, 0, 0).getTime());
  });
  test("weekly: today and next year", () => {
    const mockDate = new Date(2023, 11, 31, 2, 1, 1, 1);
    jest.setSystemTime(mockDate);
    const [ts1, ts2, ts3] = getTimestamps(
      {
        period: "Weekly",
        start: "1am", // 1
        end: "3am", // 3
        weekday: "Sunday",
        date: 1,
      },
      3
    );
    expect(ts1).toBeGreaterThan(Date.now());
    expect(ts1).toBeLessThan(new Date(2023, 11, 31, 3, 0, 0, 0).getTime());
    expect(ts2).toBeGreaterThan(new Date(2024, 0, 7, 1, 0, 0, 0).getTime());
    expect(ts2).toBeLessThan(new Date(2024, 0, 7, 3, 0, 0, 0).getTime());
    expect(ts3).toBeGreaterThan(new Date(2024, 0, 14, 1, 0, 0, 0).getTime());
    expect(ts3).toBeLessThan(new Date(2024, 0, 14, 3, 0, 0, 0).getTime());
  });
  test("weekly: tomorrow and next year", () => {
    const mockDate = new Date(2023, 11, 30, 2, 1, 1, 1);
    jest.setSystemTime(mockDate);
    const [ts1, ts2, ts3] = getTimestamps(
      {
        period: "Weekly",
        start: "1am", // 1
        end: "3am", // 3
        weekday: "Sunday",
        date: 1,
      },
      3
    );
    expect(ts1).toBeGreaterThan(new Date(2023, 11, 31, 1, 0, 0, 0).getTime());
    expect(ts1).toBeLessThan(new Date(2023, 11, 31, 3, 0, 0, 0).getTime());
    expect(ts2).toBeGreaterThan(new Date(2024, 0, 7, 1, 0, 0, 0).getTime());
    expect(ts2).toBeLessThan(new Date(2024, 0, 7, 3, 0, 0, 0).getTime());
    expect(ts3).toBeGreaterThan(new Date(2024, 0, 14, 1, 0, 0, 0).getTime());
    expect(ts3).toBeLessThan(new Date(2024, 0, 14, 3, 0, 0, 0).getTime());
  });
  test("fortnightly: today and next year", () => {
    const mockDate = new Date(2023, 11, 31, 2, 1, 1, 1);
    jest.setSystemTime(mockDate);
    const [ts1, ts2, ts3] = getTimestamps(
      {
        period: "Fortnightly",
        start: "1am", // 1
        end: "3am", // 3
        weekday: "Sunday",
        date: 1,
      },
      3
    );
    expect(ts1).toBeGreaterThan(Date.now());
    expect(ts1).toBeLessThan(new Date(2023, 11, 31, 3, 0, 0, 0).getTime());
    expect(ts2).toBeGreaterThan(new Date(2024, 0, 14, 1, 0, 0, 0).getTime());
    expect(ts2).toBeLessThan(new Date(2024, 0, 14, 3, 0, 0, 0).getTime());
    expect(ts3).toBeGreaterThan(new Date(2024, 0, 28, 1, 0, 0, 0).getTime());
    expect(ts3).toBeLessThan(new Date(2024, 0, 28, 3, 0, 0, 0).getTime());
  });
  test("fortnightly: too late: next week and next year", () => {
    const mockDate = new Date(2023, 11, 23, 4, 1, 1, 1);
    jest.setSystemTime(mockDate);
    const [ts1, ts2, ts3] = getTimestamps(
      {
        period: "Fortnightly",
        start: "1am", // 1
        end: "3am", // 3
        weekday: "Saturday",
        date: 1,
      },
      3
    );
    expect(ts1).toBeGreaterThan(new Date(2023, 11, 30, 1, 0, 0, 0).getTime());
    expect(ts1).toBeLessThan(new Date(2023, 11, 30, 3, 0, 0, 0).getTime());
    expect(ts2).toBeGreaterThan(new Date(2024, 0, 13, 1, 0, 0, 0).getTime());
    expect(ts2).toBeLessThan(new Date(2024, 0, 13, 3, 0, 0, 0).getTime());
    expect(ts3).toBeGreaterThan(new Date(2024, 0, 27, 1, 0, 0, 0).getTime());
    expect(ts3).toBeLessThan(new Date(2024, 0, 27, 3, 0, 0, 0).getTime());
  });
  test("monthly: today and next year", () => {
    const mockDate = new Date(2023, 11, 1, 2, 1, 1, 1);
    jest.setSystemTime(mockDate);
    const [ts1, ts2, ts3] = getTimestamps(
      {
        period: "Monthly",
        start: "1am", // 1
        end: "3am", // 3
        weekday: "Sunday",
        date: 1,
      },
      3
    );
    expect(ts1).toBeGreaterThan(Date.now());
    expect(ts1).toBeLessThan(new Date(2023, 11, 1, 3, 0, 0, 0).getTime());
    expect(ts2).toBeGreaterThan(new Date(2024, 0, 1, 1, 0, 0, 0).getTime());
    expect(ts2).toBeLessThan(new Date(2024, 0, 1, 3, 0, 0, 0).getTime());
    expect(ts3).toBeGreaterThan(new Date(2024, 1, 1, 1, 0, 0, 0).getTime());
    expect(ts3).toBeLessThan(new Date(2024, 1, 1, 3, 0, 0, 0).getTime());
  });
  test("monthly: too late: new years and next year (leap year)", () => {
    const mockDate = new Date(2023, 10, 30, 4, 1, 1, 1);
    jest.setSystemTime(mockDate);
    const timestamps = getTimestamps(
      {
        period: "Monthly",
        start: "1am", // 1
        end: "3am", // 3
        weekday: "Sunday",
        date: 31,
      },
      3
    );
    timestamps.forEach((ts) => {
      console.log(new Date(ts).toLocaleString());
    });
    const [ts1, ts2, ts3] = timestamps;
    expect(ts1).toBeGreaterThan(new Date(2023, 11, 31, 1, 0, 0, 0).getTime());
    expect(ts1).toBeLessThan(new Date(2023, 11, 31, 3, 0, 0, 0).getTime());
    expect(ts2).toBeGreaterThan(new Date(2024, 0, 31, 1, 0, 0, 0).getTime());
    expect(ts2).toBeLessThan(new Date(2024, 0, 31, 3, 0, 0, 0).getTime());
    expect(ts3).toBeGreaterThan(new Date(2024, 1, 29, 1, 0, 0, 0).getTime());
    expect(ts3).toBeLessThan(new Date(2024, 1, 29, 3, 0, 0, 0).getTime());
  });
  test("monthly: too late: new years eve eve and next year (leap year)", () => {
    const mockDate = new Date(2023, 10, 30, 4, 1, 1, 1);
    jest.setSystemTime(mockDate);
    const timestamps = getTimestamps(
      {
        period: "Monthly",
        start: "1am", // 1
        end: "3am", // 3
        weekday: "Sunday",
        date: 30,
      },
      3
    );
    timestamps.forEach((ts) => {
      console.log(new Date(ts).toLocaleString());
    });
    const [ts1, ts2, ts3] = timestamps;
    expect(ts1).toBeGreaterThan(new Date(2023, 11, 30, 1, 0, 0, 0).getTime());
    expect(ts1).toBeLessThan(new Date(2023, 11, 30, 3, 0, 0, 0).getTime());
    expect(ts2).toBeGreaterThan(new Date(2024, 0, 30, 1, 0, 0, 0).getTime());
    expect(ts2).toBeLessThan(new Date(2024, 0, 30, 3, 0, 0, 0).getTime());
    expect(ts3).toBeGreaterThan(new Date(2024, 1, 29, 1, 0, 0, 0).getTime());
    expect(ts3).toBeLessThan(new Date(2024, 1, 29, 3, 0, 0, 0).getTime());
  });
  test("monthly: too late: new years eve eve eve and next year (non leap year)", () => {
    const mockDate = new Date(2022, 10, 29, 4, 1, 1, 1);
    jest.setSystemTime(mockDate);
    const timestamps = getTimestamps(
      {
        period: "Monthly",
        start: "1am", // 1
        end: "3am", // 3
        weekday: "Sunday",
        date: 29,
      },
      3
    );
    timestamps.forEach((ts) => {
      console.log(new Date(ts).toLocaleString());
    });
    const [ts1, ts2, ts3] = timestamps;
    expect(ts1).toBeGreaterThan(new Date(2022, 11, 29, 1, 0, 0, 0).getTime());
    expect(ts1).toBeLessThan(new Date(2022, 11, 29, 3, 0, 0, 0).getTime());
    expect(ts2).toBeGreaterThan(new Date(2023, 0, 29, 1, 0, 0, 0).getTime());
    expect(ts2).toBeLessThan(new Date(2023, 0, 29, 3, 0, 0, 0).getTime());
    expect(ts3).toBeGreaterThan(new Date(2023, 1, 28, 1, 0, 0, 0).getTime());
    expect(ts3).toBeLessThan(new Date(2023, 1, 28, 3, 0, 0, 0).getTime());
  });
});
