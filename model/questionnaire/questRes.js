// 创建问卷结果集合(学生选择的每一道题的选项的结果)
// 引入mongoose第三方模块
const mongoose = require('mongoose')

// 创建问卷结果集合规则
const questResSchema = new mongoose.Schema({
    // 问卷名称
    name: {
        type: String,
        index: true,//索引
        required: true
    },
    // 题目
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
    score:{
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
const QuestRes = mongoose.model('QuestResults', questResSchema,'QuestResults')

QuestRes.create({
    name:'2017年问卷',
    title:'333333333',
    option:'A',
    score:3,
    sno:2017081166
}).then(()=>{
    console.log("问卷结果表创建成功！");
}).catch(()=>{
    console.log("问卷结果表创建失败！");
})
// 将问卷结果集合作为模块成员导出
module.exports = QuestRes