// ViewTransactions.js
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
                        {incomes.map(income => (
                            <TransactionItem
                                key={income._id}
                                type="income"
                                title={income.title}
                                amount={income.amount}
                                date={income.date}
                                category={income.category}
                                description={income.description}
                                projectName={income.projectName}
                                orNumber={income.orNumber}
                                trancheNo={income.trancheNo}
                                recordedBy={income.recordedBy}
                            />
                        ))}
                    </div>
                </div>

                <div className="transactions">
                    <h2>Expenses</h2>
                    <div className="transaction-list">
                        {expenses.map(expense => (
                            <TransactionItem
                                key={expense._id}
                                type="expense"
                                title={expense.title}
                                amount={expense.amount}
                                date={expense.date}
                                category={expense.category}
                                description={expense.description}
                                department={expense.department}
                                personMadeExpense={expense.personMadeExpense}
                                recordedBy={expense.recordedBy}
                            />
                        ))}
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
    .transaction-list {
        display: grid;
        gap: 1rem;
    }
`;

export default ViewTransactions;
