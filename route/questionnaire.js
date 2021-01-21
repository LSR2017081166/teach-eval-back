// 引用express框架
const express = require('express')
// 创建问卷路由
const questionnaire = express.Router()
// 引入问卷模型
const QuestInfo = require('../model/questionnaire/questInfo')
const Question = require('../model/questionnaire/question')
const JQuiz = require('../model/questionnaire/jQuiz')


// 实现存入问卷说明信息、题目集、简答题的路由
questionnaire.post('/createQuest', async (req, res) => {
    const { name, section, score, publish, subjects ,jQuizs} = req.body
    console.log(subjects);
    // 问卷说明信息存入数据库
    // QuestInfo.create({
    //     name,
    //     section,
    //     score,
    //     publish
    // }).then(() => {
    //     let data =
    //     {
    //         // 说明信息存入成功的状态码是"1"
    //         "status": 1,
    //         "message": "说明信息存入成功"
    //     }
    //     res.send(data)
    // }).catch(() => {
    //     let data =
    //     {
    //         // 说明信息存入失败的状态码是"0"
    //         "status": 0,
    //         "message": "说明信息存入成功"
    //     }
    //     res.send(data)
    // })
    // // 问卷题目集信息存入数据库
    // for (var value of subjects) {
    //     let { subKey, title, optionA, optionB, optionC, optionD, scoreA, scoreB, scoreC, scoreD } = value
    //     Question.create({
    //         questName: name,
    //         questionKey: subKey,
    //         title,
    //         optionA,
    //         optionB,
    //         optionC,
    //         optionD,
    //         scoreA,
    //         scoreB,
    //         scoreC,
    //         scoreD
    //     })
    // }
    // // 问卷简答题信息存入数据库


})

module.exports = questionnaire
