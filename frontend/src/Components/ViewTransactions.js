import React, { useEffect } from 'react';
import styled from 'styled-components';
import { InnerLayout } from '../styles/Layouts';
import { useGlobalContext } from '../context/globalContext';
import TransactionItem from './TransactionItem';

function ViewTransactions() {
    const { getIncomes, incomes, getExpenses, expenses } = useGlobalContext();

    useEffect(() => {
        getIncomes();
        getExpenses();
    }, []);

    return (
        <ViewTransactionsStyled>
            <InnerLayout>
                <h1>View Transactions</h1>

                <div className="transactions">
                    <h2>Incomes</h2>
                    <div className="transaction-list">
                        <table>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                    <th>Category</th>
                                    <th>Description</th>
                                    <th>Project Name</th>
                                    <th>OR Number</th>
                                    <th>Tranche No.</th>
                                    <th>Recorded By</th>
                                </tr>
                            </thead>
                            <tbody>
                                {incomes.map(income => (
                                    <tr key={income._id}>
                                        <td>{income.title}</td>
                                        <td>{income.amount}</td>
                                        <td>{income.date}</td>
                                        <td>{income.category}</td>
                                        <td>{income.description}</td>
                                        <td>{income.projectName}</td>
                                        <td>{income.orNumber}</td>
                                        <td>{income.trancheNo}</td>
                                        <td>{income.recordedBy}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="transactions">
                    <h2>Expenses</h2>
                    <div className="transaction-list">
                        <table>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                    <th>Category</th>
                                    <th>Description</th>
                                    <th>Department</th>
                                    <th>Person Made Expense</th>
                                    <th>Recorded By</th>
                                </tr>
                            </thead>
                            <tbody>
                                {expenses.map(expense => (
                                    <tr key={expense._id}>
                                        <td>{expense.title}</td>
                                        <td>{expense.amount}</td>
                                        <td>{expense.date}</td>
                                        <td>{expense.category}</td>
                                        <td>{expense.description}</td>
                                        <td>{expense.department}</td>
                                        <td>{expense.personMadeExpense}</td>
                                        <td>{expense.recordedBy}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </InnerLayout>
        </ViewTransactionsStyled>
    );
}

const ViewTransactionsStyled = styled.div`
    .transactions {
        margin-bottom: 2rem;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 1rem;
    }

    th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
        color: #333; /* Darker font color */
    }

    th {
        background-color: #f2f2f2;
    }

    tr:nth-child(even) {
        background-color: #f2f2f2;
    }
`;

export default ViewTransactions;
