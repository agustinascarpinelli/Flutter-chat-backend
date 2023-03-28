const {Schema, model}=require ('mongoose');



const UserSchema=Schema({

name:{
    type:String,
    required:true,
},
email:{
    type:String,
    required:true,
    unique:true

},
password:{
    type:String,
    required:true,

},
online:{
    type:Boolean,
    default:false,

},
friends:{
    type:Array,
    default:[]
}
});
UserSchema.method('toJSON',function(){
    const {__v,_id,password,online, friends,...object}=this.toObject();
    object.uid=_id;
    return object
})
//Cuando se llama el toJSON de User, va a regresar el object que tiene el id (renmombrado a uuid, y todas las propiedades(...objetc) menos password , __v,friends y online)
module.exports=model('User',UserSchema)