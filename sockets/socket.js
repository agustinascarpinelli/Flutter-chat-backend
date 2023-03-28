const {io}=require('../index.js')
//Mensajes de sockets

io.on('connection',client=>{
    console.log("Cliente conectado")
      client.on('disconnect',()=>{
          console.log('Client disconnected')
      })
  
//   client.on('message',(payload)=>{
//       console.log('Message recieved:',payload.name);
//       io.emit('message',{client1:payload.name})
//   })
  
  
  })
  