import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { getList, getSchedule, saveSchedule } from "@/store/store";
import SView from "@/components/SView";
import SLoader from "@/components/SLoader";
import MyText from "@/components/MyText";
import MyView from "@/components/MyView";
import FormActions from "@/components/FormActions";
import { bottomBar, picker } from "@/constants/styles";
import {
  Period,
  periods,
  weekdays,
  hours,
  Weekday,
} from "@/constants/schedule";
import { scheduleNotifications } from "@/notifications";

export default function RemindersScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [title, setTitle] = useState<string | null>(null);
  const [period, setPeriod] = useState<Period>("Weekly");
  const [weekday, setWeekday] = useState<Weekday>("Tuesday");
  const [start, setStart] = useState("10am");
  const [end, setEnd] = useState("7pm");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getList(id).then((list) => {
      if (list) {
        getSchedule(id).then((sched) => {
          if (sched) {
            setPeriod(sched.period);
            setWeekday(sched.weekday);
            setStart(sched.start);
            setEnd(sched.end);
          }
          setTitle(list.title);
        });
      }
    });
  }, [id]);
  if (title === null || loading) return <SLoader />;
  const timingErr = hours.indexOf(start) > hours.indexOf(end);
  const submit = async () => {
    if (timingErr) return;
    setLoading(true);
    const newSched = { period, weekday, start, end };
    await saveSchedule(id, newSched);
    await scheduleNotifications(id, newSched);
    router.back();
  };
  return (
    <SView>
      <MyView flexed padded>
        <MyView marginVertical={8}>
          <MyText text={title} bold spaced size={24} />
        </MyView>
        <MyView marginVertical={8}>
          <Picker
            selectedValue={period}
            onValueChange={setPeriod}
            style={picker}
            dropdownIconColor="#fff"
          >
            {periods.map((p) => (
              <Picker.Item label={p} value={p} key={p} />
            ))}
          </Picker>
        </MyView>
        {period === "Weekly" && (
          <MyView marginVertical={8}>
            <Picker
              selectedValue={weekday}
              onValueChange={setWeekday}
              style={picker}
              dropdownIconColor="#fff"
            >
              {weekdays.map((w) => (
                <Picker.Item label={`Every ${w}`} value={w} key={w} />
              ))}
            </Picker>
          </MyView>
        )}
        <MyView marginTop={8} marginBottom={16}>
          <MyView>
            <MyText text="Between" spaced />
          </MyView>
          <MyView row>
            <MyView flexed>
              <Picker
                selectedValue={start}
                onValueChange={setStart}
                style={picker}
                dropdownIconColor="#fff"
              >
                {hours.map((h) => (
                  <Picker.Item label={h} value={h} key={`s${h}`} />
                ))}
              </Picker>
            </MyView>
            <MyText
              text="-"
              bold
              size={20}
              centered
              selectable={false}
              marginHorizontal={8}
            />
            <MyView flexed>
              <Picker
                selectedValue={end}
                onValueChange={setEnd}
                style={picker}
                dropdownIconColor="#fff"
              >
                {hours.map((h) => (
                  <Picker.Item label={h} value={h} key={`e${h}`} />
                ))}
              </Picker>
            </MyView>
          </MyView>
          {timingErr && (
            <MyView>
              <MyText
                text="The end time cannot come before the start time."
                centered
                margin={4}
                style={{ color: "red" }}
              />
            </MyView>
          )}
        </MyView>
      </MyView>
      <MyView style={bottomBar}>
        <FormActions
          submit={submit}
          submitText="Save"
          cancel={router.back}
          submitDisabled={timingErr}
        />
      </MyView>
    </SView>
  );
}
