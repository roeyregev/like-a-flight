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
        super("process.env.BACKEND_URL:8080"); // The real website.
    }
}

console.log(process.env.NODE_ENV)
console.log(process.env.NODE_ENV === "production")
console.log(process.env.NODE_ENV == "production")
const appConfig = process.env.NODE_ENV === "production" ? new ProductionConfig() : new DevelopmentConfig();
export default appConfig;