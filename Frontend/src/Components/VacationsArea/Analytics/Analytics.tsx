import { useEffect, useState } from "react";
import ChartDataModel from "../../../Models/chart-data-model";
import notificationService from "../../../Services/NotificationService";
import vacationsService from "../../../Services/VacationsService";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import "./Analytics.css";

function Analytics(): JSX.Element {

    const [rawData, setRawData] = useState<ChartDataModel[]>([]);

    useEffect(() => {
        vacationsService.getChartData()
            .then(dbChartData => {
                setRawData(dbChartData);
                console.log(dbChartData);
            })
            .catch(err => notificationService.error(err))
    }, []);


    return (
        <div className="Analytics">
            <h2>Likes Distribution</h2>
            <div className="chart-container">
                <BarChart width={400} height={600} data={rawData.map(({ count, destination }) => ({ count, destination }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="destination" /> {/* Use 'destination' as the dataKey */}
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" /> {/* Use 'count' as the dataKey */}
                </BarChart>

            </div>
        </div>
    );
}

export default Analytics;