import React from "react";
import { Pressable, PressableProps } from "react-native";
import MyText from "./MyText";
import { Colors } from "@/constants/Colors";

type ButtonTypeOptions = "default" | "primary" | "danger";

const dangerColor = "#f65555";

export default function TextButton({
  text,
  onPress,
  type = "default",
  bgColor,
  textColor,
  disabled = false,
  flex = true,
  margin,
  marginHorizontal,
  marginVertical,
  marginLeft,
  marginRight,
}: {
  text: string;
  onPress: PressableProps["onPress"];
  type?: ButtonTypeOptions;
  bgColor?: string;
  textColor?: string;
  disabled?: boolean;
  flex?: boolean;
  margin?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  marginLeft?: number;
  marginRight?: number;
}) {
  const backgroundColor =
    bgColor ?? type === "primary"
      ? Colors.primary
      : type === "danger"
      ? dangerColor
      : "transparent";
  const borderColor =
    bgColor ?? type === "primary"
      ? Colors.primary
      : type === "danger"
      ? dangerColor
      : Colors.border;
  const color = textColor ?? type === "default" ? Colors.text : "#fff";
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={{
        flex: flex ? 1 : 0,
        flexShrink: flex === false ? 1 : undefined,
        flexGrow: flex === false ? 0 : undefined,
        borderWidth: 1,
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        justifyContent: "center",
        alignItems: "center",
        elevation: 0,
        margin,
        marginHorizontal,
        marginVertical,
        marginLeft,
        marginRight,
        maxHeight: 42,
        backgroundColor: disabled ? Colors.disabledBg : backgroundColor,
        borderColor: disabled ? Colors.disabledBorder : borderColor,
      }}
    >
      <MyText
        text={text}
        color={disabled ? Colors.disabledText : color}
        size={18}
        bold
        centered
        spaced
        numberOfLines={1}
        selectable={false}
      />
    </Pressable>
  );
}
