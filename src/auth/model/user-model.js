'use strict';
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET || 'secretstring';
const userModel = (sequelize, DataTypes) => {
  const model = sequelize.define('users', {
    ID: { type: DataTypes.INTEGER },
    // Server_DateTime: { type: DataTypes.DATE },
    // DateTime_UTC: { type: DataTypes.DATE },
    // Update_DateTime_UTC: { type: DataTypes.DATE },
    // Last_Login_DateTime_UTC: {  type: DataTypes.DATE, // Use the DATE data type for last login timestamp
    // allowNull: true, },
    Name: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING },
    email: {  type: DataTypes.STRING, required: true, unique: true},
    Phone: { type: DataTypes.STRING },
    Status: { type: DataTypes.STRING },
    Gender: { type: DataTypes.STRING },
    Date_Of_Birth: { type: DataTypes.STRING },
    role: { type: DataTypes.ENUM('user', 'admin'), required: true, defaultValue: 'user' },
    username: { type: DataTypes.STRING, required: true, unique: true },
    password: { type: DataTypes.STRING, required: true },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign({ email: this.email,role: this.role, id:this.id  }, SECRET);
      },
      set(tokenObj) {
        let token = jwt.sign(tokenObj, SECRET);
        return token;
      }

    },
    capabilities: {
      type: DataTypes.VIRTUAL,
      get() {
        const acl = {
          user: ['readUser', 'createUser', 'updateUser','deleteUser'],
          admin: ['read', 'create', 'update', 'delete', 'readUser', 'createUser','updateUser', 'deleteUser']
        };
        return acl[this.role];
      }
    }
  });
  model.beforeCreate(async (user) => {
    let hashedPass = await bcrypt.hash(user.password, 10);
    user.password = hashedPass;
    // user.Server_DateTime = new Date();
    // const now = new Date();
      // now.setUTCHours(now.getUTCHours() + 3);
    // user.DateTime_UTC = now.toISOString();
    // user.Update_DateTime_UTC = new Date().toUTCString();
  });
  // model.beforeUpdate(async (user) => {
  //   user.Update_DateTime_UTC = new Date().toUTCString();
  // });
  model.authenticateBasic = async function (email, password) {
    const user = await this.findOne({ where: { email: email } });
    const valid = await bcrypt.compare(password, user.password);
    if (valid) { return user; }
    throw new Error('Invalid User');
  };

  model.authenticateToken = async function (token) {
    try {
      const parsedToken = jwt.verify(token, SECRET);
      const user = await this.findOne({ where: { email: parsedToken.email } });
      if (user) { return user; }
      throw new Error("User Not Found");
    } catch (e) {
      throw new Error(e.message)
    }
  };

  return model;

}
module.exports = userModel;