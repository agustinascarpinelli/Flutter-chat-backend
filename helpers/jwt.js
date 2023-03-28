const jwt = require("jsonwebtoken");

const generateJWT = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = {
      uid,
    };

    jwt.sign(
      payload,
      process.env.JWT_KEY,
      {
        expiresIn: "48h",
      },
      (error, token) => {
        if (error) {
          //no se pudo crear el token
          reject('Cant generate JWT')
        }
        else{
            resolve(token)
        }
      }
    );
  });
};


module.exports = {
  generateJWT,
};
