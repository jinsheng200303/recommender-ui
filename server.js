var express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

// 创建express应用
const app = express();
// app.all('*', function (req, res, next) {
//     console.log("=====================")
//     console.log(req.url)
//     console.log("=====================")
//     res.header("Access-Control-Allow-Origin", req.headers.origin);//访问的主机名称
//     //为true的时候，前端必须传送cookie
//     res.header('Access-Control-Allow-Credentials', 'true'); //是否支持cookie跨域
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");//允许以下方法进行跨域请求
//     next();
// });

const proxyConfigStr = { "/proxy": { "target": "http://localhost:8080", "changeOrigin": true } };

const configObject = {};

if(process.env["proxyConfigStr"]){
    configObject.data = JSON.parse(process.env["proxyConfigStr"]);
}else{
    configObject.data = proxyConfigStr;
}
// 遍历配置文件
for (let key in configObject.data) {
    // 创建代理
    const tempProxy = createProxyMiddleware(key, configObject.data[key]);
    app.use(tempProxy);
}

app.use("/",express.static('./dist')) // 设置静态资源目录
app.listen(3003, () => {
    console.log(`Server has started！Ready for request!`);
});



