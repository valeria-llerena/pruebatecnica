import mysql from "mysql2";
import config from "../database/config.js";


const connection = mysql.createConnection({
    
    host: config.host,
    database: config.database,
    user: config.user, 
    password: config.password,
    port: config.port
});

export const getConnection = ()=>{
    return connection
};

