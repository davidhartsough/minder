import { Colors } from "@/constants/Colors";
import { TextInput as DefaultTextInput, TextInputProps } from "react-native";

export default function Input(props: TextInputProps) {
  const { style, ...otherProps } = props;
  return (
    <DefaultTextInput
      style={[
        {
          color: Colors.text,
          paddingHorizontal: 10,
          paddingVertical: 7,
          marginVertical: 4,
          fontSize: 16,
        },
        style,
      ]}
      placeholderTextColor={Colors.placeholder}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...otherProps}
    />
  );
}
