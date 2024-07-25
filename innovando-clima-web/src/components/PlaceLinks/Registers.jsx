import { useState, useEffect } from 'react';
import { getAbbreviations } from '@/services/abreviation.service';
import { DisplayTable } from '../DisplayTable';
import { ReportModal } from '../modals/ReportModal';

const getYesterdayDate = () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const yyyy = yesterday.getFullYear();
    const mm = String(yesterday.getMonth() + 1).padStart(2, '0');
    const dd = String(yesterday.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
};

export function Registers({ place }) {
    const [selectedDate, setSelectedDate] = useState(getYesterdayDate());
    const [selectedParameter, setSelectedParameter] = useState('');
    const [selectedUnit, setSelectedUnit] = useState('');
    const [parameters, setParameters] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchAbbreviations = async () => {
            try {
                const response = await getAbbreviations();
                if (response) {
                    setParameters(response);
                }
            } catch (e) {
                console.error("Failed to fetch abbreviations:", e);
            }
        };

        fetchAbbreviations();
    }, []);

    const handleParameterChange = (e) => {
        const selectedAbbreviation = e.target.value;
        const selectedParam = parameters.find(param => param.abbreviation === selectedAbbreviation);
        setSelectedParameter(selectedAbbreviation);
        setSelectedUnit(selectedParam ? selectedParam.measure : '');
    };

    const handleGenerateReportClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold">Registros anteriores</h2>

            <div className="flex flex-col items-end sm:flex-row gap-5 mt-4 w-full flex-wrap">
                <div className="flex flex-col w-full sm:w-auto">
                    <label htmlFor="date" className="mb-2 font-semibold">Día:</label>
                    <input
                        type="date"
                        id="date"
                        className="p-2 border border-gray-300 rounded-full outline-none w-full sm:w-[150px]"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                    />
                </div>

                <div className="flex flex-col w-full sm:w-auto">
                    <label htmlFor="parameter" className="mb-2 font-semibold">Parámetro:</label>
                    <select
                        id="parameter"
                        className="p-2 border border-gray-300 rounded-full outline-none w-full sm:w-[150px] max-h-40 overflow-y-auto"
                        value={selectedParameter}
                        onChange={handleParameterChange}
                    >
                        <option value="Todos">Todos</option>
                        {parameters.length > 0 && parameters.map((param, index) => (
                            <option key={index} value={param.abbreviation}>
                                {param.name} ({param.abbreviation})
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    className='bg-black text-white px-4 py-2 rounded-full'
                    onClick={handleGenerateReportClick}
                >
                    Generar informe
                </button>
            </div>

            <section className='mt-5'>
                <DisplayTable
                    selectedParameter={selectedParameter}
                    selectedUnit={selectedUnit}
                    selectedDate={selectedDate}
                    idStation={place._id}
                />
            </section>

            <ReportModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                selectedParameter={selectedParameter}
                setSelectedParameter={setSelectedParameter}
                parameters={parameters}
                idStation={place._id}
            />
        </div>
    );
}
