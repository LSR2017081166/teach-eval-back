// 引用express框架
const express = require('express')
// 创建问卷路由
const course = express.Router()
// 引入路由账号模型
const Course = require('../model/course/course')
const {stuChoiceRes } = require('../model/result/choiceRes')

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
// 查看学生是否已评该课程
course.post('/checkCourse', async (req, res) => {
    const { name, sno } = req.body
    stuChoiceRes.find({ project:name, sno }, function (err, doc) {
        if (err) {
            console.log(err);
            return;
        }
        if(doc.length>0){
            res.send('已评教')
        }
        else{
            res.send('未评教')
        }
    })
})
module.exports = course
