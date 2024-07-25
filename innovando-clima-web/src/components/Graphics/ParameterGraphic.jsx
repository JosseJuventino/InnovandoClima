// src/Graphics/ParameterGraphic.js
import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip, Legend } from 'recharts';

export const ParameterGraphic = ({ records, unit }) => {
    const data = records.map(record => ({
        time: record.time,
        value: parseFloat(record.measurement)
    }));

    return (
        <ResponsiveContainer width={"100%"} height={400}>
            <LineChart className='flex' height={400} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" label={{ value: 'Hora', position: 'insideBottomRight', offset: -5 }} />
                <YAxis label={{ value: `Valor (${unit})`, angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#000000" name={`Valor (${unit})`} />
            </LineChart>
        </ResponsiveContainer>
    );
};
