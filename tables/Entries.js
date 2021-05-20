module.exports = (sequelize, DataTypes) => {
  return sequelize.define("entries", {
    name: DataTypes.STRING,
    watched: DataTypes.STRING
  }, { timestamps: false })
};
