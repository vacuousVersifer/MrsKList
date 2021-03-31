const SecretKey = process.env.SECRET_KEY;
const Algorithm = process.env.ALGORITHM;

const crypto = require("crypto");

module.exports = {
  encrypt: text => {
    let cipher = crypto.createHash(Algorithm, SecretKey);
    let encrypted = cipher.update(text).digest("hex");

    return encrypted;
  }
};
