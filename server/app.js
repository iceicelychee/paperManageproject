// 导入工具包
import express from 'express'
import cors from 'cors'
import db from './db.js'

// 创建服务器/实例
const app = express()

// 添加中间件
app.use(cors())
app.use(express.json())

// 定义接口
app.get('/text', (req, res) => {
    res.send('<h1>服务器正常运行！</h1>')
   // res.json({ msg: 'server ok!'})
})

// 测试接口
app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users'
    
    db.query(sql, (err, result) => {
        if(err) {
            res.json({code: 500, msg: '数据库查询失败'})
        }else{
            res.json({ code: 200, msg: result})
        }
    })
})

// 注册接口
app.post('/register', (req ,res) => {
    const { username, password} = req.body

    if(!username || !password){
        return res.json({ code: 400, msg: '用户名或密码不能为空' })
    }

    const checkSql = 'SELECT * FROM users WHERE username = ?'
    // 查询用户名是否已存在
    db.query(checkSql, [username], (err, result) => {
        if(err) {
            return res.json({ code: 500, msg: '查询失败'})
        }else if(result.length > 0){
            return res.json({ code: 400, msg: '用户名已存在'})
        }

        // 用户名不存在，插入新用户
        const insertSql = 'INSERT INTO users (username, password) VALUES(?, ?)'
        db.query(insertSql, [username, password], (err, result) => {
            if(err){
                return res.json({ code: 500, msg: '注册失败'})
            }
            res.json({ code: 200, msg: '注册成功'})
        })
    })
})

// 登录接口
app.post('/login', (req, res) => {
    const { username, password} = req.body

    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?'
    db.query(sql, [username, password], (err, result) => {
        if(err) {
            return res.json( {code: 500, msg: '登录失败'})
        }
        if(result.length === 0) {
            return res.json({ code: 400, msg: '用户名或密码错误'})
        }
        // 登录成功，生成 token 
        const token = 'token' + Date.now() // 后续升级JWT
        res.json({ 
            code: 200,
            msg: '登录成功',
            token,
         })
    })
})

// 文章接口
// 发布文章接口
app.post('/articles', (req, res) => {
    const { title, content, user_id} = req.body
    if(!title || !content ){
        return res.json({ code: 400, msg: '标题、内容或用户ID不能为空' })
    }

    const sql = 'INSERT INTO articles (title, content, user_id) VALUES(?, ?, ?)'
    db.query(sql, [title, content, user_id], (err, result) => {
        if(err){
            return res.json({ code: 500, msg: '文章发布失败'})
        }
        res.json({ code: 200, msg: '文章发布成功'})
    })
})

// 获取文章接口
app.get('/articles', (req, res) => {
    const sql = 'SELECT * FROM articles ORDER BY created_at DESC'
    db.query(sql, (err, result) => {
        if(err) {
            return res.json({ code: 500, msg: '文章获取失败'})
        }
        res.json({ code: 200, msg: '文章获取成功', data: result})
    })
})

// 删除文章接口
app.delete('/articles/:id', (req, res) => {
    const id = req.params.id

    const sql = 'DELETE FROM articles WHERE id = ?'
    db.query(sql, [id], (err, result) => {
        if(err) { 
            return res.json({ code: 500, msg: '文章删除失败'})
         }
         res.json({ code: 200, msg: '文章删除成功'})
    })
})

// 编辑文章接口
app.put('/articles/:id', (req, res) => {
    const id = req.params.id
    const { title, content} = req.body

    const sql = 'UPDATE articles SET title = ?, content = ? WHERE id = ?'
    db.query(sql, [title, content, id], (err, result) => {
        if(err) {
            return res.json({ code: 500, msg: '更新文章失败'})
        }
        res.json({ code: 200, msg: '更新文章成功'})
    })
})
// 启动服务器
app.listen(3001, () => {

    console.log('server runing at http://localhost:3001')
})