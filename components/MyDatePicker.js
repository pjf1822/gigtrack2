import DateTimePicker from "@react-native-community/datetimepicker";
import { useField } from "formik";
import { View } from "react-native";

export const MyDatePicker = ({ name = "", value }) => {
  const [field, meta, helpers] = useField(name);
  const { setValue } = helpers;
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || value;
    setValue(currentDate);
  };

  return (
    <View>
      <DateTimePicker
        value={value}
        mode="date"
        display="spinner"
        onChange={onChange}
        style={{ height: 200, zIndex: 99 }}
        textColor="black"
      />
    </View>
  );
};
