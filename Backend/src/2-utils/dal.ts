// import mysql, { MysqlError } from "mysql";
import mysql, {QueryError} from 'mysql2';
import appConfig from "./app-config";

// Creating a mysql connection object:
// const connection = mysql.createPool(    
//     {
//     host: appConfig.mysqlHost, 
//     user: appConfig.mysqlUser, 
//     port: appConfig.mysqlPort,
//     password: appConfig.mysqlPassword, 
//     database: appConfig.mysqlDatabase
// });

// Creating a mysql2 connection object:
const connection = mysql.createConnection({
    host: appConfig.mysqlHost,
    user: appConfig.mysqlUser,
    password: appConfig.mysqlPassword,
    database: appConfig.mysqlDatabase
  });
  
  connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database!');
  });

  //mysql (old)
// function execute(sql: string, values?: any[]): Promise<any> {
//     return new Promise<any>((resolve, reject) => {
//         connection.query(sql, values, (err: MysqlError, result: any) => {
//             if(err) {
//                 reject(err);
//                 return;
//             }
//             resolve(result);
//         });
//     });
// }

//mysql2
function execute(sql: string, values?: any[]): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        connection.query(sql, values, (err: QueryError, result: any) => {
            if (err) {
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