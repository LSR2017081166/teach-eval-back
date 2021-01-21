// 引用express框架
const express = require('express')
// 创建登录路由
const user = express.Router()
// 引入路由账号模型
const { Login } = require('../model/user/login')

// 实现登录功能的路由
user.post('/login', async (req, res) => {
    const { account, password } = req.body
    console.log(req.body);
    let loginRes = await Login.findOne({ account })
    // 如果查询到了该账户
    if (loginRes) {
        console.log("找到了");
        // 比对密码
        if (password == loginRes.password) {
            // 比对成功
            let data =
            {
                // 登录成功的状态码是"1"
                "status": 1,
                "message": "登录成功",
                "url": "/user/login",
                "data": {
                    "account": loginRes.account,
                    "password": loginRes.password
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
