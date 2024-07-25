import * as XLSX from 'xlsx';

const getDateRange = (startDate, endDate) => {
    let dates = [];
    let currentDate = new Date(startDate);
    while (currentDate <= new Date(endDate)) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
};

export const generateExcelReport = (data, parameter, startDate, endDate) => {
    const workbook = XLSX.utils.book_new();

    if (parameter === "Todos") {
        for (const [abbr, paramData] of Object.entries(data)) {
            const sheetData = [];
            const sheetName = abbr;

            // Title
            const title = `Registros de ${abbr} ${paramData.unit ? `(${paramData.unit})` : ''}`;
            sheetData.push([title]);

            // Header
            const header = ['Día', '7:00', '14:00', '21:00'];
            sheetData.push(header);

            // Fill data
            const dates = getDateRange(startDate, endDate);
            dates.forEach((date) => {
                const formattedDate = date.toISOString().split('T')[0];
                const rowData = [formattedDate];

                if (paramData && paramData[formattedDate]) {
                    ['07:00', '14:00', '21:00'].forEach((time) => {
                        const measurement = paramData[formattedDate][time] ? paramData[formattedDate][time].measurement || '' : '';
                        rowData.push(measurement);
                    });
                } else {
                    rowData.push('', '', '');
                }

                sheetData.push(rowData);
            });

            const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
            XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
        }
    } else {
        // Single parameter case
        const sheetData = [];
        const title = `Registros de ${data.name} (${parameter}) ${data.unit ? `(${data.unit})` : ''}`;
        sheetData.push([title]);
        const header = ['Día', '7:00', '14:00', '21:00'];
        sheetData.push(header);

        const dates = getDateRange(startDate, endDate);
        dates.forEach((date) => {
            const formattedDate = date.toISOString().split('T')[0];
            const rowData = [formattedDate];

            if (data && data[formattedDate]) {
                ['07:00', '14:00', '21:00'].forEach((time) => {
                    const measurement = data[formattedDate][time] ? data[formattedDate][time][0]?.measurement || '' : '';
                    rowData.push(measurement);
                });
            } else {
                rowData.push('', '', '');
            }

            sheetData.push(rowData);
        });

        const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
        XLSX.utils.book_append_sheet(workbook, worksheet, `Reporte de ${parameter}`);
    }

    XLSX.writeFile(workbook, `Reporte_${parameter}_${new Date().toISOString().split('T')[0]}.xlsx`);
};
