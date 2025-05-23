import { env } from "@/constants/env";
import { toCredentials, toUserInfo } from "@/util/dataTransferObject";
import { ImagePickerAsset } from "expo-image-picker";
import { Models } from "react-native-appwrite";
import {
  _executeFunction,
  deleteFile,
  getDocument,
  updateDocument,
  updateFile,
  uploadFile,
} from "./appwrite";
import { IUpdateUserInfo } from "./types/interface";
import { Credentials, UserInfo } from "./types/model";

export const getUserInfo = async (user_id: string): Promise<UserInfo> => {
  try {
    const result = await getDocument(
      env.DATABASE_PRIMARY,
      env.COLLECTION_USER,
      user_id
    );

    return toUserInfo(result);
  } catch (error) {
    if (
      error ===
      "AppwriteException: Document with the requested ID could not be found."
    ) {
      throw "User ID is not registered in Track n' Notify";
    } else {
      console.log(`user.getUserInfo : ${error}`);
      throw error;
    }
  }
};

export const getUserCredential = async (
  user_id: string
): Promise<Credentials> => {
  try {
    const result = await getDocument(
      env.DATABASE_PRIMARY,
      env.COLLECTION_CREDENTIALS,
      user_id
    );

    return toCredentials(result);
  } catch (error) {
    console.log(`user.getUserCredential : ${error}`);
    throw error;
  }
};

export const updateProfile = async (
  user_id: string,
  name: [string | undefined, string | undefined, string | undefined],
  newProfilePicture?: ImagePickerAsset
) => {
  let pictureFile: Models.File | undefined = undefined;
  try {
    if (newProfilePicture) {
      pictureFile = await uploadFile(env.BUCKET_IMAGE, {
        name: newProfilePicture.fileName!,
        type: newProfilePicture.mimeType!,
        size: newProfilePicture.fileSize!,
        uri: newProfilePicture.uri!,
      });

      const execution = await updateDocument(
        env.DATABASE_PRIMARY,
        env.COLLECTION_USER,
        user_id,
        {
          picture_id: pictureFile.$id,
          name: name,
        }
      );

      await updateFile(env.BUCKET_IMAGE, pictureFile.$id, {
        name: `User Image ${user_id}`,
      });

      return execution;
    } else {
      return await updateDocument(
        env.DATABASE_PRIMARY,
        env.COLLECTION_USER,
        user_id,
        {
          name: name,
        }
      );
    }
  } catch (error) {
    console.log(`ERROR : (userServices.ts => updateProfile) :: ${error}`);

    await deleteFile(env.BUCKET_IMAGE, pictureFile?.$id!).catch();
    throw error;
  }
};

export const updateStudentInfo = async (
  user_id: string,
  dep_prog: string,
  year_level: string
) => {
  try {
    return await updateDocument(
      env.DATABASE_PRIMARY,
      env.COLLECTION_USER,
      user_id,
      {
        dep_prog: dep_prog,
        year_level: year_level,
      }
    );
  } catch (error) {
    console.log(`ERROR : (userServices.ts => updateStudentInfo) :: ${error}`);
    throw error;
  }
};

export const updateEmployeeInfo = async (
  user_id: string,
  employee_role: string
) => {
  try {
    return await updateDocument(
      env.DATABASE_PRIMARY,
      env.COLLECTION_USER,
      user_id,
      {
        employee_role: employee_role,
      }
    );
  } catch (error) {
    console.log(`ERROR : (userServices.ts => updateStudentInfo) :: ${error}`);
    throw error;
  }
};

export const deleteAccount = async (param: {
  user_id: string;
  password: string;
}) => {
  try {
    const result = await _executeFunction(
      env.FUNCTION_ACCOUNT,
      "deleteUserAccount",
      param
    );

    if (result.responseStatusCode != 200) {
      throw Error("a");
    }
  } catch (error) {
    if (error == "Error: a") {
      throw Error("Incorrect password.");
    } else {
      console.log("user.deleteAccount : ", error);
    }
  }
};
