import { env } from "@/constants/env";
import { getDocument, listDocuments } from "./appwrite";
import { mergeSessionList } from "@/util/session";
import { toSession } from "@/util/dataTransferObject";

export const getDeviceSession = async (user_id: string) => {
  try {
    const document = await getDocument(
      env.DATABASE_PRIMARY,
      env.COLLECTION_SESSION_DEVICE,
      user_id
    );
    return toSession(document);
  } catch (error) {
    console.log("session.getDeviceSession : ", error);
    throw error;
  }
};

export const getSessions = async () => {
  try {
    const sessionUserList = await listDocuments(
      env.DATABASE_PRIMARY,
      env.COLLECTION_SESSION_USER
    );
    const sessionDeviceList = await listDocuments(
      env.DATABASE_PRIMARY,
      env.COLLECTION_SESSION_DEVICE
    );

    return mergeSessionList(
      sessionUserList.documents,
      sessionDeviceList.documents
    );
  } catch (error) {
    console.log("session.getSessions : ", error);
    throw error;
  }
};
