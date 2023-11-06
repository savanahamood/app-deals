"use strict";

const ClimedDeals = (sequelize, DataTypes) =>
  sequelize.define("claimeddeals", {

    ID: { type: DataTypes.INTEGER},
    User_ID: {type: DataTypes.INTEGER},
    Deal_ID: {type: DataTypes.INTEGER},
    Server_DateTime: { type: DataTypes.DATE},
    DateTime_UTC: { type: DataTypes.DATE },
    Amount: { type: DataTypes.STRING },
    Currency: { type: DataTypes.STRING },
    

   
  });

module.exports = ClimedDeals;