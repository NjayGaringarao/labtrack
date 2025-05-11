import { env } from "@/constants/env";
import { _executeFunction } from "./appwrite";

export const createSession = async (user_id: string, device_id: string) => {
  try {
    await _executeFunction(env.FUNCTION_LOGGING, "createSession", {
      user_id: user_id,
      device_id: device_id,
    });
  } catch (error) {
    console.log("logging.createSession : ", error);
  }
};

export const deleteSession = async (user_id: string, device_id: string) => {
  try {
    await _executeFunction(env.FUNCTION_LOGGING, "deleteSession", {
      user_id: user_id,
      device_id: device_id,
    });
  } catch (error) {
    console.log("logging.createSession : ", error);
  }
};
