import React, { useContext, useState, useEffect } from "react";
import axios from 'axios';

const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getIncomes();
        getExpenses();
    }, []);

    const getAuthHeaders = () => {
        const token = localStorage.getItem('token');
        return {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
    };

    // Calculate incomes
    const addIncome = async (income) => {
        try {
            await axios.post(`${BASE_URL}add-income`, income, getAuthHeaders());
            getIncomes();
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    const getIncomes = async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-incomes`, getAuthHeaders());
            setIncomes(response.data);
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    const deleteIncome = async (id) => {
        try {
            await axios.delete(`${BASE_URL}delete-income/${id}`, getAuthHeaders());
            getIncomes();
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    const totalIncome = () => {
        let total = 0;
        incomes.forEach((income) => {
            total += income.amount;
        });
        return total;
    };

    // Calculate expenses
    const addExpense = async (expense) => {
        try {
            await axios.post(`${BASE_URL}add-expense`, expense, getAuthHeaders());
            getExpenses();
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    const getExpenses = async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-expenses`, getAuthHeaders());
            setExpenses(response.data);
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    const deleteExpense = async (id) => {
        try {
            await axios.delete(`${BASE_URL}delete-expense/${id}`, getAuthHeaders());
            getExpenses();
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    const totalExpenses = () => {
        let total = 0;
        expenses.forEach((expense) => {
            total += expense.amount;
        });
        return total;
    };

    const totalBalance = () => {
        return totalIncome() - totalExpenses();
    };

    const transactionHistory = () => {
        const history = [...incomes, ...expenses];
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
        return history.slice(0, 3);
    };

    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
