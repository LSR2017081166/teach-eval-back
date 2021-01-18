// 引用express框架
const express = require('express')
// 创建登录路由
const quest = express.Router()
// 引入用户模型
const { Unpub } = require('../model/quest')

// 实现存入未发布问卷信息的路由
quest.post('/createUnpub', async (req, res) => {
    const { name, section } = req.body
    Unpub.create({
        name,
        section
    }).then(() => {
        let data =
        {
            // 问卷创建成功的状态码是"1"
            "status": 1,
            "message": "问卷创建成功"
        }
        res.send(data)
    }).catch(() => {
        let data =
        {
            // 问卷创建失败的状态码是"0"
            "status": 0,
            "message": "问卷创建失败"
        }
        res.send(data)
    })
})

module.exports = quest
