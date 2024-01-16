class AppConfig {
    public readonly port = 4000;
    public readonly mysqlHost = "localhost";
    public readonly mysqlUser = "root";
    public readonly mysqlPassword = "";
    public readonly mysqlDatabase = "like-a-flight";
    public readonly appHost = "http://" + this.mysqlHost + ":" + this.port;
}

const appConfig = new AppConfig();

export default appConfig;
