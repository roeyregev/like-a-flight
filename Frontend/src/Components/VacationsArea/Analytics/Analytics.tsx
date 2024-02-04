import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import downloadIcon from "../../../Assets/Images/download-icon.svg";
import ChartDataModel from "../../../Models/chart-data-model";
import notificationService from "../../../Services/NotificationService";
import vacationsService from "../../../Services/VacationsService";
import "./Analytics.css";

function Analytics(): JSX.Element {

    const [rawData, setRawData] = useState<ChartDataModel[]>([]);

    useEffect(() => {
        vacationsService.getChartData()
            .then(dbChartData => {
                setRawData(dbChartData);
                // console.log(dbChartData);
            })
            .catch(err => notificationService.error(err))
    }, []);

    // const chartDataOptions = {rawData.map(({ count, destination }) => ({ count, destination }))}


    const arrayToCSV = (data: ChartDataModel[]) => {
        // Add header row with column titles
        const headerRow = '# of Likes,Destination';

        // Extract data and join into CSV format
        const dataRows = data.map(({ count, destination }) => `${count},${destination}`).join('\n');

        // Combine header row and data rows
        const csvContent = `${headerRow}\n${dataRows}`;

        return `data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`;
    };


    const downloadCSV = (data: ChartDataModel[], filename: string) => {
        const link = document.createElement('a');
        link.href = arrayToCSV(data);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    return (
        <div className="Analytics">
            <h2>Likes Per Flight</h2>
            <div className="download-button" onClick={() => downloadCSV(rawData, 'flights-likes.csv')}>
                <img src={downloadIcon} alt="download-button" />
                <span>Download CSV</span>
            </div>
            <div className="chart-container">
                <BarChart width={800} height={600} data={rawData.map(({ count, destination }) => ({ count, destination }))} barGap={100}>
                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                    <XAxis dataKey="destination" /> {/* Use 'destination' as the dataKey */}
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count"
                        fill="#EB6161"
                        barSize={80}
                        shape={(props: any) => (
                            <rect {...props} rx={4} ry={4} />
                        )}
                    /> {/* Use 'count' as the dataKey */}
                </BarChart>

            </div>
        </div>
    );
}

export default Analytics;