import axios from "axios";
import {
  AIMessageRequest,
  DoctorsResponse,
  LoginResponse,
  MessageHistoryResponse,
  MessagingResponse,
  SendMessageRequest,
  UserFormData,
} from "../types/RegistrationTypes";
import { API } from "../constants/endpoints";

export async function UpdateProfile(
  request: UserFormData
): Promise<LoginResponse> {
  try {
    const response = await axios.patch(
      API.UPDATE_PROFILE + `/${request._id}`,
      request
    );
    if (response.status === 400) {
      return { status: false, message: response.data.message };
    }
    return { status: true, message: "Success", data: response.data.data };
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

export async function FetchProfile(id: string): Promise<LoginResponse> {
  try {
    const response = await axios.get(API.UPDATE_PROFILE + `/${id}`);

    if (response.status === 400) {
      return { status: false, message: response.data.message };
    }

    return {
      status: true,
      message: "Success",
      data: response.data.data,
    };
  } catch (error) {
    console.log(error);
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
export async function MessageAi(
  request: AIMessageRequest
): Promise<LoginResponse> {
  try {
    const response = await axios.post(API.CHAT_AI, request);
    if (response.status === 400) {
      return { status: false, message: response.data.message };
    }
    return { status: true, message: "Success", data: response.data.data };
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

export async function GetDoctors(): Promise<DoctorsResponse> {
  try {
    const response = await axios.get(API.GET_DOCTORS);
    if (response.status === 400) {
      return { status: false, message: response.data.message };
    }
    return { status: true, message: "Success", data: response.data.data };
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

export async function SendMessage(
  request: SendMessageRequest
): Promise<MessagingResponse> {
  try {
    const response = await axios.post(API.MESSAGE, request);
    if (response.status === 400) {
      return { status: false, message: response.data.message };
    }
    return { status: true, message: "Success", data: response.data.data };
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

export async function GetRooms(
  request: string
): Promise<MessageHistoryResponse> {
  try {
    const response = await axios.get(API.ROOMS + `/${request}`);
    if (response.status === 400) {
      return { status: false, message: response.data.message };
    }
    return { status: true, message: "Success", data: response.data.data };
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
