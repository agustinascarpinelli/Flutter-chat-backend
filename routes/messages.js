/*
path: /api/messages

*/


const {Router}=require('express');
const { check } = require('express-validator');
const { getChat, deleteChat } = require('../controllers/messages');
const { validateJWT } = require('../middlewares/validate-jwt');
const { validateReq } = require('../middlewares/validate-req');

const router=Router();



router.get('/:from',validateJWT,getChat)
router.delete('/:from',validateJWT,deleteChat)

module.exports=router