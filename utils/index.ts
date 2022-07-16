import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  addDoc,
  collection,
  query,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { IAuth } from "../types";
// File Upload
export const uploadFiles = async (
  storage: any,
  folder: string,
  files: File[]
) => {
  const promises: any[] = [];

  files.forEach((file) => {
    const storageRef = ref(storage, `${folder}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    promises.push(uploadTask);
  });

  const result: any[] = [];
  await Promise.allSettled(promises).then((res) => {
    res.forEach((item) => {
      if (item.status === "fulfilled") {
        result.push(item.value);
      }
    });
  });

  const urlPromises = result.map((item) => {
    const path = item.ref.toString();
    return getDownloadURL(ref(storage, path));
  });

  const urls: string[] = [];

  await Promise.allSettled(urlPromises).then((res) => {
    res.forEach((item) => {
      if (item.status === "fulfilled") {
        urls.push(item.value);
      }
    });
  });

  return urls;
};
// When user try to Register email and password fire this function
export const registerApi = async (auth: any, user: IAuth) => {
  try {
    const res = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );
    return res.user;
  } catch (err: any) {
    console.log(err);
  }
};
// When user try to login with email and password fire this function
export const loginApi = async (auth: any, user: IAuth) => {
  try {
    const { email, password } = user;
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res.user;
  } catch (err: any) {
    console.log(err);
  }
};
// When user try to login Google Provider fire this function
export const googleApi = async (auth: any, provierGoogle: any) => {
  try {
    const res = await signInWithPopup(auth, provierGoogle);
    return res.user;
  } catch (err: any) {
    console.log(err);
  }
};
// When user try to login Facebook Provider fire this function
export const facebookApi = async (auth: any, provierFacebook: any) => {
  try {
    const res = await signInWithPopup(auth, provierFacebook);
    return res.user;
  } catch (err: any) {
    console.log(err);
  }
};
// When user click forgot password fire this function
export const forgotPassApi = async (auth: any, email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Success! Check your email.");
  } catch (err: any) {
    console.log(err);
  }
};
// When user try to login out fire this function
export const signOutApi = async (auth: any) => {
  try {
    await signOut(auth);
  } catch (err: any) {
    console.log(err);
  }
};
// Collection Api
export const createCollection = async (
  db: any,
  collectionName: string,
  data: any
) => {
  try {
    const res = await addDoc(collection(db, `${collectionName}`), data);
    return { ...data, id: res.id };
  } catch (err: any) {
    console.log(err);
  }
};
// when user update any specific collection data fire this function
export const updateCollection = async (
  db: any,
  collectionName: string,
  data: any
) => {
  try {
    await updateDoc(doc(db, `${collectionName}/${data.id}`), data);
    console.log("Update Success!");
  } catch (err: any) {
    console.log(err);
  }
};
// when user delete any specific collection data fire this function
export const deleteCollection = async (db: any, collectionName: string, data: any) => {
  try {
    await deleteDoc(doc(db, `${collectionName}/${data.id}`));
    console.log("Delete Success!");
  } catch (err: any) {
    console.log(err);
  }
};

// when user get all data with pagination any specific collection data fire this function
export const getCollections = async (
  db: any,
  collectionName: string,
) => {
  try {
    const data: any = [];
    let q = query(
      collection(db, `${collectionName}`)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
    });

    return data;
  } catch (err: any) {
    console.log(err);
  }
};

// Single Data Collection
export const getCollection = async (
  collectionName: string,
  db: any,
  id: string
) => {
  try {
    const docRef = doc(db, `${collectionName}/${id}`);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) return docSnap.data();
  } catch (err: any) {
    console.log(err);
  }
};
