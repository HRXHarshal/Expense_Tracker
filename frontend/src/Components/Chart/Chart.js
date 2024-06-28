import React from 'react';
import { Chart as ChartJs, 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { dateFormat } from '../../utils/dateFormat';

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
);

function Chart() {
    const { incomes, expenses } = useGlobalContext();

    // Combine incomes and expenses and sort by date
    const combinedData = [...incomes, ...expenses].sort((a, b) => new Date(a.date) - new Date(b.date));

    // Create unique dates array
    const uniqueDates = [...new Set(combinedData.map(item => dateFormat(item.date)))];

    // Map incomes and expenses to the dates
    const incomeMap = incomes.reduce((acc, income) => {
        const date = dateFormat(income.date);
        if (!acc[date]) acc[date] = 0;
        acc[date] += income.amount;
        return acc;
    }, {});

    const expenseMap = expenses.reduce((acc, expense) => {
        const date = dateFormat(expense.date);
        if (!acc[date]) acc[date] = 0;
        acc[date] += expense.amount;
        return acc;
    }, {});

    const data = {
        labels: uniqueDates,
        datasets: [
            {
                label: 'Income',
                data: uniqueDates.map(date => incomeMap[date] || 0),
                backgroundColor: 'green',
                tension: 0.2
            },
            {
                label: 'Expenses',
                data: uniqueDates.map(date => expenseMap[date] || 0),
                backgroundColor: 'red',
                tension: 0.2
            }
        ]
    };

    return (
        <ChartStyled>
            <Line data={data} />
        </ChartStyled>
    );
}

const ChartStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 100%;
`;

export default Chart;
