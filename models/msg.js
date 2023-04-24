const {Schema, model}=require ('mongoose');



const MsgSchema=Schema({

from:{
    type:Schema.Types.ObjectId,
    ref:'Users',
    required:true,
},
to:{
    type:Schema.Types.ObjectId,
    required:true,
    ref:'Users',

},

msg:{
    type:String,
    required:true,

},

},{
    timestamps:true
}

);
MsgSchema.method('toJSON',function(){
    const {__v,_id,...object}=this.toObject();
    return object
})
//Cuando se llama el toJSON de User, va a regresar el object que tiene el id (renmombrado a uuid, y todas las propiedades(...objetc) menos password , __v)
module.exports=model('Message',MsgSchema)


