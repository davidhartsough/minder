import { ActivityIndicator } from "react-native";
import MyView from "./MyView";
import { Colors } from "@/constants/Colors";

export default function Loader({ size = 24 }: { size?: number }) {
  return (
    <MyView flexed centered>
      <ActivityIndicator color={Colors.primary} size={size} />
    </MyView>
  );
}
