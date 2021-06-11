module.exports = (sequelize, DataTypes) => {
  return sequelize.define("entries", {
    name: DataTypes.STRING,
    watched: DataTypes.STRING,
    must: DataTypes.BOOLEAN,
    funny: DataTypes.BOOLEAN,
    commit: DataTypes.BOOLEAN,
    scary: DataTypes.BOOLEAN,
    adult: DataTypes.BOOLEAN,
    romance: DataTypes.BOOLEAN
  }, { timestamps: false })
};
