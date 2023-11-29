import Toast from "react-native-root-toast";
import { createGig, deleteGig, updateGig } from "./api";

export const handleCreateGig = async (values, getAllGigs, toggleOverlay) => {
  try {
    const response = await createGig(values);
    if (response.message === "Gig created successfully!") {
      let toast = Toast.show("Gig created!", {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
      });
      setTimeout(() => {}, 1000);
    }
    await getAllGigs();
    toggleOverlay();
  } catch (error) {
    console.error("Error creating gig:", error);
  }
};
export const handleUpdateGig = async (id, values, navigation) => {
  try {
    const response = await updateGig(id, values);
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
