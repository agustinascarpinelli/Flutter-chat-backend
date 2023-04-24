/**
 * 
 * path: api/login
 * 
 */



const {Router}=require('express');
const { check } = require('express-validator');
const { createUser,login, renewToken, changeUser, addFriends } = require('../controllers/auth');
const { validateJWT } = require('../middlewares/validate-jwt');
const { validateReq } = require('../middlewares/validate-req');

const router=Router();


router.post('/new',[
    check('name','Must contain a name').not().isEmpty(),
    check('password','Password must be at least 6 characters and contain a number').isLength({min:6}).matches(/\d/),
    check('password','Must contain a password').not().isEmpty(),
    check('passwordConfirmation').custom((value,{req})=>{
     if (value!==req.body.password){
     throw new Error('Password confirmation does not match password')
    }
    return true;
}),
check('email','Must contain email').not().isEmpty(),
check('email','Must be a valid email').isEmail(),
    validateReq
],createUser)


router.post('/',[
    check('email','Must contain email').not().isEmpty(),
    check('password','Must contain a password').not().isEmpty(),
    validateReq
],login)

router.post('/change',validateJWT,)



router.get('/renew',validateJWT,renewToken)

router.post('/change',[check('email','Must be a valid email').isEmail(),validateJWT],changeUser)

module.exports=router