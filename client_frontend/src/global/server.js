import axios from "axios";

export const BASE_URL = "https://commonvendor-backend.onrender.com/api";

// export const BASE_URL = "http://192.168.29.167:5000/api";
// export const BASE_URL = "http://192.168.186.101:5000/api";
// export const BASE_URL = "http://localhost:5000/api";

export const getData = async (url, token) => {
  let headerObj = {};
  if (token) {
    headerObj = {
      ...headerObj,
      "Content-Type": "application/json",
      token: `Bearer ${token}`,
    };
  }
  try {
    const response = await axios.get(`${BASE_URL}${url}`, {
      headers: headerObj,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error; // Throw the error to handle it in the calling function
  }
};

export const postData = async (url, data, token, type) => {
  let headerObj = {};
  if (token) {
    headerObj = {
      ...headerObj,
      token: `Bearer ${token}`,
    };
  }
  if (type === "media") {
    headerObj = {
      ...headerObj,
      "Content-Type": "multipart/form-data",
    };
  }
  try {
    const response = await axios.post(`${BASE_URL}${url}`, data, {
      headers: headerObj,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error; // Throw the error to handle it in the calling function
  }
};

export const putData = async (url, data, token, type) => {
  console.log(data);
  let headerObj = {};
  if (token) {
    headerObj = {
      ...headerObj,
      token: `Bearer ${token}`,
    };
  }
  if (type === "media") {
    headerObj = {
      ...headerObj,
      "Content-Type": "multipart/form-data",
    };
  }
  try {
    const response = await axios.put(`${BASE_URL}${url}`, data, {
      headers: headerObj,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error; // Throw the error to handle it in the calling function
  }
};

export const deleteData = async (url, token) => {
  let headerObj = {};
  if (token) {
    headerObj = {
      ...headerObj,
      token: `Bearer ${token}`,
    };
  }
  try {
    const response = await axios.delete(`${BASE_URL}${url}`, {
      headers: headerObj,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error; // Throw the error to handle it in the calling function
  }
};
