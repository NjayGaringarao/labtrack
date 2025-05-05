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
  user_info,
}: ISignUp) => {
  try {
    if (user_info) {
      const result = await _executeFunction(
        env.FUNCTION_ACCOUNT,
        "createUserAccount",
        {
          id: id,
          name: name,
          dep_prog: user_info.dep_prog,
          year_level: user_info.year_level,
          email: email,
          password: password,
        }
      );
      if (result.responseStatusCode !== 200) throw Error("a");
    } else {
      const result = await _executeFunction(
        env.FUNCTION_ACCOUNT,
        "createAdminAccount",
        {
          id: id,
          name: name,
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
  role: string,
  user_id: string,
  password: string,
  initializeGlobalState: () => Promise<void>
) => {
  try {
    const credential = await getDocument(
      env.DATABASE_PRIMARY,
      env.COLLECTION_USER_CREDENTIALS,
      user_id
    );

    const session = await signInUser(credential.email, password);
    await initializeGlobalState();
    return session;
  } catch (error) {
    if (
      error ===
      "AppwriteException: Document with the requested ID could not be found."
    ) {
      throw "The provided ID is not a registered account.";
    } else if (
      error ===
        "AppwriteException: Invalid credentials. Please check the email and password." ||
      "AppwriteException: Invalid `password` param: Password must be between 8 and 256 characters long."
    ) {
      throw "Incorrect password.";
    } else {
      console.log("auth.studentSignIn : ", error);
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
