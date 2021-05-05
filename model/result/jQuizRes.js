// 创建问卷简答题结果集合
// 引入mongoose第三方模块
const mongoose = require('mongoose')


// 创建教师问卷简答题结果集合规则
const jQuizResSchema2 = new mongoose.Schema({
    // 问卷名称
    questName: {
        type: String,
        index: true,//索引
        required: true
    },
    // 学院
    academy: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    // 简答题答案
    answer: {
        type: String,
        required: true
    },
    // 被评人姓名
    teaName: {
        type: String,
        required: true
    },
    // 评教人工号
    jobNum: {
        type: String,
        required: true
    },

})

// 创建集合
const teaJQuizRes = mongoose.model('teaJQuizRess', jQuizResSchema2, 'teaJQuizRess')
// 创建学生问卷简答题结果集合规则
const jQuizResSchema1 = new mongoose.Schema({
    // 问卷名称
    questName: {
        type: String,
        index: true,//索引
        required: true
    },
    // 被评课程或其他项目（比如辅导员）名称
    project: {
        type: String,
        required: true
    },
    // 简答题题目
    title: {
        type: String,
        required: true
    },
    // 学生回答简答题答案
    answer: {
        type: String,
        required: true
    },
    // 填写问卷学生学号
    sno: {
        type: String,
        required: true
    },

})

// 创建集合
const stuJQuizRes = mongoose.model('stuJQuizRess', jQuizResSchema1, 'stuJQuizRess')

// JQuizRes.create({
//     questName:'2017年问卷',
//     project:'面对对象程序设计',
//     title:'请提出意见',
//     answer:'暂无',
//     sno:2017081166
// }).then(()=>{
//     console.log("问卷简答题结果表创建成功！");
// }).catch(()=>{
//     console.log("问卷结果表创建失败！");
// })
// 将问卷结果集合作为模块成员导出
module.exports = { stuJQuizRes, teaJQuizRes }