const { Model, DataTypes } = require("sequelize");
const db = require("../config/database");
const {
  TRUE,
  FALSE,
  NULL,
  STATUS_DEFAULT,
  STATUS_INACTIVE,
} = require("../constants/global.constants");
const { USERS_CONSTANTS } = require("./Constants/users.constants");

class Users extends Model {}

Users.init(
  {
    id: {
      type: DataTypes.INTEGER(11),
      autoIncrement: TRUE,
      primaryKey: TRUE,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: FALSE,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: FALSE,
    },
    type: {
      type: DataTypes.ENUM,
      defaultValue: USERS_CONSTANTS.TYPE_USER,
      values: [USERS_CONSTANTS.TYPE_USER, USERS_CONSTANTS.TYPE_ADMIN],
      allowNull: FALSE,
    },
    status: {
      type: DataTypes.ENUM,
      defaultValue: STATUS_DEFAULT,
      values: [STATUS_DEFAULT, STATUS_INACTIVE],
      allowNull: FALSE,
    },
    token: {
      type: DataTypes.TEXT,
      defaultValue: NULL,
      allowNull: TRUE,
    },

    created_by: {
      type: DataTypes.INTEGER(11),
      defaultValue: NULL,
      allowNull: TRUE,
    },
    updated_by: {
      type: DataTypes.INTEGER(11),
      defaultValue: NULL,
      allowNull: TRUE,
    },
    deleted_at: {
      type: DataTypes.DATE,
      defaultValue: NULL,
      allowNull: TRUE,
    },
    deleted_by: {
      type: DataTypes.INTEGER(11),
      defaultValue: NULL,
      allowNull: TRUE,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: FALSE,
      allowNull: FALSE,
    },
  },
  {
    sequelize: db,
    tableName: USERS_CONSTANTS.TABLE_NAME,
    modelName: USERS_CONSTANTS.MODEL_NAME,
  }
);

module.exports = { Users };
