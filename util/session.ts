import { Session } from "@/services/types/model";
import { Models } from "react-native-appwrite";
import { toSessionList } from "./dataTransferObject";

export const mergeSessionList = (
  sessionUserList: Models.Document[],
  sessionDeviceList: Models.Document[]
): Session[] => {
  const users = toSessionList(sessionUserList);
  const devices = toSessionList(sessionDeviceList);

  const deviceMap = new Map(devices.map((sd) => [sd.id, sd]));

  return users.map((su) => {
    const matchingDevice = deviceMap.get(su.id);
    return {
      id: su.id,
      user: su.user ?? null,
      device: matchingDevice?.device ?? null,
      created_at: su.created_at,
    };
  });
};
