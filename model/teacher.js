// 创建教师用户信息集合
// 引入mongoose第三方模块
const mongoose = require('mongoose')

// 创建教师用户信息集合规则
const teaSchema = new mongoose.Schema({
    // 姓名
    name: {
        type: String,
        index: true,//索引
        required: true,
        minlength: 2,
        maxlength: 20,
        trim: true
    },
    // 工号
    jobNum: {
        type: String,
        required: true,
        trim: true,
        match: /^[0-9]{8}$/ //只能输入10位正整数
    },
    // 性别
    gender: {
        type: String,
        required: true,
        trim: true,
    },
    // 年龄
    age: {
        type: Number,
        required: true,
        trim: true,
        max: 150,
        min: 15
    },
    // 职称
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 20
    },
    // 学院
    academy: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 20
    },
    // 密码(最少6位)
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    }
})

// 创建集合
const Teacher = mongoose.model('Teachers', teaSchema, 'Teachers')

// Teacher.create({
//     name:'文立玉',
//     jobNum:10000001,
//     gender:'女',
//     age:30,
//     title:'XXX',
//     academy:'软件工程',
//     password:222222
// }).then(()=>{
//     console.log("教师信息创建成功！");
// }).catch(()=>{
//     console.log("教师信息创建失败！");
// })
// 将用户集合作为模块成员导出
module.exports = {
    Teacher
}