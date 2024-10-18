import axios from "axios";
import { REACT_APP_TASKS_URL } from "../common";

const instance = axios.create({
  baseURL: REACT_APP_TASKS_URL,
});

const api = {
  GetCall: (URL: any, methodyType: any) =>
    instance({
      method: methodyType,
      url: URL,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }),
  PostCall: (URL: any, methodType: any, params: any) =>
    instance({
      method: methodType,
      url: URL,
      data: params,
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }),
};
export default api;

export const loginApiCall = async (params: any) => {
  try {
    const data = await api.PostCall(
      `${REACT_APP_TASKS_URL}auth/login`,
      "POST",
      params
    );
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const postApiCall = async (params: any) => {
  try {
    const data = await api.PostCall(
      `${REACT_APP_TASKS_URL}tasks`,
      "POST",
      params
    );
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getApiCall = async () => {
  try {
    const data = await api.GetCall(`${REACT_APP_TASKS_URL}tasks`, "GET");
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteApiCall = async (params: any) => {
  try {
    const data = await api.PostCall(
      `${REACT_APP_TASKS_URL}tasks/${params}`,
      "DELETE",
      {}
    );
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateApiCall = async (params: any) => {
  try {
    const data = await api.PostCall(
      `${REACT_APP_TASKS_URL}tasks/${params.id}`,
      "PUT",
      params
    );
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
