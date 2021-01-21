// 创建登录账号集合
// 引入mongoose第三方模块
const mongoose = require('mongoose')

// 创建登录账号集合规则
const loginSchema = new mongoose.Schema({
    // 账号
    account: {
        type: String,
        required: true,
        trim: true
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
const Login = mongoose.model('Logins', loginSchema,'Logins')

// Login.create({
//     account:1111110000,
//     password:111111
// }).then(()=>{
//     console.log("登录账号创建成功！");
// }).catch(()=>{
//     console.log("登录账号创建失败！");
// })
// 将用户集合作为模块成员导出
module.exports = {
    Login
}