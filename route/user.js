// 引用express框架
const express = require('express')
// 创建登录路由
const user = express.Router()
// 引入路由账号模型
const Login  = require('../model/user/login')
const Student  = require('../model/user/student')

// 实现登录功能的路由
user.post('/login', async (req, res) => {
    const { account, password } = req.body
    let loginRes = await Login.findOne({ account })
    // 如果查询到了该账户
    if (loginRes) {
        // 比对密码
        if (password == loginRes.password) {
            // 比对成功
            res.send(account)
        }
        else {
            // 比对失败
            res.send('账号或密码错误!')
        }
    }
    else {
        // 没有查询到用户
        res.send('账号或密码错误!')
    }
})
// 通过账号查找学生身份的路由
user.post('/getIdInfo', async (req, res) => {
    let {account}=req.body
    Student.find({sno:account}, function (err, doc) {
        if (err) {
            console.log(err);
            return;
        }
        res.send(doc)
    })
})
module.exports = user
