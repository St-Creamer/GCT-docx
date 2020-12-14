const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect:'sqlite',
  storage:'database.db'
});

const connect = ()=>{
  try{
    sequelize.authenticate();
    return true;
   }catch(err){
     console.error('unable to connect to db')
     return false;
   }

}

const db = {};


db.sequelize = sequelize;
db.sequelize = Sequelize;
db.connect = connect;
db.Item = require('./models/items')(sequelize,Sequelize);
module.exports = db;