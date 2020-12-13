
module.exports = (sequelize,Sequelize) =>{
    const Item = sequelize.define("item",{
        Amount : {
            type : Sequelize.NUMBER
        },
        Disc: {
            type: Sequelize.STRING
        }
    });
    return Item;
}