import { Stack } from "expo-router";
import { stackScreenOptions } from "@/constants/constants";

export default function RootLayout() {
  return (
    <Stack screenOptions={stackScreenOptions}>
      <Stack.Screen name="index" options={{ title: "Lists" }} />
      <Stack.Screen name="new" options={{ title: "New List" }} />
      <Stack.Screen
        name="[id]"
        getId={() => `${Date.now()}`}
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
