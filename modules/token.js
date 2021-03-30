module.exports = {
  process: (token, tokens) => {
    return tokens.getItemByKeyValuePair("token", token);
  }
};