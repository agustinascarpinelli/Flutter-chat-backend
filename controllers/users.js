const { response } = require("express");
const User=require('../models/user')

const getUsers=async(req,res=response)=>{

//const from=Number(req.query.from)||0;
const users=await User
//ne :not exist
.find({_id:{$ne:req.uid}})
.sort('-online')
//.skip(from)
//.limit(2)




    res.status(400).json({
        ok:true,
        users,
        //from
    })




}


module.exports={
    getUsers,

}