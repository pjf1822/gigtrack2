import { useState } from "react";
import { Button, Overlay } from "@rneui/themed";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Formik } from "formik";
import { createGig } from "../api";
import { MyDatePicker } from "./MyDatePicker";

export const CreateNewGig = ({ getAllGigs }) => {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const handleFormSubmit = async (values) => {
    console.log(values);
    try {
      const response = await createGig(values);
      await getAllGigs();
      toggleOverlay();
    } catch (error) {
      console.error("Error creating gig:", error);
    }
  };

  return (
    <View>
      <Button
        title="Add New Gig"
        onPress={toggleOverlay}
        buttonStyle={styles.button}
      />
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={styles.overlay}
      >
        <Formik
          initialValues={{ employer: "", date: new Date() }}
          onSubmit={(values) => handleFormSubmit(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View>
              <Text style={styles.label}>Employer:</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={handleChange("employer")}
                onBlur={handleBlur("employer")}
                value={values.employer}
              />
              <MyDatePicker name="date" value={values?.date} />
              <Button
                onPress={handleSubmit}
                title="Add Gig"
                style={{ paddingTop: 10 }}
                disabled={!values.employer}
              />
            </View>
          )}
        </Formik>
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 10,
  },
  textPrimary: {
    marginVertical: 20,
    textAlign: "center",
    fontSize: 20,
  },
  textSecondary: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 17,
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
  overlay: {
    width: "90%",
    maxHeight: "90%",
    backgroundColor: "black",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
});
