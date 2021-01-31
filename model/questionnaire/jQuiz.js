// 创建题目集合
// 引入mongoose第三方模块
const mongoose = require('mongoose')

// 创建题目集合规则
const jQuizSchema = new mongoose.Schema({
    // 属于问卷的名称
    questName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
        trim: true
    },
    // 处于问卷第几题
    // jQuizKey: {
    //     type: String,
    //     required: true
    // },
    // 题目
    title: {
        type: String,
        required: true,
        minlength: 5,
        trim: true
    }
})

// 创建集合
const JQuiz = mongoose.model('JQuizs', jQuizSchema, 'JQuizs')

// JQuiz.create({
//     questName: '111',
//     questionKey: '2',
//     title:'您对我校现行的学生评教工作(学生评教实施过程)',
//     textArea:'没意见'
// }).then(() => {
//     console.log("简答题创建成功！");
// }).catch(() => {
//     console.log("简答题创建失败！");
// })
// 将简答题集合作为模块成员导出
module.exports = JQuiz