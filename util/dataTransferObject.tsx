import { Credentials, Device, Log, UserInfo } from "@/services/types/model";
import { Models } from "react-native-appwrite";

export const toDevice = (document: Models.Document): Device => {
  return {
    id: document.$id,
    alias: document.alias,
    location: document.location,
    device_session: document.device_session,
  };
};

export const toUserInfo = (document: Models.Document): UserInfo => {
  return {
    id: document.$id,
    name: document.name,
    picture_id: document.picture_id,
    dep_prog: document.dep_prog,
    year_level: document.year_level,
    employee_role: document.employee_role,
    face_descriptor: document.face_descriptor,
    device_session: document.device_session,
  };
};

export const toCredentials = (document: Models.Document): Credentials => {
  return {
    id: document.$id,
    email: document.email,
  };
};

export const toLogList = (documents: Models.Document[]): Log[] => {
  const logList: Log[] = [];

  documents.forEach((document) => {
    logList.push(toLog(document));
  });

  return logList;
};

export const toLog = (document: Models.Document): Log => {
  return {
    id: document.$id,
    log_time: document.log_time,
    device: toDevice(document.device),
    user: toUserInfo(document.user_info),
    log_type: document.log_type,
  };
};
