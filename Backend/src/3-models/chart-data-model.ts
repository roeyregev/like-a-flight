class ChartDataModel {
    count: number;
    vacationId: number
    destination: string

    constructor(chartData: ChartDataModel) {
        this.count = chartData.count
        this.vacationId = chartData.vacationId
        this.destination = chartData.destination
    }
}

export default ChartDataModel