// 创建问卷信息集合
// 引入mongoose第三方模块
const mongoose = require('mongoose')

// 创建问卷信息集合规则
const questSchema = new mongoose.Schema({
    // 名称
    name: {
        type: String,
        index: true,//索引
        required: true,
        minlength: 2,
        maxlength: 30,
        trim: true
    },
    // 填写时区
    section: {
        type: String,
        required: true,
        trim: true
    },
    // 可编辑分数(必须为0才能发布)
    score: {
        type: Number,
        required: true,
        default:100
    },
    // 是否发布(0为未发布,1为已发布)
    publish:{
        type: String,
        required: true,
        default:0
    }
})

// 创建集合
const QuestInfo = mongoose.model('QuestInfos', questSchema,'QuestInfos')

// QuestInfo.create({
//     name:'111',
//     section:'1/2-1/4'
// }).then(()=>{
//     console.log("问卷信息创建成功！");
// }).catch(()=>{
//     console.log("问卷信息创建失败！");
// })
// 将问卷信息集合作为模块成员导出
module.exports = QuestInfo