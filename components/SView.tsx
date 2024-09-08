import type { ViewProps } from "react-native";
import MyView from "./MyView";

export default function SView({
  children,
}: {
  children: ViewProps["children"];
}) {
  return (
    <MyView flexed style={{ backgroundColor: "#191919" }}>
      {children}
    </MyView>
  );
}
