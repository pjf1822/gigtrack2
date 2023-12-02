const serverIp = "192.168.50.224"; // Your machine's local IP address

const fetchGigs = async (email) => {
  try {
    const res = await fetch(
      `http://${serverIp}:8000/api/gigs/getall?email=${encodeURIComponent(
        email
      )}`,
      {
        method: "GET", // or 'POST' depending on your API endpoint
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch gigs");
    }

    return await res.json();
  } catch (error) {
    console.error("An error occurred while fetching the transactions:", error);
    throw error;
  }
};

const fetchSingleGig = async (_id) => {
  try {
    const res = await fetch(`http://${serverIp}:8000/api/gigs/${_id}`);

    if (!res.ok) {
      throw new Error("Failed to fetch gig");
    }

    return await res.json();
  } catch (error) {
    console.error("An error occurred while fetching the transaction:", error);
    throw error;
  }
};
const createGig = async (payload) => {
  try {
    const res = await fetch(`http://${serverIp}:8000/api/gigs/create`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.error(`Server error: ${res.status} - ${res.statusText}`);
      const errorResponse = await res.text(); // Read the response text
      console.error(`Error response: ${errorResponse}`);
      throw new Error("Something went wrong");
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateGig = async (_id, payload) => {
  try {
    const res = await fetch(`http://${serverIp}:8000/api/gigs/${_id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Something went wrong");
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteGig = async (_id) => {
  try {
    const res = await fetch(`http://${serverIp}:8000/api/gigs/${_id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Failed to delete gig");
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { fetchGigs, fetchSingleGig, createGig, updateGig, deleteGig };
