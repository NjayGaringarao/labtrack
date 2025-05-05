import { Credentials, UserInfo } from "@/services/types/model";
import { Dispatch, SetStateAction } from "react";
import { Models } from "react-native-appwrite";

export interface RefreshUserRecordType {
  info?: boolean;
}

export interface GlobalContextInterface {
  setUser: Dispatch<SetStateAction<Models.User<Models.Preferences> | null>>;
  setUserInfo: Dispatch<SetStateAction<UserInfo>>;
  setCredentials: Dispatch<SetStateAction<Credentials>>;
  resetGlobalState: () => void;
  refreshUserRecord: (e: RefreshUserRecordType) => Promise<void>;
  initializeGlobalState: () => Promise<void>;
  user: Models.User<Models.Preferences> | null;
  userInfo: UserInfo;
  credentials: Credentials;
  fcmToken?: string;
  isLoading: boolean;
  isInternetConnection: boolean | null;
}
