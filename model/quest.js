// 创建问卷集合
// 引入mongoose第三方模块
const mongoose =require('mongoose')

// 创建"未发表问卷"集合规则
const UnpubSchema = new mongoose.Schema({
    // 管理员设置问卷名称
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:35
    },
    // 管理员设置问卷填写时间区间
    section:{
        type:String,
        required:true
    }
})

// 创建"未发表问卷"集合
const Unpub=mongoose.model('Unpub',UnpubSchema)
// Unpub.create({
//     name:'第一学期问卷',
//     section:'1/28 - 1/30'
// }).then(()=>{
//     console.log("问卷创建成功！");
// }).catch(()=>{
//     console.log("问卷创建失败！");
// })

module.exports={
    Unpub
}