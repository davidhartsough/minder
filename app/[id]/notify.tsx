import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { getList } from "@/store/store";
import SView from "@/components/SView";
import SLoader from "@/components/SLoader";
import MyText from "@/components/MyText";

export default function RemindersScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [title, setTitle] = useState<string | null>(null);
  useEffect(() => {
    getList(id).then((list) => {
      if (list) setTitle(list.title);
    });
  }, [id]);
  if (title === null) return <SLoader />;
  return (
    <SView>
      <MyText text={title} />
    </SView>
  );
}
