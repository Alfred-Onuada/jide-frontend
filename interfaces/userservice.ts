import axios from "axios";
import { LoginResponse, UserFormData } from "../types/RegistrationTypes";
import { API } from "../constants/endpoints";

export async function UpdateProfile(
  request: UserFormData
): Promise<LoginResponse> {
  try {
    const response = await axios.patch(
      API.UPDATE_PROFILE + `${request._id}`,
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
