// 创建学生用户信息集合
// 引入mongoose第三方模块
const mongoose = require('mongoose')

// 创建学生用户信息集合规则
const stuSchema = new mongoose.Schema({
    // 姓名
    name: {
        type: String,
        index: true,//索引
        required: true,
        minlength: 2,
        maxlength: 20,
        trim: true
    },
    // 学号
    sno: {
        type: String,
        required: true,
        trim: true,
        match: /^[1-9][0-9]{9}$/ //只能输入10位正整数
    },
    // 性别
    gender:{
        type:String,
        required:true,
        trim:true,
    },
    // 年龄
    age:{
        type:Number,
        required:true,
        trim:true,
        max:150,
        min:15
    },
    // 学院
    academy:{
        type:String,
        required:true,
        trim:true,
        minlength: 2,
        maxlength: 20
    },
    // 班级
    class:{
        type:Number,
        required:true,
        trim:true
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
const Student = mongoose.model('Students', stuSchema,'Students')

// Student.create({
//     name:'罗世瑞',
//     sno:2017081166,
//     gender:'女',
//     age:22,
//     academy:'软件工程',
//     class:5,
//     password:333333
// }).then(()=>{
//     console.log("学生信息创建成功！");
// }).catch(()=>{
//     console.log("学生信息创建失败！");
// })
// 将用户集合作为模块成员导出
module.exports = {
    Student
}