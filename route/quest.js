// 引用express框架
const express = require('express')
// 创建问卷路由
const quest = express.Router()
// 引入问卷模型
const { UnpubInfo,UnpubSub } = require('../model/quest')

// 实现存入"未发布问卷"说明信息及题目集的路由
quest.post('/tempUnpub', async (req, res) => {
    console.log(req.body);
    const { name, section,score } = req.body
    // 问卷说明信息存入数据库
    UnpubInfo.create({
        name,
        section,
        score
    }).then(() => {
        let data =
        {
            // 说明信息存入成功的状态码是"1"
            "status": 1,
            "message": "说明信息存入成功"
        }
        res.send(data)
    }).catch(() => {
        let data =
        {
            // 说明信息存入失败的状态码是"0"
            "status": 0,
            "message": "说明信息存入成功"
        }
        res.send(data)
    })
    // 问卷题目集信息存入数据库
    UnpubSub.create({
        subKey,
        title,
        optionA,
        optionB,
        optionC,
        optionD,
        scoreA,
        scoreB,
        scoreC,
        scoreD
    }).then(() => {
        let data =
        {
            // 题目集存入成功的状态码是"1"
            "status": 1,
            "message": "题目集存入成功"
        }
        res.send(data)
    }).catch(() => {
        let data =
        {
            // 题目集存入失败的状态码是"0"
            "status": 0,
            "message": "题目集存入失败"
        }
        res.send(data)
    })
})

module.exports = quest
