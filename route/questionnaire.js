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
    const { name, section, score, publish, subjects, jQuizs } = req.body
    // 问卷说明信息存入数据库
    QuestInfo.create({
        name,
        section,
        score,
        publish
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
            "message": "说明信息存入失败"
        }
        res.send(data)
    })
    // 问卷选择题存入数据库
    for (var value of subjects) {
        let { title, optionA, optionB, optionC, optionD, scoreA, scoreB, scoreC, scoreD } = value
        Question.create({
            questName: name,
            // subKey: 0,
            title,
            optionA,
            optionB,
            optionC,
            optionD,
            scoreA,
            scoreB,
            scoreC,
            scoreD
        })
    }
    // 问卷简答题信息存入数据库
    for (var value of jQuizs) {
        let { title} = value
        JQuiz.create({
            questName: name,
            title
        })
    }
    // JQuiz.create({
    //     questName: name,
    //     title: jQuizs[0].title,
    //     // questionKey: jQuizs[0].questionKey
    // })

})

// 实现获取所有（暂存，已发布）问卷说明信息路由
questionnaire.get('/getQuestInfo', async (req, res) => {
    QuestInfo.find({}, function (err, doc) {
        if (err) {
            console.log(err);
            return;
        }
        res.send(doc)
    })
})
// 实现获取所有已发布问卷说明信息路由
questionnaire.get('/getPubInfo', async (req, res) => {
    QuestInfo.find({publish:'1'}, function (err, doc) {
        if (err) {
            console.log(err);
            return;
        }
        res.send(doc)
    })
})
// 实现获取指定名称问卷所有选择题路由
questionnaire.post('/getQuestions', async (req, res) => {
    const { name } = req.body
    Question.find({ questName: name }, function (err, doc) {
        if (err) {
            console.log(err);
            return;
        }
        res.send(doc)
    })
})
// 实现获取指定名称问卷所有简答题路由
questionnaire.post('/getJQuizs', async (req, res) => {
    const { name } = req.body
    JQuiz.find({ questName: name }, function (err, doc) {
        if (err) {
            console.log(err);
            return;
        }
        res.send(doc)
    })
})
// 删除指定问卷所有题目
questionnaire.post('/delAllQuests', async (req, res) => {
    const { name } = req.body
    // 删问卷信息
    QuestInfo.deleteMany({ name }, function (err, doc) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("问卷信息删除成功111！");
    })
    // 删简答题
    JQuiz.deleteMany({ questName:name }, function (err, doc) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("简答题删除成功111！");
    })
    // // 删选择题
    Question.deleteMany({ questName:name }, function (err, doc) {
        if (err) {
            console.log(err);
            return;
        }
        console.log("选择题删除成功111！");
    })
    res.send('ok')
})
// 发布问卷
questionnaire.post('/pubQuest', async (req, res) => {
    let {name}=req.body
    QuestInfo.update({name},{publish:'1'},function(err,doc){
        if (err) {
            console.log(err);
            return;
        }
        res.send('ok')
        console.log('ok');
    })
})

module.exports = questionnaire
