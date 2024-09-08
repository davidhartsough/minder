import type { ReactNode } from "react";
import { Text as DefaultText, TextProps } from "react-native";

import { Colors } from "@/constants/Colors";

export default function MyText({
  text = undefined,
  size = 16,
  bold = false,
  centered = false,
  italic = false,
  spaced = false,
  style,
  color,
  margin,
  marginHorizontal,
  marginVertical,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  numberOfLines = undefined,
  selectable = true,
  children = undefined,
}: {
  text?: string;
  size?: number;
  bold?: boolean;
  centered?: boolean;
  italic?: boolean;
  spaced?: boolean;
  style?: TextProps["style"];
  color?: string;
  numberOfLines?: number;
  margin?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
  selectable?: boolean;
  children?: ReactNode;
}) {
  const textColor = Colors.text;
  if (!text && !children) return null;
  return (
    <DefaultText
      style={[
        {
          color: color || textColor,
          fontSize: size,
          fontWeight: bold ? "bold" : "normal",
          textAlign: centered ? "center" : "left",
          fontStyle: italic ? "italic" : "normal",
          letterSpacing: spaced ? 0.25 : undefined,
          margin,
          marginHorizontal,
          marginVertical,
          marginTop,
          marginRight,
          marginBottom,
          marginLeft,
        },
        style,
      ]}
      numberOfLines={numberOfLines}
      selectable={selectable}
    >
      {text || children}
    </DefaultText>
  );
}
