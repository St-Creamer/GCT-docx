
module.exports = (sequelize,Sequelize) =>{
    const Item = sequelize.define("item",{
        Abstract: {
            type: Sequelize.STRING
        },
        Dp:{
            type : Sequelize.BOOLEAN
        }
    });
    return Item;
}