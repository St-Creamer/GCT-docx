const Sequelize = require('sequelize');


const sequelize = new Sequelize({
  dialect:'sqlite',
  storage:'database.db'
});

   try{
    sequelize.authenticate();
    console.log('connection established');
   }catch(err){
     console.error('unable to connect to db')
   }


const db = {};

db.sequelize = sequelize;
db.sequelize = Sequelize;
db.Item = require('./models/items')(sequelize,Sequelize);
module.exports = db;