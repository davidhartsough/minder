import { useCallback, useState } from "react";
import {
  Link,
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";
import { FlatList, View } from "react-native";
import { getId, getList } from "@/store/store";
import SView from "@/components/SView";
import SLoader from "@/components/SLoader";
import MyText from "@/components/MyText";
import MyView from "@/components/MyView";
import { bottomBar, bottomLink } from "@/constants/styles";

export default function ListScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { setOptions } = useNavigation();
  const [data, setData] = useState<string[] | null>(null);
  useFocusEffect(
    useCallback(() => {
      getList(id).then((list) => {
        if (list) {
          setOptions({ title: list.title });
          setData(list.items);
        }
      });
    }, [id])
  );
  if (data === null) return <SLoader />;
  return (
    <SView>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={{ paddingHorizontal: 8, paddingVertical: 4 }}>
            <MyText text={item} />
          </View>
        )}
        keyExtractor={(item, index) => `${getId(item)}-${index}`}
        contentContainerStyle={{ paddingTop: 4, paddingBottom: 96 }}
      />
      <MyView row separate style={[bottomBar, { padding: 8 }]}>
        <Link
          href={{ pathname: "/[id]/edit", params: { id } }}
          style={[bottomLink, { marginRight: 4 }]}
          selectable={false}
        >
          Edit
        </Link>
        <Link
          href={{ pathname: "/[id]/notify", params: { id } }}
          style={[bottomLink, { marginLeft: 4 }]}
          selectable={false}
        >
          Reminders
        </Link>
      </MyView>
    </SView>
  );
}
