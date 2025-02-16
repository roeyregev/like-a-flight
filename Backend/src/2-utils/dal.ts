// import mysql, { MysqlError } from "mysql";
// import mysql, {QueryError} from 'mysql2';
import mysql, { Pool, PoolConnection, QueryError } from 'mysql2';
import appConfig from "./app-config";

// Creating a mysql2 connection object:
// const connection = mysql.createConnection({
//     host: appConfig.mysqlHost,
//     user: appConfig.mysqlUser,
//     password: appConfig.mysqlPassword,
//     database: appConfig.mysqlDatabase
//   });
  
  // Create a connection pool
const connection: Pool = mysql.createPool({
    host: appConfig.mysqlHost,
    user: appConfig.mysqlUser,
    password: appConfig.mysqlPassword,
    database: appConfig.mysqlDatabase,
    waitForConnections: true,
    // connectionLimit: 10, // Adjust based on your needs
    // queueLimit: 0
});

// Log connection success with explicit typing
connection.getConnection((err: QueryError | null, connection: PoolConnection | null) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database!');
    connection?.release(); // Release the connection back to the pool
});

//   connection.connect((err) => {
//     if (err) throw err;
//     console.log('Connected to the database!');
//   });


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


// Creating a mysql connection object:
// const connection = mysql.createPool(    
//     {
//     host: appConfig.mysqlHost, 
//     user: appConfig.mysqlUser, 
//     port: appConfig.mysqlPort,
//     password: appConfig.mysqlPassword, 
//     database: appConfig.mysqlDatabase
// });