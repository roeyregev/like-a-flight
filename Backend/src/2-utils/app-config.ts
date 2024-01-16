import dotenv from "dotenv";
import cyber from "./cyber";

dotenv.config();

class AppConfig {
    public readonly port = process.env.PORT;
    // public readonly port = 4000;
    public readonly mysqlHost = process.env.MYSQL_HOST;
    // public readonly mysqlHost = "localhost";
    public readonly mysqlUser = process.env.MYSQL_USER;
    // public user = cyber.decrypt(process.env.MYSQL_USER);
    // public readonly mysqlUser = "root";
    public readonly mysqlPassword = process.env.MYSQL_PASSWORD;
    // public readonly mysqlPassword = "";
    public readonly mysqlDatabase = process.env.MYSQL_DATABASE;
    // public readonly mysqlDatabase = "like-a-flight";
    public readonly appHost = "http://" + this.mysqlHost + ":" + this.port;
    
}

class DevelopmentConfig extends AppConfig {
    public isDevelopment = true;
    public isProduction = false;
}

class ProductionConfig extends AppConfig {
    public isDevelopment = false;
    public isProduction = true;
}

const appConfig = (process.env.NODE_ENV === "production") ? new ProductionConfig() : new DevelopmentConfig();
// const appConfig = new AppConfig();

export default appConfig;
