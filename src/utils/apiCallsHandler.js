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
    // console.log(saveData.data)
    return saveData.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// export const getRequest = async (endPoint) => {
//   try{
//     const getDetails = await axios.get(`http://192.168.29.126:3000/${endPoint}`);
//     return getDetails.data;
//   }catch(error){
//     throw new Error(error.message)
//   }
// };
