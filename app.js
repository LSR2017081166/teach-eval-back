// 引用express框架
const express=require('express')
// 引入body-parser模块
const bodyParser=require('body-parser')
// 创建网站服务器
const app=express()


//  //跨域问题解决方面
const cors = require('cors');  
app.use(cors({  
    origin:['http://localhost:8080'],
    methods:['GET','POST'],
}));
//跨域问题解决方面
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
　next();　
});
// 引入路由模块
const user=require('./route/user')
const questionnaire=require('./route/questionnaire')
const course=require('./route/course')
// 数据库连接
require('./model/connect')

// 加入模拟数据
require('./model/user/student')
// require('./model/teacher')
// require('./model/administrator')
require('./model/questionnaire/questRes')
// require('./model/question')
// require('./model/course/course')
// 处理post请求参数
// 解析表单
// app.use(bodyParser.urlencoded({extended: false}));
// 解析json格式
app.use(bodyParser.json())



// 为路由匹配请求路径
app.use('/user',user)
app.use('/quest',questionnaire)
app.use('/course',course)

// 监听端口
app.listen(3000)
console.log("网站服务器启动成功，请访问localhost");