import { useState, useEffect } from 'react';
import { getRecordsByStationAndDateRange, getAllAbbreviationsRecordsByStationAndDateRange } from '@/services/record.service';
import { generateExcelReport } from '@/utils/generateExcel';

export const ReportModal = ({ isOpen, onClose, idStation, selectedParameter, setSelectedParameter, parameters }) => {
    const [dateRange, setDateRange] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [allData, setAllData] = useState({});

    useEffect(() => {
        // Set "Todos" as the default selected parameter
        setSelectedParameter("Todos");
    }, [setSelectedParameter]);

    useEffect(() => {
        if (selectedParameter === "Todos" && startDate && endDate && idStation) {
            const fetchDataForAllParams = async () => {
                try {
                    const data = await getAllAbbreviationsRecordsByStationAndDateRange(idStation, startDate, endDate);
                    setAllData(data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchDataForAllParams();
        }
    }, [startDate, endDate, idStation, selectedParameter]);

    const handleDateRangeChange = (e) => {
        const value = e.target.value;
        setDateRange(value);
        const currentDate = new Date();
        switch (value) {
            case 'last7days':
                setStartDate(new Date(currentDate.setDate(currentDate.getDate() - 7)).toISOString().split('T')[0]);
                setEndDate(new Date().toISOString().split('T')[0]);
                break;
            case 'lastMonth':
                setStartDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)).toISOString().split('T')[0]);
                setEndDate(new Date().toISOString().split('T')[0]);
                break;
            default:
                setStartDate('');
                setEndDate('');
        }
    };

    const handleGenerateReport = async () => {
        try {
            if (selectedParameter === "Todos") {
                if (Object.keys(allData).length === 0) {
                    console.error('No data available for "Todos"');
                    return;
                }
                await generateExcelReport(allData, selectedParameter, startDate, endDate);
            } else if (selectedParameter) {
                const selectedParam = parameters.find(param => param.abbreviation === selectedParameter);
                if (!selectedParam) {
                    console.error(`Selected parameter "${selectedParameter}" not found in parameters list`);
                    return;
                }
                const data = await getRecordsByStationAndDateRange(idStation, startDate, endDate, selectedParameter);
                generateExcelReport(data, selectedParameter, startDate, endDate, selectedParam.name, selectedParam.measure);
            } else {
                console.error('No parameter selected');
            }
            onClose();
        } catch (error) {
            console.error('Error generating report:', error);
        }
    };

    // Conditional rendering based on isOpen prop
    if (!isOpen) return null;  // If isOpen is false, return null to render nothing

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">Generar Informe</h2>

                <div className="flex flex-col mb-4">
                    <label className="mb-2 font-semibold">Seleccionar rango de fechas:</label>
                    <select
                        className="p-2 border border-gray-300 rounded-full outline-none"
                        value={dateRange}
                        onChange={handleDateRangeChange}
                    >
                        <option value="">Seleccione un rango</option>
                        <option value="last7days">Últimos 7 días</option>
                        <option value="lastMonth">Último mes</option>
                        <option value="range">Rango personalizado</option>
                    </select>
                </div>

                {dateRange === 'range' && (
                    <div className="flex flex-col mb-4">
                        <label htmlFor="start-date" className="mb-2 font-semibold">Desde:</label>
                        <input
                            type="date"
                            id="start-date"
                            className="p-2 border border-gray-300 rounded-full outline-none mb-2"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <label htmlFor="end-date" className="mb-2 font-semibold">Hasta:</label>
                        <input
                            type="date"
                            id="end-date"
                            className="p-2 border border-gray-300 rounded-full outline-none"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                )}

                <div className="flex flex-col mb-4">
                    <label htmlFor="modal-parameter" className="mb-2 font-semibold">Parámetro:</label>
                    <select
                        id="modal-parameter"
                        className="p-2 border border-gray-300 rounded-full outline-none"
                        value={selectedParameter}
                        onChange={(e) => setSelectedParameter(e.target.value)}
                    >
                        <option value="Todos">Todos</option>
                        {parameters.map((param, index) => (
                            <option key={index} value={param.abbreviation}>
                                {param.name} ({param.abbreviation})
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex justify-end">
                    <button
                        className="bg-gray-200 text-black px-4 py-2 rounded-full mr-2"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                    <button
                        className="bg-black text-white px-4 py-2 rounded-full"
                        onClick={handleGenerateReport}
                    >
                        Generar
                    </button>
                </div>
            </div>
        </div>
    );
};
