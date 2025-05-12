import { env } from "@/constants/env";
import {
  appwriteService,
  createDocument,
  deleteDocument,
  getDocument,
  listDocuments,
} from "./appwrite";
import { ID, Models, Query } from "react-native-appwrite";
import { toDevice, toDeviceList } from "@/util/dataTransferObject";

export const getDevices = async (location?: "HYBRID" | "COMLAB") => {
  try {
    let documents: Models.Document[] = [];
    if (location) {
      const result = await appwriteService.database.listDocuments(
        env.DATABASE_PRIMARY,
        env.COLLECTION_DEVICE,
        [Query.equal("location", location)]
      );

      documents = result.documents;
    } else {
      const result = await appwriteService.database.listDocuments(
        env.DATABASE_PRIMARY,
        env.COLLECTION_DEVICE
      );

      documents = result.documents;
    }

    return toDeviceList(documents);
  } catch (error) {
    console.log("device.getDevices : ", error);
    throw error;
  }
};

export const getDevice = async (device_id: string) => {
  try {
    const result = await getDocument(
      env.DATABASE_PRIMARY,
      env.COLLECTION_DEVICE,
      device_id
    );
    return toDevice(result);
  } catch (error) {
    console.log("device.getDevice : ", error);
    throw error;
  }
};

export const deleteDevice = async (device_id: string) => {
  try {
    await deleteDocument(
      env.DATABASE_PRIMARY,
      env.COLLECTION_DEVICE,
      device_id
    );
  } catch (error) {
    console.log("device.deleteDevice : ", error);
    throw error;
  }
};

export const addDevice = async (alias: string, location: string) => {
  try {
    await createDocument(
      env.DATABASE_PRIMARY,
      env.COLLECTION_DEVICE,
      ID.unique(),
      {
        alias: alias,
        location: location,
      }
    );
  } catch (error) {
    console.log("device.deleteDevice : ", error);
    throw error;
  }
};

export const isAliasAvailable = async (alias: string) => {
  try {
    const query = await listDocuments(
      env.DATABASE_PRIMARY,
      env.COLLECTION_DEVICE,
      [Query.equal("alias", alias)]
    );

    return !!query.total;
  } catch (error) {
    console.log("device.isAliasAvailable : ", error);
    throw error;
  }
};
