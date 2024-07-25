import { useState } from 'react';
import { HeaderInfo } from './HeaderInfo';
import { General } from './PlaceLinks/General';
import { Registers } from './PlaceLinks/Registers';
import { Instrumentation } from './PlaceLinks/Instrumentation';

const tabs = [
    { name: 'Generalidades', component: General },
    { name: 'Registros', component: Registers },
    { name: 'Instrumentación', component: Instrumentation },
];

const PlaceInfo = ({ place }) => {
    const [selectedTab, setSelectedTab] = useState(tabs[0].name);

    if (!place) {
        return (
            <div className="flex flex-col justify-center items-center h-full">
                <p className="font-bold text-gray-500">Selecciona una estación para ver más información</p>
            </div>
        );
    }

    const SelectedComponent = tabs.find(tab => tab.name === selectedTab).component;

    return (
        <div>
            <HeaderInfo tabs={tabs} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            <div className="mt-4">
                <SelectedComponent place={place} />
            </div>
        </div>
    );
};

export default PlaceInfo;
