import { Stack } from "expo-router";
import { stackScreenOptions } from "@/constants/styles";

export default function RootLayout() {
  return (
    <Stack screenOptions={stackScreenOptions}>
      <Stack.Screen name="index" />
      <Stack.Screen name="edit" options={{ title: "Edit" }} />
      <Stack.Screen name="notify" options={{ title: "Reminders" }} />
    </Stack>
  );
}
