import React, { useEffect, useState } from 'react';
import { getInstrumentsByStation } from '@/services/instrument.service';

export function InstrumentationList({ place, onSelectInstrument }) {
    const [instruments, setInstruments] = useState([]);

    useEffect(() => {
        const fetchInstruments = async () => {
            try {
                const data = await getInstrumentsByStation(place._id);
                setInstruments(data);
            } catch (error) {
                console.error('Error fetching instruments:', error);
            }
        };
        fetchInstruments();
    }, [place._id]);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Instrumentos de la estación</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {instruments.map(({ instrumentId, quantity }) => (
                    <div
                        key={instrumentId._id}
                        className="border rounded-lg overflow-hidden shadow-lg cursor-pointer"
                        onClick={() => onSelectInstrument(instrumentId)}
                    >
                        <div className="relative h-40">
                            <img
                                src={instrumentId.images[0]}
                                alt={instrumentId.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-bold">{instrumentId.name}</h3>
                            <p className="text-gray-600">Cantidad: {quantity}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
