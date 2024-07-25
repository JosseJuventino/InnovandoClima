"use client";

import { TbTemperaturePlus, TbTemperatureMinus, TbTemperature } from "react-icons/tb";
import { IoMdWater } from "react-icons/io";
import { FaSmog } from "react-icons/fa";
import { IoMdRainy } from "react-icons/io";
import { getLatestRecordsByStation } from "@/services/record.service";
import { getAbbreviations } from "@/services/abreviation.service";
import { useState, useEffect } from "react";
import Loader from "./Loader";

const iconMapping = {
    tmax: <TbTemperaturePlus className="text-4xl" />,
    tmin: <TbTemperatureMinus className="text-4xl" />,
    ts: <TbTemperature className="text-4xl" />,
    H: <IoMdWater className="text-4xl" />,
    pvp: <FaSmog className="text-4xl" />,
    hr: <IoMdWater className="text-4xl" />,
    p: <IoMdRainy className="text-4xl" />,
    pd: <IoMdRainy className="text-4xl" />
};

export function LastestRegisters({ stationId }) {
    const [records, setRecords] = useState({});
    const [abbreviations, setAbbreviations] = useState([]);
    const [loading, setLoading] = useState(true);

    const today = new Date();
    const formattedDate = today.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    useEffect(() => {
        const fetchAbbreviationsAndRecords = async () => {
            try {
                const abbreviationData = await getAbbreviations();
                setAbbreviations(abbreviationData);

                const recordData = await getLatestRecordsByStation(stationId);
                setRecords(recordData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAbbreviationsAndRecords();
    }, [stationId]);

    return (
        <div className="p-4">
            <div className="mb-4">
                <h2 className="text-xl font-bold">Últimos registros del día</h2>
                <p className="text-gray-500">{formattedDate}</p>
            </div>

            {loading ? (
                <Loader />
            ) : (
                <section className="flex flex-row justify-around gap-4 flex-wrap">
                    {abbreviations.map((abbreviation) => (
                        <div key={abbreviation._id} className="flex flex-col justify-between items-center p-5 bg-white shadow-lg rounded-lg w-40 h-40">
                            <div className="flex justify-center items-center w-12 h-12">
                                {iconMapping[abbreviation.abbreviation] || <IoMdWater className="text-4xl" />}
                            </div>
                            <p className="text-2xl font-semibold flex items-end">
                                {records[abbreviation.abbreviation] || "-"}
                                {records[abbreviation.abbreviation] && records[abbreviation.abbreviation] !== "-" && (
                                    <span className="text-sm">{abbreviation.measure}</span>
                                )}
                            </p>
                            <p className="text-gray-500 mt-1 text-center min-h-[40px]">{abbreviation.name}</p>
                        </div>
                    ))}
                </section>
            )}
        </div>
    );
}
