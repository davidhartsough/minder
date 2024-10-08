import * as Notifications from "expo-notifications";
import {
  clearPrevNotifications,
  getList,
  getNotificationIds,
  saveNotificationIds,
} from "@/store/store";
import { Period, Schedule, getTimestamps } from "./constants/schedule";

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

async function schedule(title: string, body: string, timestamp: number) {
  const notificationId = await Notifications.scheduleNotificationAsync({
    content: { title, body },
    trigger: { date: timestamp },
  });
  return notificationId;
}

function chunk(n: number, period: Period) {
  const targetNum = period === "Daily" ? 730 : 104;
  if (n >= targetNum) return { total: n, chunks: 1 };
  const chunks = Math.ceil(targetNum / n);
  return { total: n * chunks, chunks };
}

export async function scheduleNotifications(id: string, sched: Schedule) {
  const list = await getList(id);
  if (!list) return;
  const prevNotificationIds = await getNotificationIds(id);
  if (prevNotificationIds) {
    await clearForList(prevNotificationIds);
    await clearPrevNotifications(id);
  }
  const { title, items } = list;
  const { total, chunks } = chunk(items.length, sched.period);
  const ts = getTimestamps(sched, total);
  const finalSet: string[] = [];
  for (let i = 0; i < chunks; i++) {
    finalSet.push(...shuffleArray(items));
  }
  const notificationIds = await Promise.all(
    finalSet.map((body, i) => schedule(title, body, ts[i]))
  );
  const lastNotificationId = await schedule(
    `"${title}" complete!`,
    `→ You've made it through your "${title}" list ${chunks} times! Want more? Head back to the list's "Reminders" screen and tap "Save" again to repeat.`,
    ts[ts.length - 1] + 600000
  );
  await saveNotificationIds(id, [...notificationIds, lastNotificationId]);
}

async function clearForList(notificationIds: string[]) {
  for (const id of notificationIds) {
    await Notifications.cancelScheduledNotificationAsync(id);
  }
}
