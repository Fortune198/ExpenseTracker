import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { useAddTransaction } from '../../hooks/useAddTransaction';
import { useGetTransactions } from '../../hooks/useGetTransactions';
import { useGetUserInfo } from '../../hooks/useGetUserInfo';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase-config';
import './style.css';

//we create an ExpenseTracker page to test the authentication flow
export const ExpenseTracker = () => {
    //We create a function to help us navigate to the expense-tracker page after the user is authenticated
    const { addTransaction } = useAddTransaction();
    const { transactions, transactionTotal } = useGetTransactions();
    const { name, profilePic } = useGetUserInfo();
    const navigate = useNavigate();

    const [description, setDescription] = useState('');
    const [transactionAmount, setTransactionAmount] = useState();
    const [transactionType, setTransactionType] = useState('expense');
    const { balance, income, expenses } = transactionTotal;

    const onSubmit = async (e) => {
        //prevents the page from refreshing when the form is submitted
        e.preventDefault();
        addTransaction({
            description,
            transactionAmount,
            transactionType,
        });
        //clears the input fields after the form is submitted
        setDescription('');
        setTransactionAmount('');
    };

    const signUserOut = async () => {
        try {
            await signOut(auth);
            localStorage.clear();
            navigate('/');
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    }

    return (
        <>
            <div className="expense-tracker">
                <div className="container">
                    <h1> {name}'s ExpenseTracker</h1>
                    <div className="balance">
                        <h3>Your Balance</h3>
                        {balance >= 0 ? <h2>R{balance}</h2> : <h2>-R{balance *-1}</h2>}
                    </div>
                    <div className="summary">
                        <div className="income">
                            <h4>Income</h4>
                            <h2>R{income}</h2>
                        </div>
                        <div className="expenses">
                            <h4>Expenses</h4>
                            <h2>R{expenses}</h2>
                        </div>
                    </div>
                    <form className="add-transaction" onSubmit={onSubmit}>
                        <input
                            type="text"
                            placeholder="Description"
                            value={description}
                            required
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Amount"
                            value={transactionAmount}
                            required
                            onChange={(e) => setTransactionAmount(e.target.value)}
                        />
                        <input
                            type="radio"
                            id="expense"
                            value="expense"
                            checked={transactionType === 'expense'}
                            onChange={(e) => setTransactionType(e.target.value)}
                        />
                        <label htmlFor="expense">Expense</label>
                        <input
                            type="radio"
                            id="income"
                            value="income"
                            checked={transactionType === 'income'}
                            onChange={(e) => setTransactionType(e.target.value)}
                        />
                        <label htmlFor="income">Income</label>

                        <button type="submit">Add Transaction</button>
                    </form>
                </div>
                {profilePic && (
                    <div className="profile">
                        <img className="profile-photo" src={profilePic} alt='img' />
                        <button className="sign-out-button" onClick={signUserOut} >
                            Sign Out
                        </button>
                    </div>
                )}
            </div>
            <div className="transaction-history">
                <h3>Transactions</h3>
                <ul>
                    {transactions.map((transaction) => {
                        const { description, transactionAmount, transactionType } = transaction;
                        return (
                            <li>
                                <h4> {description} </h4>
                                <p>
                                    R{transactionAmount} -
                                    <label style={{ color: transactionType === "expense" ? "red" : "green" }}>
                                        {transactionType}
                                    </label>
                                </p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
};