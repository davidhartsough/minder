import * as Notifications from "expo-notifications";
import { getList, saveNotificationIds } from "@/store/store";
import {
  Schedule,
  offsets,
  getRandomTime,
  getNextTargetTime,
} from "./constants/schedule";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
  handleSuccess: (nId) => {
    console.log("notification id:", nId);
  },
});

export async function register() {
  const { granted } = await Notifications.getPermissionsAsync();
  if (!granted) {
    await Notifications.requestPermissionsAsync();
  }
}

function shuffleArray<T>(array: T[]): T[] {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

// function getRandomNum(max: number): number {
//   return Math.floor(Math.random() * max) + 1;
// }

async function schedule(title: string, body: string, timestamp: number) {
  const notificationId = await Notifications.scheduleNotificationAsync({
    content: { title, body },
    trigger: { date: timestamp },
  });
  return notificationId;
}

export async function scheduleNotifications(id: string, sched: Schedule) {
  const list = await getList(id);
  if (!list) return;
  const { title, items } = list;
  const ntt = getNextTargetTime(sched);
  const shuffledItems = shuffleArray(items);
  const currMonth = ntt.getMonth();
  const currDate = ntt.getDate();
  const { period, start, end, date } = sched;
  const offset = offsets[period];
  const notifications = shuffledItems.map((body, i) => {
    const nextTime = new Date(ntt);
    if (period === "Monthly") {
      nextTime.setMonth(currMonth + i);
      const daysInMonth = new Date(
        nextTime.getFullYear(),
        nextTime.getMonth() + 1,
        0
      ).getDate();
      nextTime.setDate(Math.min(date, daysInMonth));
    } else {
      nextTime.setDate(currDate + i * offset);
    }
    const ts = nextTime.getTime() + getRandomTime(start, end);
    return schedule(title, body, ts);
  });
  const notificationIds = await Promise.all(notifications);
  await saveNotificationIds(id, notificationIds);
}

async function clearForList(notificationIds: string[]) {
  for (const id of notificationIds) {
    await Notifications.cancelScheduledNotificationAsync(id);
  }
}
