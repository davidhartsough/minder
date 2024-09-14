import * as Notifications from "expo-notifications";
import {
  getList,
  getNotificationIds,
  saveNotificationIds,
} from "@/store/store";
import { Schedule, getTimestamps } from "./constants/schedule";

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

export async function scheduleNotifications(id: string, sched: Schedule) {
  const list = await getList(id);
  if (!list) return;
  const prevNotificationIds = await getNotificationIds(id);
  if (prevNotificationIds) {
    await clearForList(prevNotificationIds);
  }
  const { title, items } = list;
  const ts = getTimestamps(sched, items.length);
  const notificationIds = await Promise.all(
    shuffleArray(items).map((body, i) => schedule(title, body, ts[i]))
  );
  await saveNotificationIds(id, notificationIds);
}

async function clearForList(notificationIds: string[]) {
  for (const id of notificationIds) {
    await Notifications.cancelScheduledNotificationAsync(id);
  }
}
