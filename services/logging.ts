import { env } from "@/constants/env";
import { _executeFunction, listDocuments } from "./appwrite";
import { Query } from "react-native-appwrite";
import { toLogList } from "@/util/dataTransferObject";

export const createSession = async (user_id: string, device_id: string) => {
  try {
    await _executeFunction(env.FUNCTION_LOGGING, "createSession", {
      user_id: user_id,
      device_id: device_id,
    });
  } catch (error) {
    console.log("logging.createSession : ", error);
    throw error;
  }
};

export const deleteSession = async (user_id: string) => {
  try {
    await _executeFunction(env.FUNCTION_LOGGING, "deleteSession", {
      user_id: user_id,
    });
  } catch (error) {
    console.log("logging.createSession : ", error);
    throw error;
  }
};

export const getDeviceLog = async (device_id: string) => {
  try {
    const result = await listDocuments(
      env.DATABASE_PRIMARY,
      env.COLLECTION_LOG,
      [Query.equal("device_id", device_id), Query.orderDesc("$createdAt")]
    );

    return toLogList(result.documents);
  } catch (error) {
    console.log("logging.getDeviceLog : ", error);
    throw error;
  }
};

export const getLogs = async () => {
  try {
    const result = await listDocuments(
      env.DATABASE_PRIMARY,
      env.COLLECTION_LOG,
      [Query.orderDesc("$createdAt")]
    );

    console.log(JSON.stringify(result, null, 2));

    return toLogList(result.documents);
  } catch (error) {
    console.log("logging.getLogs : ", error);
    throw error;
  }
};
