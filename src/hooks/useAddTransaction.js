//We are creating a custom hook that will add a transaction to the database
//we import addDoc from firebase/firestore to add a document to the database
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
//We import the db object from the firebase-config file to use it in the addDoc function
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";


export const useAddTransaction = () => {

    const transactionCollectionRef = collection(db, "transactions");
    const { userId } = useGetUserInfo();
    const addTransaction = async ({ description, transactionAmount, transactionType }) => {
        await addDoc(transactionCollectionRef, {
            userId,
            description,
            transactionAmount,
            transactionType,
            createdAt: serverTimestamp()
        });
    };

    return { addTransaction };

};