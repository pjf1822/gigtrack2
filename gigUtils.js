import Toast from "react-native-root-toast";
import { deleteGig } from "./api";

export const handleDeleteGig = async (id, pageName, navigation, getAllGigs) => {
  try {
    const response = await deleteGig(id);
    if (response.message === "Gig deleted successfully!") {
      let toast = Toast.show("Gig deleted!", {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
      });
      setTimeout(() => {
        navigation.removeListener;
        if (pageName === "DetailsPage") {
          navigation.goBack();
        }
      }, 1000);
      if (pageName === "HomePage") {
        getAllGigs();
      }
    }
  } catch (error) {
    let toast = Toast.show("Could not delete", {
      duration: Toast.durations.LONG,
      position: Toast.positions.TOP,
    });
  }
};
