// 创建题目集合
// 引入mongoose第三方模块
const mongoose = require('mongoose')

// 创建题目集合规则
const questionSchema = new mongoose.Schema({
    // 属于问卷的名称
    questName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
        trim: true
    },
    // 处于问卷第几题
    questionKey: {
        type: String,
        required: true
    },
    // 题目
    title: {
        type: String,
        required: true,
        minlength: 5,
        trim: true
    },
    // 选项A
    optionA: {
        type: String,
        required: true
    },
    // 选项B
    optionB: {
        type: String,
        required: true
    },
    // 选项C
    optionC: {
        type: String,
        required: true
    },
    // 选项D
    optionD: {
        type: String,
        required: true
    },
    // A分值
    scoreA: {
        type: Number,
        required: true
    },
    // B分值
    scoreB: {
        type: Number,
        required: true
    },
    // C分值
    scoreC: {
        type: Number,
        required: true
    },
    // D分值
    scoreD: {
        type: Number,
        required: true
    }
})

// 创建集合
const Question = mongoose.model('Questions', questionSchema, 'Questions')

Question.create({
    questName: '111',
    questionKey: '2',
    title:'您对我校现行的学生评教工作(学生评教实施过程)',
    optionA:'1',
    optionB:'1',
    optionC:'1',
    optionD:'1',
    scoreA:'1',
    scoreB:'1',
    scoreC:'1',
    scoreD:'1'
}).then(() => {
    console.log("题目创建成功！");
}).catch(() => {
    console.log("题目创建失败！");
})
// 将问卷集合作为模块成员导出
module.exports = {
    Question
}