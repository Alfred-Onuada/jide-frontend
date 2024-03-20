import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "../constants/endpoints";
import {
  UserFormData,
  DoctorFormData,
  LoginRequest,
  LoginResponse,
  UserRegistrationResponse,
} from "../types/RegistrationTypes";
import { saveToLocalStorage } from "../utilities/localstorage";
import axios, { AxiosResponse } from "axios";

export async function handleLogin(
  request: LoginRequest
): Promise<LoginResponse> {
  try {
    const response: AxiosResponse = await axios.post(API.LOGIN, request);
    if (response.status === 200) {
      AsyncStorage.setItem("user_id", response.data.data._id);
      console.log("uuid" + AsyncStorage.getItem("user_id"));
      return { status: true, message: "Success", data: response.data.data };
    } else {
      return {
        status: false,
        message: response.data.message,
        data: response.data.data,
      };
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        status: false,
        message: error.response.data.message,
        data: error.response.data.data,
      };
    } else {
      return {
        status: false,
        message: "An unexpected error occurred",
      };
    }
  }
}

export async function handleRegisterUser(
  request: UserFormData
): Promise<UserRegistrationResponse> {
  try {
    const response: AxiosResponse = await axios.post(
      API.REGISTER_USER,
      request
    );
    // console.log(response);
    AsyncStorage.setItem("user_id", response.data.data._id);
    console.log("uuid" + AsyncStorage.getItem("user_id"));
    if (response.status === 200 || response.status === 201) {
      return { status: true, message: "Success", data: response.data.data };
    } else {
      return {
        status: false,
        message: response.data.message,
        data: response.data.data,
      };
    }
  } catch (error: any) {
    console.log("message" + error.response.data.errors);
    return {
      status: false,
      message: "An unexpected error occurred",
    };
  }
}
