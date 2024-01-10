import { useEffect, useState } from "react";
import ChartDataModel from "../../../Models/chart-data-model";
import notificationService from "../../../Services/NotificationService";
import vacationsService from "../../../Services/VacationsService";
import "./Analytics.css";

function Analytics(): JSX.Element {

    const [chartData, setChartData] = useState<ChartDataModel[]>([]);

    useEffect(() => {
        vacationsService.getChartData()
            .then(dbChartData => {
                setChartData(dbChartData);
                console.log(dbChartData);
            })
            .catch(err => notificationService.error(err))
    }, []);


    return (
        <div className="Analytics">
            <h2> here's the Analytics</h2>
            <div className="chart-container">
                <canvas id="myChart"></canvas>
            </div>
        </div>
    );
}

export default Analytics;