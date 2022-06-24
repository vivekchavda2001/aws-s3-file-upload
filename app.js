const express = require('express');
const router = require('./router/index');
const app = express()

app.use(router)

app.listen(3000,()=>{
    console.log("🚀 Running on 3000");
})