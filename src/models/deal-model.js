"use strict";

const Deals = (sequelize, DataTypes) =>
  sequelize.define("deals", {

    ID: { type: DataTypes.INTEGER},
    Server_DateTime: {type: DataTypes.DATE},
    DateTime_UTC: {type: DataTypes.DATE},
    Update_DateTime_UTC: { type: DataTypes.DATE},
    Name: { type: DataTypes.STRING },
    Description: { type: DataTypes.STRING },
    Status: { type: DataTypes.STRING },
    Amount: { type: DataTypes.STRING },
    Currency: { type: DataTypes.STRING },

   
  });

module.exports = Deals;