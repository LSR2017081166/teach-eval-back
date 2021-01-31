// 引用express框架
const express = require('express')
// 创建问卷路由
const course = express.Router()
// 引入路由账号模型
const Course = require('../model/course/course')

// 实现查询被评课程的路由
course.post('/getCourse', async (req, res) => {
    const { academy,grade,classInfo} = req.body
    console.log(academy,grade,classInfo);
    Course.find({academy,grade,classInfo} , function (err, doc) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(doc);
        res.send(doc)
    })
})

module.exports = course
