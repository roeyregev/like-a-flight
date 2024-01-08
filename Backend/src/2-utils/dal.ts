import mysql, { MysqlError } from "mysql";
import appConfig from "./app-config";

// Creating a connection object:
const connection = mysql.createPool({
    host: appConfig.mysqlHost, // Database computer address
    user: appConfig.mysqlUser, // Database username
    password: appConfig.mysqlPassword, // database password
    database: appConfig.mysqlDatabase // database name
});

function execute(sql: string, values?: any[]): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        connection.query(sql, values, (err: MysqlError, result: any) => {
            if(err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}

export default {
    execute
};