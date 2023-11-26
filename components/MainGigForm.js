import { View, Text, TextInput, StyleSheet } from "react-native";
import { Button } from "@rneui/themed";
import { Switch } from "react-native-paper";
import { MyDatePicker } from "./MyDatePicker";
import { Formik, Field } from "formik";

export default function MainGigForm({
  formType,
  handleUpdateGig,
  employer,
  date,
  handleCreateGig,
  invoiced,
  paid,
  handleDeleteGig,
}) {
  const gigInitialDate = date ? new Date(date) : new Date();

  return (
    <View style={formType !== "create" ? styles.nonLayoutWrapper : ""}>
      <Formik
        enableReinitialize={true}
        initialValues={{
          employer: employer,
          date: gigInitialDate || new Date(),
          paid: paid || false,
          invoiced: invoiced || false,
        }}
        onSubmit={(values) =>
          formType === "create"
            ? handleCreateGig(values)
            : handleUpdateGig(values)
        }
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <Text style={styles.label}>Employer:</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={handleChange("employer")}
              onBlur={handleBlur("employer")}
              value={values?.employer}
              keyboardAppearance={"dark"}
            />
            {values.employer === "" && (
              <Text style={styles.astrikWarning}>
                * Need to add an employer to submit the form
              </Text>
            )}

            {values?.date < new Date() && formType !== "create" && (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <View style={styles.switchWrapper}>
                  <Text style={styles.label}>Paid:</Text>
                  <Field type="checkbox" name="paid">
                    {({ field, form }) => (
                      <Switch
                        value={values?.paid}
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
                        value={values?.invoiced}
                        onValueChange={(value) =>
                          form.setFieldValue(field.name, value)
                        }
                      />
                    )}
                  </Field>
                </View>
              </View>
            )}
            <MyDatePicker name="date" value={values?.date} />
            <Button
              onPress={handleSubmit}
              title={formType === "create" ? "Add Gig" : "Update Gig"}
              style={{ paddingTop: 10 }}
              disabled={!values?.employer}
            />
            {formType === "update" && (
              <Button
                buttonStyle={{
                  backgroundColor: "rgba(214, 61, 57, 1)",
                  marginTop: 20,
                }}
                onPress={() => handleDeleteGig(itemId)}
                title="Delete Gig"
              />
            )}
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
  astrikWarning: {
    color: "red",
    fontSize: 12,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
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
  nonLayoutWrapper: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 20,
  },
});