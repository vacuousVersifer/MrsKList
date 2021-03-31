const SecretKey = process.env.SECRET_KEY;
const Algorithm = process.env.ALGORITHM;

const crypto = require("crypto");

module.exports = {
  encrypt: text => {
    let iv = crypto.randomBytes(16);
    let cipher = crypto.createCipheriv(Algorithm, SecretKey, iv);
    let encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return {
      iv: iv.toString("hex"),
      content: encrypted.toString("hex")
    };
  },
  decrypt: hash => {
    let decipher = crypto.createDecipheriv(
      Algorithm,
      SecretKey,
      Buffer.from(hash.iv, "hex")
    );
    let decrpyted = Buffer.concat([
      decipher.update(Buffer.from(hash.content, "hex")),
      decipher.final()
    ]);

    return decrpyted.toString();
  }
};
