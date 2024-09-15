import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { Colors } from "./Colors";

export const stackScreenOptions = {
  headerStyle: {
    backgroundColor: "#0e0e0e",
  },
  headerTintColor: "#fff",
};

export const bottomBar: StyleProp<ViewStyle> = {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 3,
  paddingHorizontal: 8,
  backgroundColor: "#000",
};

export const bottomLink: StyleProp<TextStyle> = {
  flex: 1,
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  paddingVertical: 8,
  paddingHorizontal: 16,
  borderRadius: 8,
  elevation: 0,
  borderWidth: 1,
  borderColor: Colors.border,
  backgroundColor: "transparent",
  alignSelf: "center",
  fontWeight: "bold",
  fontSize: 18,
  letterSpacing: 0.25,
  textAlign: "center",
  color: Colors.text,
  maxHeight: 42,
};
