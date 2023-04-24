const { Console } = require('console');
const express =require('express')
const path=require('path')
require('dotenv').config();


//DB Config
const {dbConnection}=require('./database/config')
dbConnection()

//App Express
const app=express()

//Lectura y parseo del body 

app.use(express.json())



//Node server
const server=require('http').createServer(app)
module.exports.io=require('socket.io')(server)
require('./sockets/socket.js')


//Path public

const publicPath=path.resolve(__dirname, 'public')

app.use(express.static(publicPath))




//Mis rutas
app.use('/api/login',require('./routes/auth'));
app.use('/api/users',require('./routes/users'))
app.use('/api/messages',require('./routes/messages'))



server.listen(process.env.PORT,(err)=>{
    if(err) throw new Error(err)
    console.log('Server running on port', process.env.PORT)
})