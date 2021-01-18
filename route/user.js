// 引用express框架
const express = require('express')
// 创建登录路由
const user = express.Router()
// 引入用户模型
const { User } = require('../model/user')

// 实现登录功能的路由
user.post('/login', async (req, res) => {
    const { account, password } = req.body
    let user = await User.findOne({ account })
    // 如果查询到了该账户
    if (user) {
        // 比对密码
        if (password == user.password) {
            // 比对成功
            let data =
            {
                // 登录成功的状态码是"1"
                "status": 1,
                "message": "登录成功",
                "url": "/user/login",
                "data": {
                    "account": user.account,
                    "password": user.password
                }
            }
            res.send(data)
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

module.exports = user
