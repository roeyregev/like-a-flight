class AppConfig {

    //Backend urls:
    public readonly vacationsUrl: string = "http://localhost:4000/api/vacations/";
    public readonly analyticsUrl: string = "http://localhost:4000/api/analytics/";
    public readonly registerUrl: string = "http://localhost:4000/api/register/";
    public readonly loginUrl: string = "http://localhost:4000/api/login/";

    //Frontend routes:
    public readonly homeRoute: string = "/home/";
    public readonly vacationsRoute: string = "/vacations/";
    public readonly addVacationRoute: string = this.vacationsRoute + "add/";
    public readonly editVacationRoute: string = this.vacationsRoute + "edit/";
    public readonly analyticsRoute: string = this.vacationsRoute + "analytics/";
    public readonly registerRoute: string = "/register/";
    public readonly loginRoute: string = "/login/";
}

// Singleton
const appConfig = new AppConfig();

export default appConfig;