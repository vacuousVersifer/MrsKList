const UsersPath = process.env.USERS_PATH;

const crypto = require("crypto");
const DB = require("./db");
const encryptor = require("./encryptor");

let users = new DB(UsersPath);

module.exports = {
  process: (credentials, tokens) => {
    let user = users.getItemByKeyValuePair("code", credentials.code);

    if (user !== -1) {
      let password = encryptor.decrypt({
        content: user.password,
        iv: user.id
      });
      
      let token = crypto.randomBytes(48).toString("hex");

      if (password === credentials.password) {
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
