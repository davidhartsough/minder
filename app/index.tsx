import { useCallback, useState } from "react";
import { FlatList } from "react-native";
import { Link, useFocusEffect } from "expo-router";
import { List, getTitles } from "@/store/store";
import MyView from "@/components/MyView";
import SLoader from "@/components/SLoader";
import SView from "@/components/SView";
import NewListLink from "@/components/NewListLink";
import { Colors } from "@/constants/Colors";
import { bottomBar } from "@/constants/constants";
import { register } from "@/notifications";

register();

function Item({ item }: { item: List }) {
  return (
    <Link
      href={{ pathname: "/[id]", params: { id: item.id } }}
      style={{ color: Colors.text, fontSize: 18, padding: 16 }}
    >
      {item.name}
    </Link>
  );
}

export default function HomeScreen() {
  const [data, setData] = useState<List[] | null>(null);
  useFocusEffect(
    useCallback(() => {
      getTitles().then(setData);
    }, [])
  );
  if (data === null) return <SLoader />;
  if (data.length === 0) {
    return (
      <SView>
        <MyView flexed centered>
          <NewListLink />
        </MyView>
      </SView>
    );
  }
  return (
    <SView>
      <FlatList
        data={data}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={({ id }) => id}
        contentContainerStyle={{ paddingBottom: 96 }}
      />
      <MyView style={[bottomBar, { paddingTop: 12, paddingBottom: 16 }]}>
        <NewListLink />
      </MyView>
    </SView>
  );
}
