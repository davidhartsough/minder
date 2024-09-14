import { getNextTargetTime } from "./schedule";

describe("getNextTargetTime", () => {
  test("today", () => {
    const mockDate = new Date();
    mockDate.setHours(7, 0, 0, 0);
    jest.setSystemTime(mockDate);
    const t = getNextTargetTime({
      period: "Daily",
      start: "1am",
      end: "11pm",
      weekday: "Sunday",
      date: 1,
    });
    expect(t.getDate()).toBe(mockDate.getDate());
    expect(t.getMonth()).toBe(mockDate.getMonth());
    expect(t.getHours()).toBeGreaterThanOrEqual(mockDate.getHours());
  });
});
