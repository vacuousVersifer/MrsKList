const UsersPath = process.env.USERS_PATH;

const crypto = require("crypto");
const DB = require("./db");
const encryptor = require("./encryptor");

let users = new DB(UsersPath);

module.exports = {
  process: (credentials, users, tokens) => {
    let user = users.getItemByKeyValuePair("code", credentials.code);
    console.log(["Getting user", user])

    if (user !== -1) {
      console.log("User is not -1")
      let token = crypto.randomBytes(48).toString("hex");
      console.log(["Token", token])

      let password = encryptor.encrypt(credentials.password);
      console.log(["Password from user and password from credentials", user.password, password]);
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
