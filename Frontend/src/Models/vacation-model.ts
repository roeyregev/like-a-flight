class VacationModel {
    public vacationId: number;
    public destination: string;
    public description: string;
    public startDate: Date | string;
    public endDate: Date | string;
    public price: number ;
    public imageUrl: string;
    public image: File;
    public likes: number;
    public isFollowing: number;
}

export default VacationModel