import dotenv from "dotenv";
dotenv.config();
class AppConfig {
    constructor() {
        this.port = process.env.PORT;
        this.mysqlHost = process.env.MYSQL_HOST;
        this.mysqlUser = process.env.MYSQL_USER;
        this.mysqlPassword = process.env.MYSQL_PASSWORD;
        this.mysqlDatabase = process.env.MYSQL_DATABASE;
        this.mysqlPort = Number(process.env.MYSQL_PORT);
        this.appHost = "http://" + this.mysqlHost + ":" + this.port;
    }
}
class DevelopmentConfig extends AppConfig {
    constructor() {
        super(...arguments);
        this.isDevelopment = true;
        this.isProduction = false;
    }
}
class ProductionConfig extends AppConfig {
    constructor() {
        super(...arguments);
        this.isDevelopment = false;
        this.isProduction = true;
    }
}
const appConfig = (process.env.NODE_ENV === "production") ? new ProductionConfig() : new DevelopmentConfig();
export default appConfig;
