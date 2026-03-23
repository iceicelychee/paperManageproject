import process from 'process'

const mysql = require('mysql2');
require('dotenv').config()

const db = mysql.createConnection({
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

module.exports = db
