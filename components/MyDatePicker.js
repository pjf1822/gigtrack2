import DateTimePicker from "@react-native-community/datetimepicker";
import CalendarPicker from "react-native-calendar-picker";
import { useField } from "formik";
import { View } from "react-native";
import { colors, regFont } from "../theme";

export const MyDatePicker = ({ name = "", value }) => {
  const [field, meta, helpers] = useField(name);
  const { setValue } = helpers;

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || value;
    setValue(currentDate);
  };

  const onDateChange = (date) => {
    setValue(new Date(date));
  };

  const renderDatePicker = () => {
    if (Platform.OS === "ios") {
      return (
        <DateTimePicker
          value={value}
          mode="date"
          display="spinner"
          onChange={onChange}
          style={{ height: 200, zIndex: 99 }}
          textColor={colors.beige}
        />
      );
    } else {
      return (
        <View style={{ paddingTop: 20 }}>
          <CalendarPicker
            selectedDayColor={colors.green}
            selectedDayStyle={{ backgroundColor: colors.green }}
            onDateChange={onDateChange}
            todayBackgroundColor={colors.beige}
            todayTextStyle={{ color: colors.blue }}
            selectedDayTextColor={colors.beige}
            textStyle={{ fontFamily: regFont.fontFamily, color: colors.beige }}
          />
        </View>
      );
    }
  };

  return <View>{renderDatePicker()}</View>;
};
