import { useRef, useState } from "react";
import { ScrollView, Pressable, TextInput } from "react-native";
import { router } from "expo-router";
import SView from "@/components/SView";
import Input from "@/components/Input";
import FormActions from "@/components/FormActions";
import MyView from "@/components/MyView";
import { Colors } from "@/constants/Colors";

export default function Form({
  defaultTitle = "",
  defaultItemsText = "",
  onSubmit,
}: {
  defaultTitle?: string;
  defaultItemsText?: string;
  onSubmit: (title: string, itemsText: string) => void;
}) {
  const [title, setTitle] = useState(defaultTitle);
  const [itemsText, setItemsText] = useState(defaultItemsText);
  const textInputRef = useRef<TextInput | null>(null);
  const focusTextInput = () => {
    if (textInputRef.current) textInputRef.current.focus();
  };
  const submit = () => onSubmit(title.trim(), itemsText.trim());
  return (
    <SView>
      <Input
        placeholder="Title"
        autoFocus
        enterKeyHint="next"
        returnKeyType="next"
        spellCheck
        value={title}
        onChangeText={setTitle}
        onSubmitEditing={focusTextInput}
        style={{ maxHeight: 64, fontWeight: "bold", fontSize: 24 }}
      />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <Pressable
          onPress={focusTextInput}
          style={{ flex: 1 }}
          onTouchEnd={focusTextInput}
        >
          <TextInput
            ref={textInputRef}
            placeholder="Add list items on their own lines"
            spellCheck
            value={itemsText}
            onChangeText={setItemsText}
            textAlignVertical="top"
            enterKeyHint="done"
            returnKeyType="done"
            multiline
            placeholderTextColor={Colors.placeholder}
            style={{
              color: Colors.text,
              paddingHorizontal: 10,
              paddingVertical: 7,
              marginVertical: 4,
              fontSize: 16,
              backgroundColor: "#1c1c1c",
            }}
          />
        </Pressable>
      </ScrollView>
      <MyView style={{ backgroundColor: "#000" }}>
        <FormActions
          submit={submit}
          submitText="Save"
          cancel={router.back}
          submitDisabled={!title || !itemsText}
        />
      </MyView>
    </SView>
  );
}
