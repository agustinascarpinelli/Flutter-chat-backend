const { validateJWT } = require("../helpers/jwt.js");
const { io } = require("../index.js");
const {userConnected,userDisconnected, saveMessage, changeUser, addFriends}=require('../controllers/socket')
//Mensajes de sockets

io.on("connection", (client) => {
  console.log("Cliente conectado");
  // console.log(client.handshake.headers['x-token'])
  const [valid, uid] = validateJWT(client.handshake.headers["x-token"]);
  //console.log(valid,uid)
  if (!valid) {
    return client.disconnect();
  }
  //cliente autenticado
  //console.log("JWT AUTH");
  
  userConnected(uid);

  //Ingresar al usuario a una sala especifica:
  //Sala global (all users),client.id(usario especifcio),uuid 
client.join(uid);

//Escuchar el msg-personal del cliente

client.on('msg-personal',async(payload)=>{
await saveMessage(payload)
  io.to(payload.to).emit('msg-personal',payload)
})

client.on('add friend', async (payload) => {
  try {
    await addFriends(payload.uid,payload.idFriend);
    socket.emit('add friend success');
  } catch (error) {
    client.emit('add friend error', error.message);
  }
});


 

 
  client.on("disconnect", () => {
    //console.log("Client disconnected");
    userDisconnected(uid)
  });

  //   client.on('message',(payload)=>{
  //       console.log('Message recieved:',payload.name);
  //       io.emit('message',{client1:payload.name})
  //   })
});
