const encryptor = require("./encryptor");

module.exports = {
  getUser: (code, users) => {
    return users.getItemByKeyValuePair("code", code);
  },
  register: (credentials, users) => {
    if(users.getItemByKeyValuePair("code", credentials.code) !== -1) {
      return -1;
    }

    let hash = encryptor.encrypt(credentials.password);
    let newUser = {
      name: credentials.name,
      code: credentials.code,
      password: hash.content,
      id: hash.iv,
      type: "normal"
    };

    users.addItem(newUser);
  }
};