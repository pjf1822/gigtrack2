import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Button } from "@rneui/themed";
import { Switch } from "react-native-paper";
import { MyDatePicker } from "./MyDatePicker";
import { Formik, Field } from "formik";
import { colors } from "../theme";

export default function MainGigForm({
  formType,
  handleUpdateGig,
  employer,
  date,
  handleCreateGig,
  invoiced,
  paid,
  handleDeleteGig,
  rate,
}) {
  const gigInitialDate = date ? new Date(date) : new Date();

  return (
    <View
      style={[
        formType !== "create" ? styles.nonLayoutWrapper : "",
        styles.formWrapper,
      ]}
    >
      <Formik
        enableReinitialize={true}
        initialValues={{
          employer: employer,
          date: gigInitialDate || new Date(),
          paid: paid || false,
          invoiced: invoiced || false,
          rate: rate || "",
        }}
        onSubmit={(values) =>
          formType === "create"
            ? handleCreateGig(values)
            : handleUpdateGig(values)
        }
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View
            style={{
              padding: 10,
              borderRadius: "10%",
            }}
          >
            <Text style={styles.label}>Rate:</Text>

            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={values?.rate}
              onChangeText={handleChange("rate")}
            />
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
                        color={colors.green}
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
                        color={colors.green}
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
              buttonStyle={{ backgroundColor: colors.green }}
            />
            {formType === "update" && (
              <Button
                buttonStyle={{
                  backgroundColor: colors.terraCotta,
                  marginTop: 20,
                }}
                onPress={() => handleDeleteGig()}
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
  formWrapper: {
    backgroundColor: colors.blue,
    padding: 10,
    borderRadius: "10%",
  },
  textInput: {
    height: 40,
    borderColor: colors.beige,
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
    color: colors.beige,
  },
  astrikWarning: {
    color: colors.terraCotta,
    fontSize: 12,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: colors.beige,
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
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
  },
});
