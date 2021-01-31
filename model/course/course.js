// 创建题目集合
// 引入mongoose第三方模块
const mongoose = require('mongoose')

// 创建课程集合规则
const courseSchema = new mongoose.Schema({
    // 课程名称
    name: {
        type: String,
        required: true
    },
    // 授课老师
    teacher: {
        type: String,
        required: true
    },
    // 行课班级
    classInfo: {
        type: String,
        required: true,
    },
    // 行课年级
    grade: {
        type: String,
        required: true
    },
    // 行课学院
    academy: {
        type: String,
        required: true
    }
})

// 创建集合
const Course = mongoose.model('Courses', courseSchema, 'Courses')

// Course.create({
//     name: '面向对象程序设计(JAVA)1',
//     teacher: '文立玉1',
//     classInfo:'05班',
//     grade:'2017',
// academy:'软件工程'
// }).then(() => {
//     console.log("课程表创建成功！");
// }).catch(() => {
//     console.log("课程表创建失败！");
// })
// 将课程表集合作为模块成员导出
module.exports = Course