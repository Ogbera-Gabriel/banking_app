"use server"

import { Query } from "node-appwrite";
import { cookies } from "next/headers";
import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { parseStringify } from "../utils";

const {
    APPWRITE_DATABASE_ID: DATABASE_ID,
    APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
    APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID,
  } = process.env;
  
  export const getUserInfo = async ({ userId }: getUserInfoProps) => {
    try {
      const { database } = await createAdminClient();
  
      const user = await database.listDocuments(
        DATABASE_ID!,
        USER_COLLECTION_ID!,
        [Query.equal('userId', [userId])]
      )
  
      return parseStringify(user.documents[0]);
    } catch (error) {
      console.log(error)
    }
  }
  export const signIn = async ({ email, password }: signInProps) => {
    console.log("signing in")
    try {
      const { account } = await createAdminClient();
      const session = await account.createEmailPasswordSession(email, password);
  
      cookies().set("appwrite-session", session.secret, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: false,
      });
  
      const user = await getUserInfo({ userId: session.userId }) 
  
      return parseStringify(user);
    } catch (error) {
      console.error('Error', error);
    }
  }

export const signUp = async (userData : SignUpParams) => {
   console.log("signing up")
    const { email, password, firstName, lastName} = userData
    try {
    const { account } = await createAdminClient();

    const newUserAccount = await account.create(ID.unique(), email, password, `${firstName} ${lastName}`)
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });
    return parseStringify(newUserAccount); //cannot pass large object through server-actions
    } catch (error) {
        console.error("Error when signing up", error);
    }
}


export async function getLoggedInUser() {
    try {
      const { account } = await createSessionClient();
      const result = await account.get();

      return parseStringify(result); //cannot pass large object through server-actions
    } catch (error) {
      return null;
    }
  }

  export const logoutAccount = async () => {
    try {
      const { account } = await createSessionClient();
  
      cookies().delete('appwrite-session');
  
      await account.deleteSession('current');
    } catch (error) {
      return null;
    }
  }
  