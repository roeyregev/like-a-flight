class AppConfig {

    //Backend urls:
    public readonly vacationsUrl: string = this.baseUrl + "/api/vacations/";
    public readonly analyticsUrl: string = this.baseUrl + "/api/analytics/";
    public readonly registerUrl: string = this.baseUrl + "/api/register/";
    public readonly loginUrl: string = this.baseUrl + "/api/login/";
    // public readonly vacationsUrl: string = "http://localhost:4000/api/vacations/";
    // public readonly analyticsUrl: string = "http://localhost:4000/api/analytics/";
    // public readonly registerUrl: string = "http://localhost:4000/api/register/";
    // public readonly loginUrl: string = "http://localhost:4000/api/login/";

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

// // Singleton
// const appConfig = new AppConfig();

// export default appConfig;

class DevelopmentConfig extends AppConfig {

    public constructor() {
        super("http://localhost:4000");
    }
}

class ProductionConfig extends AppConfig {

    public constructor() {
        super("https://like-a-flight.com"); // The real website.
    }
}

const appConfig = process.env.NODE_ENV === "production" ? new ProductionConfig() : new DevelopmentConfig();
export default appConfig;
