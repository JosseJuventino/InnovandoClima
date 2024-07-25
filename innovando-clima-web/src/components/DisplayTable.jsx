import { AllDataTable } from './tables/AllDataTable';
import { ParameterDataTable } from './tables/ParameterTable';

export function DisplayTable({ selectedParameter, selectedUnit, selectedDate, idStation }) {

    console.log(selectedParameter);
    if (selectedParameter === "Todos" && selectedDate !== "") {
        return <AllDataTable selectedDate={selectedDate} idStation={idStation} />;
    }

    if (selectedParameter !== "Todos" && selectedDate !== "") {
        return <ParameterDataTable selectedDate={selectedDate} selectedUnit={selectedUnit} idStation={idStation} selectedParameter={selectedParameter} />;
    }

    return null;
}
