import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { getList, updateItems, updateTitle } from "@/store/store";
import SLoader from "@/components/SLoader";
import Form from "@/components/Form";

export default function EditScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [data, setData] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  useEffect(() => {
    getList(id).then((list) => {
      if (list) {
        setTitle(list.title);
        setData(list.items.join("\n"));
      }
    });
  }, [id]);
  if (data === null || title === null) return <SLoader />;
  const submit = async (newTitle: string, itemsText: string) => {
    if (title !== newTitle) {
      await updateTitle(id, newTitle);
    }
    if (data !== itemsText) {
      await updateItems(id, itemsText);
    }
    router.back();
  };
  return (
    <Form onSubmit={submit} defaultTitle={title} defaultItemsText={data} />
  );
}
