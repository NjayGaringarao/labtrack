import { env } from "@/constants/env";
import { ISignUp } from "@/services/types/interface";
import {
  _executeFunction,
  getDocument,
  signInUser,
  signOutUser,
} from "./appwrite";

export const signUp = async ({
  id,
  name,
  email,
  password,
  accountType,
  employee_role,
  dep_prog,
  year_level,
  face_descriptor,
}: ISignUp) => {
  try {
    if (accountType === "ADMIN") {
      const result = await _executeFunction(
        env.FUNCTION_ACCOUNT,
        "createAdminAccount",
        {
          id: id,
          employee_role: employee_role,
          name: name,
          email: email,
          password: password,
        }
      );
      if (result.responseStatusCode !== 200) throw Error("a");
    } else if (accountType === "STUDENT") {
      const result = await _executeFunction(
        env.FUNCTION_ACCOUNT,
        "createStudentAccount",
        {
          id: id,
          name: name,
          dep_prog: dep_prog,
          year_level: year_level,
          face_descriptor,
          email: email,
          password: password,
        }
      );
      if (result.responseStatusCode !== 200) throw Error("a");
    } else {
      const result = await _executeFunction(
        env.FUNCTION_ACCOUNT,
        "createEmployeeAccount",
        {
          id: id,
          name: name,
          employee_role: employee_role,
          email: email,
          password: password,
        }
      );
      if (result.responseStatusCode !== 200) throw Error("a");
    }
  } catch (error) {
    console.log("auth.signUp : ", error);
    throw Error("There was a problem creating your account.");
  }
};

export const signIn = async (
  user_id: string,
  password: string,
  initializeGlobalState: () => Promise<void>
) => {
  try {
    const credential = await getDocument(
      env.DATABASE_PRIMARY,
      env.COLLECTION_CREDENTIALS,
      user_id
    );

    const session = await signInUser(credential.email, password);
    await initializeGlobalState();
  } catch (error) {
    if (
      error ==
      "AppwriteException: Document with the requested ID could not be found."
    ) {
      throw "The provided ID is not a registered account.";
    } else if (
      error ==
      "AppwriteException: Invalid credentials. Please check the email and password."
    ) {
      throw "Incorrect password.";
    } else {
      throw "There was a problem signing in to your account.";
    }
  }
};

export const signOut = async (resetGlobalState: () => void) => {
  try {
    await signOutUser();
    await resetGlobalState();
  } catch (error) {
    console.log("auth.signOutUser : ", error);
    throw "There is a problem logging out your account.";
  }
};
