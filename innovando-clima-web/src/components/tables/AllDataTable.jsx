import React, { useState, useEffect } from 'react';
import { getRecordsByStationAndDate } from '@/services/record.service';
import { getAbbreviations } from '@/services/abreviation.service';

const hours = ["07:00", "14:00", "21:00"];

// Función para encontrar el registro con la hora exacta
const findExactRecord = (records, targetHour) => {
    return records.find(record => record.time === targetHour) || { time: "", measurement: "" };
};

export function AllDataTable({ idStation, selectedDate }) {
    const [records, setRecords] = useState({});
    const [abbreviationsMap, setAbbreviationsMap] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getRecordsByStationAndDate(idStation, selectedDate);
                const updatedData = {};

                Object.keys(data).forEach(param => {
                    if (data[param].length === 1 && data[param][0].time === "" && data[param][0].measurement === "") {
                        // Si solo hay un registro vacío, eliminarlo para evitar errores
                        updatedData[param] = [];
                    } else {
                        updatedData[param] = data[param];
                    }
                });

                setRecords(updatedData);
            } catch (error) {
                console.error("Failed to fetch records:", error);
            }
        };

        const fetchAbbreviations = async () => {
            try {
                const abbreviations = await getAbbreviations();
                const map = {};
                abbreviations.forEach(abbr => {
                    map[abbr.abbreviation] = `${abbr.name} / ${abbr.measure}`;
                });
                setAbbreviationsMap(map);
            } catch (error) {
                console.error("Failed to fetch abbreviations:", error);
            }
        };

        fetchData();
        fetchAbbreviations();
    }, [idStation, selectedDate]);

    const getMeasurementsForHours = (abbreviationRecords) => {
        return hours.map(hour => findExactRecord(abbreviationRecords, hour));
    };

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border-gray-300 rounded-lg">
                    <thead>
                        <tr className="text-left bg-gray-200">
                            <th className="py-2 px-4 border-gray-300 rounded-tl-lg">Parámetro</th>
                            {hours.map((hour, index) => (
                                <th key={index} className="py-2 px-4 border-gray-300">{hour}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(records).map((abbreviation, index) => {
                            const measurements = getMeasurementsForHours(records[abbreviation]);
                            const displayName = abbreviationsMap[abbreviation] || abbreviation; // Usar el nombre mapeado o la abreviatura si no hay nombre
                            return (
                                <tr key={index}>
                                    <td className={`border-b border-gray-300 px-4 py-2 ${index === Object.keys(records).length - 1 ? 'rounded-bl-lg' : ''}`}>{displayName}</td>
                                    {measurements.map((measurement, hourIndex) => (
                                        <td key={hourIndex} className="border-b border-gray-300 px-4 py-2">
                                            {measurement.measurement}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
