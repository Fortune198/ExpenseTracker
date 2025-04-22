import { query, collection, orderBy, onSnapshot, where } from 'firebase/firestore';
import { db } from '../config/firebase-config';
import { useState, useEffect } from 'react';
import { useGetUserInfo } from './useGetUserInfo';

export const useGetTransactions = () => {

    const [transactions, setTransactions] = useState([]);
    const [transactionTotal, setTransactionTotal] = useState({ balance: 0.00, income: 0.00, expense: 0.00 });

    const transactionCollectionRef = collection(db, 'transactions');
    const { userId } = useGetUserInfo();

    const getTransactions = async () => {

        let unsubscribe;

        try {
            // query to get transactions for the logged-in user
            const queryTransactions = query(
                transactionCollectionRef,
                where("userId", "==", userId),
                orderBy("createdAt", "desc")
            );
            // Fetch transactions from Firestore
            // Listen for real-time updates

            unsubscribe = onSnapshot(queryTransactions, (snapshot) => {

                let docs = [];
                let totalIncome = 0;
                let totalExpenses = 0;

                snapshot.forEach((doc) => {
                    const data = doc.data();
                    const id = doc.id;

                    docs.push({ id, ...data });

                    if (data.transactionType === 'income') {
                        totalIncome += Number(data.transactionAmount);
                    } else if (data.transactionType === 'expense') {
                        totalExpenses += Number(data.transactionAmount);
                    }
                });

                setTransactions(docs);
                setTransactionTotal({
                    balance: totalIncome - totalExpenses,
                    income: totalIncome,
                    expenses: totalExpenses
                });

            });
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    useEffect(() => {
        getTransactions();
    }, []);

    return { transactions, transactionTotal };
}