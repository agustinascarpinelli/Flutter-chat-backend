const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { generateJWT } = require("../helpers/jwt");

const createUser = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const oldEmail = await User.findOne({ email: email });
    if (oldEmail) {
      return res.status(400).json({
        ok: false,
        msg: "The email is already registered",
      });
    }

    const user = new User(req.body);

    //Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    //Generar JWT
    const token = await generateJWT(user.id);

    res.json({
      ok: true,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error.Try again later",
    });
  }
};


const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: "Email not found",
      });
    }
    const validPassword=bcrypt.compareSync(password,user.password)
    if(!validPassword){
        return res.status(400).json({
          ok: false,
          msg: "Invalid credentials",
        });
      }
    
      //Generar JWT
      const token = await generateJWT(user.id);
    
     return res.json({
        ok: true,
        msg: "login",
        user,
        token
      });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error at server.Try again later",
    });
  }
};

const renewToken=async(req,res=response)=>{

    const uid=req.uid;

    const token = await generateJWT(uid);

    const user = await User.findById(uid);
    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: "User not found",
      });
    }
    

    res.json({
        ok:true,
        user,
        token
    })
}


module.exports = {
  createUser,
  login,
  renewToken
};
