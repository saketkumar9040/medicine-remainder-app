import axios from "axios";

export const postRequest = async (endPoint, data) => {
  try {
    const saveData = await axios.post(
      `http://192.168.29.126:3000/${endPoint}`,
      {
        data,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return saveData.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
