const crypto = require("crypto");
const encryptor = require("./encryptor");

module.exports = {
  process: (credentials, users, tokens) => {
    let user = users.getItemByKeyValuePair("code", credentials.code);

    if (user !== -1) {
      let token = crypto.randomBytes(48).toString("hex");

      let password = encryptor.encrypt(credentials.password);
      if (user.password === password) {
        tokens.addItem({
          token,
          code: user.code
        });
        
        return {
          found: true,
          token
        };
      }
    }

    return {
      found: false
    };
  }
};
