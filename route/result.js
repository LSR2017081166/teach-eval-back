// 引用express框架
const express = require('express')
// 创建问卷路由
const result = express.Router()
// 引入路由账号模型
const ChoiceRes = require('../model/result/choiceRes')
const JQuizRes = require('../model/result/jQuizRes')

// 实现存入学生作答后问卷结果的路由
result.post('/saveResult', async (req, res) => {
    const {questName,project,result1,sno,jQuizs}=req.body
// 存入选择题答案
    for (var value of result1) {
        let { title,option,score } = value
        ChoiceRes.create({
            questName,
            project,
            title,
            option,
            score,
            sno
        },function (err, doc) {
            if (err) {
                console.log(err);
                return;
            }
            console.log('选择题存入成功！');
            // res.send(doc)
        })
    }
    // 存入简答题答案
    for (var value of jQuizs) {
        let { title,answer } = value
        JQuizRes.create({
            questName,
            project,
            title,
            answer,
            sno
        },function (err, doc) {
            if (err) {
                console.log(err);
                return;
            }
            console.log('简答题存入成功！');
            
        })
    }
    res.send({data:'ok'})
})

module.exports = result
