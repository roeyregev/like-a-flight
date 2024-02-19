import { useEffect, useState } from "react";
import Lottie from "react-lottie";
import { Bar, BarChart, Tooltip, XAxis, YAxis } from 'recharts';
import loader from "../../../Assets/Animations/loader.json";
import downloadIcon from "../../../Assets/Images/download-icon.svg";
import ChartDataModel from "../../../Models/chart-data-model";
import notificationService from "../../../Services/NotificationService";
import vacationsService from "../../../Services/VacationsService";
import "./Analytics.css";

function Analytics(): JSX.Element {

    const [rawData, setRawData] = useState<ChartDataModel[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        vacationsService.getChartData()
            .then(dbChartData => {
                setRawData(dbChartData);
                setLoading(false);
            })
            .catch(err => {
                notificationService.error(err)
                setLoading(false);
            })
    }, []);

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

    //Loader animation settings:
    const loaderOptions = {
        animationData: loader,
        loop: true,
        autoplay: true,
    }

    return (
        <div className="Analytics">
            <h2>Likes Per Flight</h2>
            <div className="download-button" onClick={() => downloadCSV(rawData, 'flights-likes.csv')}>
                <img src={downloadIcon} alt="download-button" />
                <span>Download CSV</span>
            </div>
            {loading ? <div className="loader"> <Lottie options={loaderOptions} /></div> :
                <div className="chart-container">
                    <BarChart width={800} height={600} data={rawData.map(({ count, destination }) => ({ count, destination }))} barGap={100}>
                        <XAxis dataKey="destination" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#EB6161" barSize={80} radius={[4, 4, 0, 0]} />
                    </BarChart>
                </div>}
        </div>
    );
}

export default Analytics;