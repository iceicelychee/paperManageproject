import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

/*const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})*/
// 优先使用 DATABASE_URL，否则使用独立的环境变量
let db

if (process.env.DATABASE_URL) {
    db = mysql.createConnection({
        uri: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    })
} else {
    db = mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        ssl: { rejectUnauthorized: false }
    })
}

db.connect(err => {
    if(err) {
        console.log('数据库连接失败', err)
    }else{
        console.log('数据库连接成功')
    }
})

export default db
