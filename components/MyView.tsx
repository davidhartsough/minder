import { Colors } from "@/constants/Colors";
import { View as DefaultView, ViewProps } from "react-native";

export default function MyView({
  children,
  style,
  flexed = false,
  padded = false,
  centered = false,
  bordered = false,
  row = false,
  wrap = false,
  separate = false,
  margin,
  marginHorizontal,
  marginVertical,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
}: {
  children?: ViewProps["children"];
  style?: ViewProps["style"];
  flexed?: boolean;
  padded?: boolean;
  centered?: boolean;
  bordered?: boolean;
  row?: boolean;
  wrap?: boolean;
  separate?: boolean;
  margin?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
}) {
  const styles: ViewProps["style"] = [
    {
      backgroundColor: Colors.background,
      flex: flexed ? 1 : undefined,
      padding: padded ? 16 : undefined,
      // eslint-disable-next-line no-nested-ternary
      justifyContent: centered
        ? "center"
        : separate
        ? "space-between"
        : "flex-start",
      alignItems: centered || row ? "center" : undefined,
      borderColor: bordered ? Colors.border : undefined,
      borderWidth: bordered ? 1 : undefined,
      borderRadius: bordered ? 4 : undefined,
      flexDirection: row ? "row" : undefined,
      flexWrap: wrap ? "wrap" : undefined,
      margin,
      marginHorizontal,
      marginVertical,
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
    },
    style,
  ];
  return <DefaultView style={styles}>{children}</DefaultView>;
}
