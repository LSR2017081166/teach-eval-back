// 引用express框架
const express = require('express')
// 创建登录路由
const user = express.Router()
// 引入路由账号模型
const Login = require('../model/user/login')
const Student = require('../model/user/student')
const Teacher = require('../model/user/teacher')

// 实现登录功能的路由
user.post('/login', async (req, res) => {
    const { account, password } = req.body
    let loginRes = await Login.findOne({ account })
    // 如果查询到了该账户
    if (loginRes) {
        // 比对密码
        if (password == loginRes.password) {
            // 比对成功
            res.send(account)
        }
        else {
            // 比对失败
            res.send('账号或密码错误!')
        }
    }
    else {
        // 没有查询到用户
        res.send('账号或密码错误!')
    }
})
// 通过账号查找学生/教师身份的路由
user.post('/getIdInfo', async (req, res) => {
    let { account } = req.body
    console.log(account.length);
    if(account.length==10){
        Student.find({ sno: account }, function (err, doc) {
            if (err) {
                console.log(err);
                return;
            }
            res.send(doc)
        })
    }
    else if(account.length==8){
        Teacher.find({ jobNum: account }, function (err, doc) {
            if (err) {
                console.log(err);
                return;
            }
            res.send(doc)
        })
    }
})
// 得到所有教师信息，并依据学院将教师分组返给前端
user.post('/getAllTeachers', async (req, res) => {
    Teacher.aggregate([
        {
            $group:
            {
                _id: { academy: "$academy" },//{}内的是分组条件
                details: {
                    $push: {
                        name: '$name'
                    }
                }
            },
        }
    ], function (err, doc) {
        if (err) {
            console.log(err);
            return;
        }
        res.send(doc)
        // console.log(JSON.stringify(doc));
    })
})
// 通过学院，教师姓名查找指定教师的路由
user.post('/getTeacher', async (req, res) => {
    let { academy, teaName } = req.body
    Teacher.find({ academy, name: teaName }, function (err, doc) {
        if (err) {
            console.log(err);
            return;
        }
        res.send(doc)
    })
})
// 修改教师用户信息
user.post('/modifyTea', async (req, res) => {
    let { name, academy, age, gender, jobNum, password, title, _id } = req.body
    Teacher.updateOne({ _id }, { name, academy, age, gender, jobNum, password, title }, function (err, doc) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(doc);
        res.send(doc)
    })
})
// 删除指定教师
user.post('/delTea', async (req, res) => {
    let { _id } = req.body
    Teacher.deleteOne({ _id }, function (err, doc) {
        if (err) {
            console.log(err);
            return;
        }
        res.send('ok')
    })
})
// 得到所有学生，并依据学院将学生分组返给前端
user.post('/getAllStudents', async (req, res) => {
    // 学院
    let a = []
    // 年级
    let b = []
    // 班级
    let c = []
    // 组合
    let d = []
    // 以学院，年级，班级分组
    // 以学院分组
    await Student.aggregate([
        {
            $group:
            {
                _id: { academy: '$academy' },//{}内的是分组条件
            },
        }
    ], function (err, doc) {
        if (err) {
            console.log(err);
            return;
        }
        a = doc

    })
    // 以年级分组
    await Student.aggregate([
        {
            $group:
            {
                _id: { grade: '$grade' },//{}内的是分组条件
            },
        }
    ], function (err, doc) {
        if (err) {
            console.log(err);
            return;
        }
        b = doc

    })
    await Student.aggregate([
        {
            $group:
            {
                _id: { academy: '$academy', grade: '$grade', classInfo: "$classInfo" },//{}内的是分组条件
                details: {
                    $push: {
                        name: '$name',
                        sno: '$sno',
                        gender: '$gender'
                    }
                }
            },
        }
    ], function (err, doc) {
        if (err) {
            console.log(err);
            return;
        }
        c = doc

    })
    // 将数据组合成需要的格式返回给前端
    // for (let i = 0; i < a.length; i++){
    //     for (let j = 0; j < b.length; j++){
    //         for (let k = 0; k < c.length; k++){

    //         }
    //     }
    // }
    d.push(a, b, c)
    res.send(d)
})
// 得到指定班级学生信息
user.post('/getStudents', async (req, res) => {
    let { academy, grade, classInfo } = req.body
    Student.find({ academy, grade, classInfo }, function (err, doc) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(doc);
        res.send(doc)
    })
})
// 删除指定学生
user.post('/delStu', async (req, res) => {
    let { _id } = req.body
    Student.deleteOne({ _id }, function (err, doc) {
        if (err) {
            console.log(err);
            return;
        }
        res.send('ok')
    })
})
// 修改学生用户信息
user.post('/modifyStu', async (req, res) => {

    let { name, academy, age, gender, sno, password, classInfo, _id } = req.body
    Student.updateOne({ _id }, { name, academy, age, gender, sno, password, classInfo }, function (err, doc) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(doc);
        res.send(doc)
    })
})
// 添加老师
user.post('/addTea', async (req, res) => {
    const {academy,age,gender,jobNum,name,password,title}=req.body
    Teacher.create({ academy,age,gender,jobNum,name,password,title}, function (err, doc) {
        if (err) {
            console.log(err);
            return;
        }
        res.send('ok')
    })
})
// 添加学生
user.post('/addStu', async (req, res) => {
    const {name,sno,gender,age,academy,classInfo,password,grade}=req.body
    Student.create({ name,sno,gender,age,academy,classInfo,password,grade}, function (err, doc) {
        if (err) {
            console.log(err);
            return;
        }
        res.send('ok')
    })
})
module.exports = user
