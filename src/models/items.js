
module.exports = (sequelize,Sequelize) =>{
    const Item = sequelize.define("item",{
        Title :{
            type:Sequelize.STRING
        },
        Abstract: {
            type: Sequelize.STRING
        },
        Dp:{
            type : Sequelize.BOOLEAN
        }
    });
    return Item;
}