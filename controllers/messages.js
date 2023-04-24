const Message=require('../models/msg')

const deleteChat=async(req,res)=>{
const id=req.uid;
const messagesFrom=req.params.from
const del = await Message.deleteMany({to:id, from:messagesFrom})
const delto=await Message.deleteMany({to:messagesFrom,from:id})
res.json({
    ok:true,
    msg:'Clear chat',
    id,
    del,
    delto
})
}


const getChat=async(req,res)=>{
const myId=req.uid;
const messagesFrom=req.params.from


const last30=await Message.find({
    $or:[{from:myId,to:messagesFrom},{from:messagesFrom,to:myId}]
})
.sort({createdAt:'desc'})
.limit(30)
res.json({
    ok:true,
    msg:last30,
    myId,
    messagesFrom,
})


}

module.exports={
    getChat,
    deleteChat
}