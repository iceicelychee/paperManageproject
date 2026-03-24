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
const db = process.env.DATABASE_URL 
    ? mysql.createConnection(process.env.DATABASE_URL)
    : mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
 })

db.connect(err => {
    if(err) {
        console.log('数据库连接失败', err)
    }else{
        console.log('数据库连接成功')
    }
})

export default db
