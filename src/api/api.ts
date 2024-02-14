const apiUrl = "https://reqres.in/api/users";

export const fetchData = async (pageNumber: number) => {
  try {
    const response = await fetch(`${apiUrl}?page=${pageNumber}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const deleteUser = async (userId: number) => {
  try {
    await fetch(`${apiUrl}/${userId}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
