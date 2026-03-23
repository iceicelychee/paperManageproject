const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql123',
    database: 'blog_system'
})

db.connect(err => {
    if(err) {
        console.log('数据库连接失败', err)
    }else{
        console.log('数据库连接成功')
    }
})

module.exports = db
