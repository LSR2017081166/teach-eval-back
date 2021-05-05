// 引用express框架
const express = require('express')
// 创建问卷路由
const result = express.Router()
// 引入路由账号模型
const { teaChoiceRes, stuChoiceRes } = require('../model/result/choiceRes')
const { stuJQuizRes, teaJQuizRes } = require('../model/result/jQuizRes')
const Student = require('../model/user/student')

// 实现存入老师作答后问卷结果的路由
result.post('/saveResult2', async (req, res) => {
    const { questName, academy, result1, teaName, jobNum, jQuizs } = req.body
    console.log('6666666666655555555');
    console.log(jQuizs);
    // 存入选择题答案
    for (var value of result1) {
        let { title, option, score } = value
        teaChoiceRes.create({
            questName,
            academy,
            title,
            option,
            score,
            teaName,
            jobNum
        }, function (err, doc) {
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
        let { title, answer } = value
        teaJQuizRes.create({
            questName,
            academy,
            title,
            teaName,
            jobNum,
            answer
        }, function (err, doc) {
            if (err) {
                console.log(err);
                return;
            }
            console.log('简答题存入成功！');

        })
    }
    res.send({ data: 'ok' })
})
// 实现存入学生作答后问卷结果的路由
result.post('/saveResult1', async (req, res) => {
    const { questName, project, result1, sno, jQuizs } = req.body
    // 存入选择题答案
    for (var value of result1) {
        let { title, option, score } = value
        stuChoiceRes.create({
            questName,
            project,
            title,
            option,
            score,
            sno
        }, function (err, doc) {
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
        let { title, answer } = value
        stuJQuizRes.create({
            questName,
            project,
            title,
            answer,
            sno
        }, function (err, doc) {
            if (err) {
                console.log(err);
                return;
            }
            console.log('简答题存入成功！');

        })
    }
    res.send({ data: 'ok' })
})
// 通过学院名称，年级，教师姓名，问卷名称，课程名称，班级获取被评课程的所有学生评教结果
result.post('/getStuRes', async (req, res) => {
    let jQuizRes = []
    let result = []
    let grade1 = ''
    let classInfo1 = ''
    let academy1 = ''
    const { academy,
        grade,
        teacher,
        questName,
        course,
        classInfo, } = req.body
    let choiceRes1 = await stuChoiceRes.find({ project: course, questName })
    // 将查询到的结果的学号梳理出来
    let sno = []
    for (var value of choiceRes1) {
        sno.push(value.sno)
    }
    // 去重，得到该问卷下已评教学生的学号
    sno = Array.from(new Set(sno))

    for (let i = 0; i < sno.length; i++) {
        let student = await Student.find({ sno: sno[i] })
        grade1 = student[0].grade
        classInfo1 = student[0].classInfo
        academy1 = student[0].academy
        // 判断问卷是否与学生对应
        if (grade1 === grade && classInfo1 === classInfo && academy1 === academy) {
            // 如果对应
            // 通过课程名称和学号查出该学生该课程的评教结果
            // 选择题
            let choiceRes2 = await stuChoiceRes.find({ project: course, sno: sno[i] })
            result.push(choiceRes2)
            // 简答题
            let jQuizRes2 = await stuJQuizRes.find({ project: course, sno: sno[i] })
            jQuizRes.push(jQuizRes2)
        }
        else {
            console.log('不对应！');

        }
    }
    // 得到result（学生评价的每一道题）后，返回给前端问卷需要的数据
    // 初步整理出前端需要的数据:【总分】【题目，ABCD选项，每题总分，四个选项内容】
    let questRes = []
    let total = 0
    let items = []
    items.score = 0

    for (let i = 0; i < result[0].length; i++) {
        let item = {
            title: result[0][i].title,
            average: result[0][i].score,
            optionA: [],
            optionB: [],
            optionC: [],
            optionD: []
        }
        if (result[0][i].option === 'A') {
            item.optionA.push(result[0][i].option)
        }
        else if (result[0][i].option === 'B') {
            item.optionB.push(result[0][i].option)
        }
        else if (result[0][i].option === 'C') {
            item.optionC.push(result[0][i].option)
        }
        else if (result[0][i].option === 'D') {
            item.optionD.push(result[0][i].option)
        }
        items.push(
            item
        )
        items.score += result[0][i].score
    }
    for (let i = 1; i < result.length; i++) {
        for (let j = 0; j < result[i].length; j++) {
            total += parseInt(result[i][j].score)
            for (let k = 0; k < items.length; k++) {
                if (items[k].title === result[i][j].title) {
                    items[k].average += result[i][j].score
                    if (result[i][j].option === 'A') {
                        items[k].optionA.push(result[i][j].option)
                    }
                    else if (result[i][j].option === 'B') {
                        items[k].optionB.push(result[i][j].option)
                    }
                    else if (result[i][j].option === 'C') {
                        items[k].optionC.push(result[i][j].option)
                    }
                    else if (result[i][j].option === 'D') {
                        items[k].optionD.push(result[i][j].option)
                    }
                }
            }
        }
    }
    // // 再次整理出前端直接需要的数据【题目，ABCD选项占比，每题平均分，四个选项内容】
    for (let i = 0; i < result[0].length; i++) {
        items[i].average = items[i].average / result.length
        items[i].perA = items[i].optionA.length / result.length
        items[i].perB = items[i].optionB.length / result.length
        items[i].perC = items[i].optionC.length / result.length
        items[i].perD = items[i].optionD.length / result.length
    }
    // 将简答题答案存入返回前端的结果中
    items.push({
        jQuizRes
    })
    console.log(items);
    res.send(items)
})
// 通过学院，被评教师姓名获取该教师评教结果
result.post('/getTeaRes', async (req, res) => {
    let allScore = 0
    let jQuizRes = []
    let { questName, academy, teaName } = req.body
    teaChoiceRes.aggregate([
        {
            $group:
            {
                _id: { questName: "$questName", teaName: "$teaName", title: "$title" },//{}内的是分组条件
                details: {
                    $push: {
                        score: '$score',
                        option: '$option'
                    }
                }
            },
        }
    ], async function (err, doc) {
        if (err) {
            console.log(err);
            return;
        }
        // res.send(doc)
        let choiceRes = []
        let item = {}
        for (let i = 0; i < doc.length; i++) {
            let optionA = []
            let optionB = []
            let optionC = []
            let optionD = []
            let a = doc[i].details
            if (doc[i]._id.questName === questName && doc[i]._id.teaName === teaName) {
                let title = doc[i]._id.title
                allScore = 0
                for (let j = 0; j < a.length; j++) {
                    // 算平均分
                    allScore += a[j].score
                    // 收集具体选项
                    if (a[j].option === "A") {
                        optionA.push("A")
                    }
                    else if (a[j].option === "B") {
                        optionB.push("B")
                    }
                    else if (a[j].option === "C") {
                        optionC.push("C")
                    }
                    else if (a[j].option === "D") {
                        optionD.push("D")
                    }
                }
                // 平均分
                let average = allScore / a.length
                let perAll = optionA.length + optionB.length + optionC.length + optionD.length
                let perA = optionA.length / perAll
                let perB = optionB.length / perAll
                let perC = optionC.length / perAll
                let perD = optionD.length / perAll
                item = {
                    average,
                    title,
                    optionA,
                    optionB,
                    optionC,
                    optionD,
                    perA,
                    perB,
                    perC,
                    perD
                }
                choiceRes.push(item)
            }
        }
        // 查询该教师下的简答题结果
        let b = {}
        // 将查询到的结果的工号梳理出来
        let res1 = await teaJQuizRes.find({ questName ,teaName})
        let jobNums = []
        for (var value of res1) {
            jobNums.push(value.jobNum)
        }
        // 去重，得到该问卷下已评教学生的学号
        jobNums = Array.from(new Set(jobNums))
        console.log('00000000000000000');
        console.log(jobNums);
        // teaJQuizRes.aggregate([
        //     {
        //         $group:
        //         {
        //             _id: { questName: "$questName", teaName: "$teaName", jobNum: "$jobNum" },//{}内的是分组条件
        //             details: {
        //                 $push: {
        //                     answer: '$answer',
        //                     questName: '$questName',
        //                     title: '$title'
        //                 }
        //             }
        //         },
        //     }
        // ], async function (err, doc) {
        //     console.log(doc);
        //     for (let i = 0; i < doc.length; i++) {
        //         if (questName === doc[i]._id.questName && teaName === doc[i]._id.teaName) {

        //         }
        //     }
        // })
        b = await teaJQuizRes.find({ questName, academy, teaName })
        for(let i=0;i<jobNums.length;i++){
            let a=[]
            for(let j=0;j<b.length;j++){
                if(jobNums[i]===b[j].jobNum){
                    a.push(b[j])
                }
            }
            jQuizRes.push(a)
        }
        console.log('7777777777777');
        // 将简答题答案存入返回前端的结果中
        choiceRes.push({
            jQuizRes
        })
        res.send(choiceRes)
    })
})
module.exports = result
