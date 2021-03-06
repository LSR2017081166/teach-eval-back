// 创建问卷选择题结果集合(学生选择的每一道题的选项的结果)
// 引入mongoose第三方模块
const mongoose = require('mongoose')


// 创建教师问卷结果集合规则
const choiceResSchema2 = new mongoose.Schema({
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
    // 选中项
    option: {
        type: String,
        required: true
    },
    // 选中项分数
    score: {
        type: Number,
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
const teaChoiceRes = mongoose.model('teaChoiceRess', choiceResSchema2, 'teaChoiceRess')
// 创建学生问卷结果集合规则
const choiceResSchema1 = new mongoose.Schema({
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
    // 该题题目
    title: {
        type: String,
        required: true
    },
    // 选中项
    option: {
        type: String,
        required: true
    },
    // 选中项分数
    score: {
        type: Number,
        required: true
    },
    // 填写问卷学生学号
    sno: {
        type: String,
        required: true
    },

})

// 创建集合
const stuChoiceRes = mongoose.model('stuChoiceRess', choiceResSchema1, 'stuChoiceRess')

// ChoiceRes.create({
//     name:'2017年问卷',
//     project:'面对对象程序设计',
// title:'111111111',
//     option:'A',
//     score:3,
//     sno:2017081166
// }).then(()=>{
//     console.log("问卷选择题结果表创建成功！");
// }).catch(()=>{
//     console.log("问卷结果表创建失败！");
// })
// 将问卷结果集合作为模块成员导出
module.exports = { stuChoiceRes,teaChoiceRes }