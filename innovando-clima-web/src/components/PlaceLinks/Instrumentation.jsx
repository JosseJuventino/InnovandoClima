import { useState } from 'react';
import { InstrumentationDetail } from '../InstrumentationDetail';
import { InstrumentationList } from '../InstrmentationList';

export function Instrumentation({ place, onSelectInstrument }) {
    const [selectedInstrument, setSelectedInstrument] = useState(null);

    const handleSelectInstrument = (instrument) => {
        setSelectedInstrument(instrument);
    };

    const handleBack = () => {
        setSelectedInstrument(null);
    };

    return (
        <div>
            {selectedInstrument ? (
                <InstrumentationDetail instrument={selectedInstrument} onBack={handleBack} />
            ) : (
                <InstrumentationList place={place} onSelectInstrument={handleSelectInstrument} />
            )}
        </div>
    );
}
