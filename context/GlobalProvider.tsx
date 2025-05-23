import {
  GlobalContextInterface,
  RefreshUserRecordType,
} from "@/context/context";
import {
  defaultValue,
  emptyUserCredential,
  emptyUserInfo,
} from "@/context/values";
import { getCurrentUser } from "@/services/appwrite";
import { Credentials, UserInfo } from "@/services/types/model";
import { getUserCredential, getUserInfo } from "@/services/user";
import { useNetInfo } from "@react-native-community/netinfo";
import { router } from "expo-router";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Models } from "react-native-appwrite";
import Toast from "react-native-toast-message";

export const GlobalContext =
  createContext<GlobalContextInterface>(defaultValue);

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const { isInternetReachable } = useNetInfo();
  const [isInternetConnection, setIsInternetConnection] =
    useState<boolean>(false);
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );
  const [userInfo, setUserInfo] = useState<UserInfo>(emptyUserInfo);
  const [credentials, setCredentials] =
    useState<Credentials>(emptyUserCredential);

  const [isLoading, setIsLoading] = useState(true);

  const initializeGlobalState = async () => {
    try {
      setIsLoading(true);

      const currentUser = await getCurrentUser();

      if (currentUser) {
        setUser(currentUser);

        const [_info, _userCredentials] = await Promise.all([
          getUserInfo(currentUser.$id),
          getUserCredential(currentUser.$id),
        ]);

        setUserInfo(_info);
        setCredentials(_userCredentials);

        console.log("User role:", currentUser.labels[0]!);
        router.replace("/home");
      } else {
        setUser(null);
        router.replace("/");
      }
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initializeGlobalState();
  }, []);

  useEffect(() => {
    const promptInternetStatus = async () => {
      if (isInternetReachable === null) return;
      if (isInternetReachable) {
        setIsInternetConnection(true);
      } else {
        Toast.show({
          type: "info",
          text1: "No Internet",
          text2: "Please Connect to the internet",
        });

        setIsInternetConnection(false);
      }
    };

    promptInternetStatus();
  }, [isInternetReachable]);

  const refreshUserRecord = async ({ info }: RefreshUserRecordType) => {
    if (!user?.$id) return;

    const updates = [];

    if (info) updates.push(getUserInfo(user.$id).then(setUserInfo));

    await Promise.all(updates);
  };

  const resetGlobalState = () => {
    setUser(null);
    setUserInfo(emptyUserInfo);
    setCredentials(emptyUserCredential);
    router.replace("/");
    setIsLoading(false);
  };

  return (
    <GlobalContext.Provider
      value={{
        setUser,
        setUserInfo,
        setCredentials,
        refreshUserRecord,
        resetGlobalState,
        initializeGlobalState,
        user,
        userInfo,
        credentials,
        isLoading,
        isInternetConnection,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
