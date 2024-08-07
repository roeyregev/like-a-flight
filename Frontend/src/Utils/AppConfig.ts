class AppConfig {

    //Backend urls:
    public readonly vacationsUrl: string = this.baseUrl + "/api/vacations/";
    public readonly analyticsUrl: string = this.baseUrl + "/api/analytics/";
    public readonly registerUrl: string = this.baseUrl + "/api/register/";
    public readonly loginUrl: string = this.baseUrl + "/api/login/";

    public constructor(public baseUrl: string) { }

    //Frontend routes:
    public readonly homeRoute: string = "/home/";
    public readonly vacationsRoute: string = "/vacations/";
    public readonly addVacationRoute: string = this.vacationsRoute + "add/";
    public readonly editVacationRoute: string = this.vacationsRoute + "edit/";
    public readonly analyticsRoute: string = this.vacationsRoute + "analytics/";
    public readonly registerRoute: string = "/register/";
    public readonly loginRoute: string = "/login/";
}

class DevelopmentConfig extends AppConfig {
    public constructor() {
        super("http://localhost:4000");
    }
}

class ProductionConfig extends AppConfig {
    public constructor() {
        super("https://backend-production-fd14.up.railway.app:8080"); // The real website.
    }
}

const appConfig = new ProductionConfig()//process.env.NODE_ENV === "production" ? new ProductionConfig() : new DevelopmentConfig();
export default appConfig;