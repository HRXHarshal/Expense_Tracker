// src/Components/Transactions/Transactions.js
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import TransactionItem from './TransactionItem';

function Transactions() {
    const { incomes, expenses, getIncomes, getExpenses, deleteIncome, deleteExpense } = useGlobalContext();

    useEffect(() => {
        getIncomes();
        getExpenses();
    }, [getIncomes, getExpenses]);

    const allTransactions = [...incomes, ...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <TransactionsStyled>
            <InnerLayout>
                <h1>All Transactions</h1>
                <div className="transactions">
                    {allTransactions.map((transaction) => (
                        <TransactionItem
                            key={transaction._id}
                            id={transaction._id}
                            title={transaction.title}
                            description={transaction.description}
                            amount={transaction.amount}
                            date={transaction.date}
                            category={transaction.category}
                            type={transaction.type}
                            deleteItem={transaction.type === 'income' ? deleteIncome : deleteExpense}
                        />
                    ))}
                </div>
            </InnerLayout>
        </TransactionsStyled>
    );
}

const TransactionsStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    .transactions {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
`;

export default Transactions;
