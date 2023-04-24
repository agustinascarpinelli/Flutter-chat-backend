/**
 * 
 * path: api/users
 * 
 */



const {Router}=require('express');
const { check } = require('express-validator');
const { getUsers,addFriends } = require('../controllers/users');
const { validateJWT } = require('../middlewares/validate-jwt');
const { validateReq } = require('../middlewares/validate-req');


const router=Router();



router.get('/',validateJWT,getUsers)



module.exports=router