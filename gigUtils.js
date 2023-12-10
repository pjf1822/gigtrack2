import Toast from "react-native-root-toast";
import { createGig, deleteGig, fetchSingleGig, updateGig } from "./api";
import { colors } from "./theme";
import { showToast } from "./helpers";

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
      if (allGigs?.length === 0) {
        showToast(
          "Swipe each gig to edit or delete!",
          Toast.positions.CENTER,
          colors.green
        );
      } else {
        showToast("Gig created!", Toast.positions.TOP, colors.green);
      }
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
      showToast("Gig Updated!", Toast.positions.BOTTOM, colors.green);

      setTimeout(() => {
        navigation.removeListener;
        navigation.goBack();
      }, 1000);
    }
  } catch (error) {
    showToast("Could not update", Toast.positions.BOTTOM, colors.terraCotta);
  }
};

export const handleDeleteGig = async (id, pageName, navigation, getAllGigs) => {
  try {
    const response = await deleteGig(id);
    if (response.message === "Gig deleted successfully!") {
      showToast("Gig deleted!", Toast.positions.BOTTOM, colors.terraCotta);

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
    showToast("Could not delete", Toast.positions.BOTTOM, colors.terraCotta);
  }
};
