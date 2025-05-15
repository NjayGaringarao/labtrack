import {
  Credentials,
  Device,
  Log,
  Session,
  UserInfo,
} from "@/services/types/model";
import { Models } from "react-native-appwrite";

export const toDevice = (document: Models.Document): Device => {
  return {
    id: document.$id,
    alias: document.alias,
    location: document.location,
    device_session: document.device_session,
    created_at: new Date(document.$createdAt),
  };
};

export const toDeviceList = (documents: Models.Document[]): Device[] => {
  const devices: Device[] = [];

  documents.forEach((document) => {
    devices.push(toDevice(document));
  });

  return devices;
};

export const toUserInfo = (document: Models.Document): UserInfo => {
  return {
    id: document.$id,
    name: document.name,
    picture_id: document.picture_id,
    dep_prog: document.dep_prog,
    year_level: document.year_level,
    employee_role: document.employee_role,
    face_descriptor: JSON.parse(document.face_descriptor),
    device_session: document.device_session,
  };
};

export const toCredentials = (document: Models.Document): Credentials => {
  return {
    id: document.$id,
    email: document.email,
  };
};

export const toLog = (document: Models.Document): Log => {
  return {
    id: document.$id,
    device: document.device[0] ? toDevice(document.device[0]) : undefined,
    user: document.user[0] ? toUserInfo(document.user[0]) : undefined,
    start: document.start,
    end: document.end,
    user_id: document.user_id,
    user_name: document.user_name,
    user_role: document.user_role,
    device_id: document.device_id,
    device_alias: document.device_alias,
    device_location: document.device_location,
  };
};

export const toLogList = (documents: Models.Document[]): Log[] => {
  const logList: Log[] = [];

  documents.forEach((document) => {
    logList.push(toLog(document));
  });

  return logList;
};

export const toSession = (document: Models.Document): Session => {
  return {
    id: document.$id,
    created_at: document.created_at,
    user: document.user,
    device: document.device,
  };
};

export const toSessionList = (documents: Models.Document[]): Session[] => {
  const sessionList: Session[] = [];

  documents.forEach((document) => {
    sessionList.push(toSession(document));
  });

  return sessionList;
};
