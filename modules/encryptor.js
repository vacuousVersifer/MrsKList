const SecretKey = process.env.SECRET_KEY;
const Algorithm = process.env.ALGORITHM;

const crypto = require("crypto");

module.exports = {
  encrypt: text => {
    console.log(["Got text", text])
    let iv = crypto.randomBytes(16);
    console.log([iv]);
    let cipher = crypto.createCipheriv(Algorithm, SecretKey, iv);
    console.log([iv, cipher]);
    let encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    console.log([iv, cipher, encrypted]);

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
