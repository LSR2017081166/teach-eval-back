// 创建管理员用户信息集合
// 引入mongoose第三方模块
const mongoose = require('mongoose')

// 创建管理员用户信息集合规则
const adminSchema = new mongoose.Schema({
    // 工号
    jobNum: {
        type: Number,
        required: true,
        trim: true,
        match: /^\d{6}$/ //只能输入10位正整数
    },
    // 密码(最少6位)
    password:{
        type:String,
        required:true,
        trim:true,
        minlength: 6
    }
})

// 创建集合
const Administrator = mongoose.model('Administrators', adminSchema,'Administrators')

// Administrator.create({
//     jobNum:100001,
//     password:333333
// }).then(()=>{
//     console.log("管理员信息创建成功！");
// }).catch(()=>{
//     console.log("管理员信息创建失败！");
// })
// 将用户集合作为模块成员导出
module.exports = {
    Administrator
}