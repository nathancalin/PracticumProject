// TransactionItem.js

import React from 'react';
import styled from 'styled-components';
import { dateFormat } from '../utils/dateFormat';
import { peso } from '../utils/Icons';

function TransactionItem({ type, title, amount, date, category, description, projectName, orNumber, trancheNo, department, personMadeExpense, recordedBy }) {
    const getIndicatorColor = () => {
        return type === 'expense' ? 'var(--color-red)' : 'var(--color-green)';
    };

    return (
        <TransactionItemStyled indicator={getIndicatorColor()}>
            <div className="content">
                <h5>{title}</h5>
                <div className="inner-content">
                    <div className="text">
                        <div className="info">
                            <label>Type:</label>
                            <span>{type}</span>
                        </div>
                        <div className="info">
                            <label>Amount:</label>
                            <span>{peso} {amount}</span>
                        </div>
                        <div className="info">
                            <label>Date:</label>
                            <span>{dateFormat(date)}</span>
                        </div>
                        <div className="info">
                            <label>Category:</label>
                            <span>{category}</span>
                        </div>
                        <div className="info">
                            <label>Description:</label>
                            <span>{description}</span>
                        </div>
                        {type === 'income' && (
                            <>
                                <div className="info">
                                    <label>Project Name:</label>
                                    <span>{projectName}</span>
                                </div>
                                <div className="info">
                                    <label>OR Number:</label>
                                    <span>{orNumber}</span>
                                </div>
                                <div className="info">
                                    <label>Tranche No:</label>
                                    <span>{trancheNo}</span>
                                </div>
                            </>
                        )}
                        {type === 'expense' && (
                            <>
                                <div className="info">
                                    <label>Department:</label>
                                    <span>{department}</span>
                                </div>
                                <div className="info">
                                    <label>Person Made Expense:</label>
                                    <span>{personMadeExpense}</span>
                                </div>
                            </>
                        )}
                        <div className="info">
                            <label>Recorded By:</label>
                            <span>{recordedBy}</span>
                        </div>
                    </div>
                </div>
            </div>
        </TransactionItemStyled>
    );
}

const TransactionItemStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    display: flex;
    gap: 1rem;
    width: 100%;
    color: #222260;
    .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: .2rem;
        h5 {
            font-size: 1.3rem;
            padding-left: 2rem;
            position: relative;
            &::before {
                content: '';
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: .8rem;
                height: .8rem;
                border-radius: 50%;
                background: ${props => props.indicator};
            }
        }
        .inner-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .text {
                display: flex;
                flex-wrap: wrap;
                gap: 1.5rem;
                .info {
                    display: flex;
                    gap: 0.5rem;
                    align-items: center;
                    margin-bottom: 0.5rem;
                    label {
                        font-weight: bold;
                        width: 120px; /* Adjust width as needed */
                    }
                    span {
                        color: var(--primary-color);
                        opacity: 0.8;
                    }
                }
            }
        }
    }
`;

export default TransactionItem;
