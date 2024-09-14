import AsyncStorage from "@react-native-async-storage/async-storage";

export async function save(key: string, val: string) {
  await AsyncStorage.setItem(key, val);
}

export async function read(key: string) {
  const str = await AsyncStorage.getItem(key);
  return str;
}

export async function deleteItem(key: string) {
  await AsyncStorage.removeItem(key);
}

export type List = { id: string; name: string };

let currentId: string;
let currentTitle: string;
let currentItems: string[] = [];

export function setCurrentList(id: string, title: string, items: string[]) {
  currentId = id;
  currentTitle = title;
  currentItems = items;
}

export function getCurrentList(id: string) {
  if (id !== currentId) return null;
  return {
    id: currentId,
    title: currentTitle,
    items: currentItems,
  };
}

export function getCurrentTitle(id: string) {
  return id === currentId ? currentTitle : null;
}

export function getCurrentItems(id: string) {
  return id === currentId ? currentItems : null;
}

export async function getTitles() {
  const res = await read("lists");
  if (res) {
    return JSON.parse(res) as List[];
  } else {
    await save("lists", "[]");
    return [];
  }
}

export async function getList(id: string) {
  const curr = getCurrentList(id);
  if (curr) return curr;
  const [[_, titles], [__, list]] = await AsyncStorage.multiGet(["lists", id]);
  if (!titles) {
    await save("lists", "[]");
    return null;
  }
  const lists = JSON.parse(titles) as List[];
  const thisList = lists.find((l) => l.id === id);
  if (!thisList) return null;
  const title = thisList.name;
  const items = list ? (JSON.parse(list) as string[]) : [];
  if (!list) {
    await save(id, "[]");
  }
  setCurrentList(id, title, items);
  return {
    id,
    title,
    items,
  };
}

export function getId(str: string) {
  return str
    .toLowerCase()
    .slice(0, 30)
    .trim()
    .replace(/[^a-z0-9]/gi, "");
}

export async function createList(title: string, itemsText: string) {
  const items = itemsText
    .split("\n")
    .map((i) => i.trim())
    .filter((i) => i.length > 0);
  const id = getId(title);
  const titles = await getTitles();
  const newTitles: List[] = [...titles, { id, name: title }];
  await save("lists", JSON.stringify(newTitles));
  await save(id, JSON.stringify(items));
  setCurrentList(id, title, items);
  return id;
}

export async function updateTitle(id: string, title: string) {
  const titles = await getTitles();
  const index = titles.findIndex((l) => l.id === id);
  titles[index].name = title;
  await save("lists", JSON.stringify(titles));
  currentTitle = title;
}

export async function updateItems(id: string, itemsText: string) {
  const items = itemsText
    .split("\n")
    .map((i) => i.trim())
    .filter((i) => i.length > 0);
  await save(id, JSON.stringify(items));
  currentItems = items;
}

export async function saveNotificationIds(
  listId: string,
  notificationIds: string[]
) {
  await save(`${listId}__notifications`, JSON.stringify(notificationIds));
}

export async function getNotificationIds(listId: string) {
  const ids = await read(`${listId}__notifications`);
  if (!ids) return null;
  return JSON.parse(ids) as string[];
}
