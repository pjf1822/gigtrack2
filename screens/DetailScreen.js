import { Text, StyleSheet, TextInput, View } from "react-native";
import React, { useState, useEffect } from "react";
import Toast from "react-native-root-toast";
import { Switch } from "react-native-paper";
import { Button } from "@rneui/themed";
import { Formik, Field } from "formik";
import { MyDatePicker } from "../components/MyDatePicker";
import { deleteGig, fetchSingleGig, updateGig } from "../api";
import { useNavigation } from "@react-navigation/native";

const DetailScreen = ({ route }) => {
  const { itemId } = route.params;
  const [pageData, setPageData] = useState({});
  const navigation = useNavigation();

  const handleFormSubmit = async (values) => {
    try {
      const response = await updateGig(itemId, values);
      if (response.message === "Gig updated successfully!") {
        let toast = Toast.show("Gig updated!", {
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
        });
        setTimeout(() => {
          navigation.removeListener;
          navigation.goBack();
        }, 1000);
      }
    } catch (error) {
      let toast = Toast.show("Could not update", {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
      });
    }
  };
  const getSingleGig = async () => {
    try {
      const data = await fetchSingleGig(itemId);
      setPageData(data);
    } catch (error) {
      console.error(
        "An error occurred while fetching the transactions:",
        error
      );
    }
  };
  const handleDeleteGig = async (_id) => {
    try {
      const response = await deleteGig(_id);
      if (response.message === "Gig deleted successfully!") {
        let toast = Toast.show("Gig deleted!", {
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
        });
        setTimeout(() => {
          navigation.removeListener;
          navigation.goBack();
        }, 1000);
      }
    } catch (error) {
      let toast = Toast.show("Could not delete", {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
      });
    }
  };
  useEffect(() => {
    getSingleGig();
  }, []);

  return (
    <View
      style={{
        flex: 0.8,
        justifyContent: "space-between",
      }}
    >
      {Object.keys(pageData).length > 0 && (
        <Formik
          initialValues={{
            employer: pageData?.employer,
            date: pageData?.date,
            paid: pageData?.paid,
            invoiced: pageData?.invoiced,
          }}
          onSubmit={(values) => handleFormSubmit(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View
              style={{
                flex: 1,
                justifyContent: "space-between",
              }}
            >
              <Text style={[styles.label]}>Employer:</Text>

              <TextInput
                style={styles.textInput}
                onChangeText={handleChange("employer")}
                onBlur={handleBlur("employerrrr")}
                value={values.employer}
              />

              {new Date(pageData?.date) <= new Date() && (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <View style={styles.switchWrapper}>
                    <Text style={styles.label}>Paid:</Text>
                    <Field type="checkbox" name="paid">
                      {({ field, form }) => (
                        <Switch
                          value={field.value}
                          onValueChange={(value) =>
                            form.setFieldValue(field.name, value)
                          }
                        />
                      )}
                    </Field>
                  </View>
                  <View style={styles.switchWrapper}>
                    <Text style={styles.label}>Invoice Sent:</Text>
                    <Field type="checkbox" name="invoiced">
                      {({ field, form }) => (
                        <Switch
                          value={field.value}
                          onValueChange={(value) =>
                            form.setFieldValue(field.name, value)
                          }
                        />
                      )}
                    </Field>
                  </View>
                </View>
              )}

              <MyDatePicker name="date" value={new Date(pageData?.date)} />
              <Button onPress={handleSubmit} title="Update Gig" />
            </View>
          )}
        </Formik>
      )}
      <Button
        buttonStyle={{
          backgroundColor: "rgba(214, 61, 57, 1)",
          marginTop: 20,
        }}
        onPress={() => handleDeleteGig(itemId)}
        title="Delete Gig"
      />
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    margin: 10,
    textAlign: "center",
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
  switchWrapper: {
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 13,
    marginRight: 13,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});
