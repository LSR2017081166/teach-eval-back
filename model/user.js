// 创建用户集合
// 引入mongoose第三方模块
const mongoose =require('mongoose')

// 创建用户集合规则
const loginSchema = new mongoose.Schema({
    account:{
        type:String,
        required:true,
        minlength:2,
        maxlength:20
    },
    password:{
        type:String,
        required:true
    }
})

// 创建集合
const User=mongoose.model('User',loginSchema)

// User.create({
//     account:'111111',
//     password:'123'
// }).then(()=>{
//     console.log("用户创建成功！");
// }).catch(()=>{
//     console.log("用户创建失败！");
// })
// 将用户集合作为模块成员导出
module.exports={
    User
}