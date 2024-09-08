import { router } from "expo-router";
import { createList } from "@/store/store";
import Form from "@/components/Form";

export default function NewListScreen() {
  const submit = async (title: string, itemsText: string) => {
    const id = await createList(title, itemsText);
    router.replace({
      pathname: "/[id]",
      params: { id },
    });
  };
  return <Form onSubmit={submit} />;
}
