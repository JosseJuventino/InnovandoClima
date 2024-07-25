// src/components/ParameterDataTable.js
import React, { useState, useEffect } from 'react';
import { getRecordsByStationDateAndAbbreviation } from '@/services/record.service';
import { ParameterGraphic } from '../Graphics/ParameterGraphic';

export function ParameterDataTable({ selectedParameter, selectedUnit, selectedDate, idStation }) {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const data = await getRecordsByStationDateAndAbbreviation(idStation, selectedDate, selectedParameter);
                const sortedRecords = data[selectedParameter]?.sort((a, b) => new Date(`1970-01-01T${a.time}`) - new Date(`1970-01-01T${b.time}`)) || [];
                setRecords(sortedRecords);
            } catch (error) {
                console.error("Failed to fetch records:", error);
            }
        };

        if (selectedParameter && selectedDate && idStation) {
            fetchRecords();
        }
    }, [selectedParameter, selectedDate, idStation]);

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border-gray-300 rounded-lg">
                    <thead>
                        <tr className="text-left bg-gray-200">
                            <th className="py-2 px-4 rounded-tl-lg border-gray-300">Hora</th>
                            <th className="py-2 px-4 rounded-tr-lg border-gray-300">Valor ({selectedUnit})</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.length > 0 ? (
                            records.map((record, index) => (
                                <tr key={index}>
                                    <td className="border px-4 py-2">{record.time}</td>
                                    <td className="border px-4 py-2">{record.measurement}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2" className="border px-4 py-2 text-center">
                                    No data available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {
                records.length > 1 ? (
                    <div className='mt-10 flex flex-row justify-around'>
                        <ParameterGraphic records={records} unit={selectedUnit} />
                    </div>) : (<div></div>)
            }
        </div>
    );
}
