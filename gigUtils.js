import Toast from "react-native-root-toast";
import { createGig, deleteGig, fetchSingleGig, updateGig } from "./api";
import { colors } from "./theme";

export const getSingleGig = async (id, setPageData) => {
  try {
    const data = await fetchSingleGig(id);
    setPageData(data);
  } catch (error) {
    console.error("An error occurred while fetching the transactions:", error);
  }
};
export const handleCreateGig = async (
  values,
  getAllGigs,
  toggleOverlay,
  allGigs
) => {
  try {
    const response = await createGig(values);
    if (response.message === "Gig created successfully!") {
      let toast = Toast.show("Gig created!", {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        backgroundColor: colors.green,
        textColor: colors.beige,
        opacity: 1,
      });
      setTimeout(() => {
        if (allGigs?.length === 0) {
          let toast = Toast.show("Swipe each gig to edit or delete!", {
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
            backgroundColor: colors.green,
            textColor: colors.beige,
            opacity: 1,
          });
        }
      }, 1000);
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
        position: Toast.positions.BOTTOM,
        backgroundColor: colors.green,
        textColor: colors.beige,
        opacity: 1,
      });
      setTimeout(() => {
        navigation.removeListener;
        navigation.goBack();
      }, 1000);
    }
  } catch (error) {
    let toast = Toast.show("Could not update", {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
      backgroundColor: colors.terraCotta,
      textColor: colors.beige,
    });
  }
};

export const handleDeleteGig = async (id, pageName, navigation, getAllGigs) => {
  try {
    const response = await deleteGig(id);
    if (response.message === "Gig deleted successfully!") {
      let toast = Toast.show("Gig deleted!", {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        backgroundColor: colors.green,
        textColor: colors.beige,

        opacity: 1,
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
      position: Toast.positions.BOTTOM,
      backgroundColor: colors.terraCotta,
      textColor: colors.beige,
      opacity: 1,
    });
  }
};
