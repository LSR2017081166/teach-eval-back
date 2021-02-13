// 引用express框架
const express = require('express')
// 创建问卷路由
const course = express.Router()
// 引入路由账号模型
const Course = require('../model/course/course')
const ChoiceRes = require('../model/result/choiceRes')
const Student = require('../model/user/student')

// 通过学院，年级，班级查询被评课程
course.post('/getCourse1', async (req, res) => {
    const { academy, grade, classInfo } = req.body
    console.log(academy, grade, classInfo);
    Course.find({ academy, grade, classInfo }, function (err, doc) {
        if (err) {
            console.log(err);
            return;
        }
        res.send(doc)
    })
})
// 通过学院，年级，教师名称获取被评课程及对应教学班
course.post('/getCourse2', async (req, res) => {
    const { academy, teaName } = req.body
    Course.find({ academy, teacher: teaName }, function (err, doc) {
        if (err) {
            console.log(err);
            return;
        }
        res.send(doc)
    })
})
// 通过学院名称，年级，教师姓名，问卷名称，课程名称，班级获取被评课程的所有学生评教结果
course.post('/getRes', async (req, res) => {
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
    let choiceRes1 = await ChoiceRes.find({ project: course, questName })
    // 将查询到的结果的学号梳理出来
    let sno = []
    for (var value of choiceRes1) {
        sno.push(value.sno)
    }
    // 去重，得到该问卷下已评教学生的学号
    sno = Array.from(new Set(sno))
    console.log('22222222222222');
    console.log(sno);
    for (let i = 0; i < sno.length; i++) {
        let student = await Student.find({ sno: sno[i] })
        grade1 = student[0].grade
        classInfo1 = student[0].classInfo
        academy1 = student[0].academy
        // 判断问卷是否与学生对应
        if (grade1 === grade && classInfo1 === classInfo && academy1 === academy) {
            // 如果对应
            // 通过课程名称和学号查出该学生该课程的评教结果
            let choiceRes2 = await ChoiceRes.find({ project: course, sno: sno[i] })
            result.push(choiceRes2)
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
    items.score=0
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
        items.score+=result[0][i].score
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
        items[i].perA=items[i].optionA.length/result.length
        items[i].perB=items[i].optionB.length/result.length
        items[i].perC=items[i].optionC.length/result.length
        items[i].perD=items[i].optionD.length/result.length
    }
    items.score=(items.score+total) / result.length
    res.send(items)
})
module.exports = course
