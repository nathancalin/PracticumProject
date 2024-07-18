import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';
import { peso } from '../../utils/Icons'; // Importing peso icon

function ExpenseForm() {
    const { addExpense, error, setError } = useGlobalContext();
    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: new Date(),
        category: '',
        description: '',
        department: '',
        personMadeExpense: '',
        recordedBy: '',
    });

    const { title, amount, date, category, description, department, personMadeExpense, recordedBy } = inputState;

    const handleInput = name => e => {
        const value = name === 'amount' ? parseFloat(e.target.value) : e.target.value;
        setInputState({ ...inputState, [name]: value });
        setError('');
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (parseFloat(amount) <= 0 || isNaN(parseFloat(amount))) {
            setError('Amount must be a positive number!');
            return;
        }
        addExpense(inputState);
        setInputState({
            title: '',
            amount: '',
            date: new Date(),
            category: '',
            description: '',
            department: '',
            personMadeExpense: '',
            recordedBy: '',
        });
    }

    return (
        <ExpenseFormStyled onSubmit={handleSubmit}>
            {error && <p className='error'>{error}</p>}
            <div className="input-control">
                <input
                    type="text"
                    value={title}
                    name={'title'}
                    placeholder="Expense Title"
                    onChange={handleInput('title')}
                    autoComplete="off"
                />
            </div>
            <div className="input-control">
                <input
                    value={amount}
                    type="text"
                    name={'amount'}
                    placeholder={'Expense Amount'}
                    onChange={handleInput('amount')}
                    autoComplete="off"
                />
            </div>
            <div className="input-control">
                <DatePicker
                    id='date'
                    placeholderText='Enter A Date'
                    selected={date}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => {
                        setInputState({ ...inputState, date: date });
                    }}
                />
            </div>
            <div className="selects input-control">
                <select required value={category} name="category" id="category" onChange={handleInput('category')}>
                    <option value="" disabled>Select Option</option>
                    <option value="Project">Project</option>                    
                    <option value="utilities">Utilities</option>                    
                    <option value="transportation">Transportation</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="insurance">Insurance</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="food">Food</option>                     
                    <option value="miscellaneous">Miscellaneous</option>
                </select>
            </div>

            <div className="input-control">
                <textarea name="description" value={description} placeholder='Add A Reference' id="description" cols="30" rows="4" onChange={handleInput('description')}></textarea>
            </div>
            <div className="input-control">
                <input
                    type="text"
                    value={department}
                    name={'department'}
                    placeholder="Department"
                    onChange={handleInput('department')}
                    autoComplete="off"
                />
            </div>
            <div className="input-control">
                <input
                    type="text"
                    value={personMadeExpense}
                    name={'personMadeExpense'}
                    placeholder="Person Made Expense"
                    onChange={handleInput('personMadeExpense')}
                    autoComplete="off"
                />
            </div>
            <div className="input-control">
                <input
                    type="text"
                    value={recordedBy}
                    name={'recordedBy'}
                    placeholder="Recorded By"
                    onChange={handleInput('recordedBy')}
                    autoComplete="off"
                />
            </div>
            <div className="submit-btn">
                <Button
                    name={'Add Expense'}
                    icon={peso} // Changed from plus to peso icon
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'#222260'} // Blue color
                    color={'#fff'}
                    hoverBg={'var(--color-green)'}
                />
            </div>
        </ExpenseFormStyled>
    )
}

const ExpenseFormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    input, textarea, select {
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: .5rem 1rem;
        border-radius: 5px;
        border: 2px solid #fff;
        background: transparent;
        resize: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: rgba(34, 34, 96, 0.9);
        &::placeholder {
            color: rgba(34, 34, 96, 0.4);
        }
    }
    .input-control {
        input, select {
            width: 100%;
        }
    }

    .selects {
        display: flex;
        justify-content: flex-end;
        select {
            color: rgba(34, 34, 96, 0.4);
            &:focus, &:active {
                color: rgba(34, 34, 96, 1);
            }
        }
    }

    .submit-btn {
        button {
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover {
                background: var(--color-green) !important;
            }
        }
    }
`;

export default ExpenseForm;
