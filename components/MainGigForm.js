import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import CurrencyInput from "react-native-currency-input";
import { Button } from "@rneui/themed";
import { Switch } from "react-native-paper";
import { MyDatePicker } from "./MyDatePicker";
import { Formik, Field } from "formik";
import { colors, regFont } from "../theme";
import { handleCreateGig, handleDeleteGig, handleUpdateGig } from "../gigUtils";
import { useUser } from "../UserContext";

export default function MainGigForm({
  formType,
  employer,
  date,
  invoiced,
  paid,
  rate,
  itemId,
  navigation,
  getAllGigs,
  toggleOverlay,
  allGigs,
}) {
  const { user } = useUser();

  const gigInitialDate = date ? new Date(date) : new Date();

  const handleTouchableWithoutFeedbackPress = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handleTouchableWithoutFeedbackPress}>
      <View
        style={[
          formType !== "create"
            ? [styles.nonLayoutWrapper, { height: "100%" }]
            : "",
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
            rate: rate ? parseFloat(rate) : 0,
            userUid: user?.uid,
          }}
          onSubmit={(values) => {
            const rateAsString =
              values?.rate === null ? "0" : values?.rate?.toString();
            const updatedValues = { ...values, rate: rateAsString };
            if (formType === "create") {
              handleCreateGig(
                updatedValues,
                getAllGigs,
                toggleOverlay,
                allGigs
              );
            } else {
              handleUpdateGig(itemId, updatedValues, navigation);
            }
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View
              style={{
                padding: 10,
                borderRadius:
                  Platform.OS === "ios" && Platform.isPad ? "10%" : 0,
              }}
            >
              <Text style={styles.label}>Day Rate:</Text>
              <CurrencyInput
                value={values?.rate}
                onChangeValue={(input) => {
                  handleChange("rate")({
                    target: { name: "rate", value: input },
                  });
                }}
                prefix="USD $"
                delimiter=","
                separator="."
                precision={2}
                minValue={0}
                style={styles.textInput}
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
                          fontFamily={regFont.fontFamily}
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
                style={{ paddingTop: 20 }}
                disabled={!values?.employer}
                buttonStyle={{
                  backgroundColor: colors.green,
                }}
                titleStyle={styles.buttonText}
              />
              {formType === "update" && (
                <View
                  style={{
                    height: "34%",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    buttonStyle={{
                      backgroundColor: colors.terraCotta,
                      marginTop: 20,
                    }}
                    onPress={() => {
                      handleDeleteGig(itemId, "DetailsPage", navigation, "");
                    }}
                    title="Delete Gig"
                    titleStyle={styles.buttonText}
                  />
                </View>
              )}
            </View>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  formWrapper: {
    backgroundColor: colors.blue,
    padding: 10,
    display: "flex",
  },
  textInput: {
    borderColor: colors.beige,
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,

    color: colors.beige,
    ...(Platform.OS === "ios" && Platform.isPad
      ? { fontSize: 22, height: 60, marginBottom: 18 }
      : { fontSize: 16, height: 40, marginBottom: 10 }),
  },
  astrikWarning: {
    marginBottom: 16,
    color: colors.terraCotta,
    ...(Platform.OS === "ios" && Platform.isPad
      ? { fontSize: 16 }
      : { fontSize: 12 }),
    fontFamily: regFont.fontFamily,
  },
  label: {
    ...(Platform.OS === "ios" && Platform.isPad
      ? { fontSize: 22, marginBottom: 10 }
      : { fontSize: 16, marginBottom: 5 }),

    color: colors.beige,
    fontFamily: regFont.fontFamily,
  },

  switchWrapper: {
    marginTop: 10,
    marginBottom: 20,
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
  rateWrapper: {
    border: colors.beige,
  },
  buttonText: {
    fontSize: Platform.OS === "ios" && Platform.isPad ? 28 : 18,
    fontFamily: regFont.fontFamily,
  },
});
