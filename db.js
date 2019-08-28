const Sequelize=require('sequelize')

const sequelize =new Sequelize('chatdb','root','root',{
    dialect : 'sqlite',
    storage : 'notbok.db'
})
const note1=sequelize.define('notes',{
    title:{
        type:Sequelize.STRING,
        allownull:true,
        unique:false
    },
    body:{
        type:Sequelize.STRING,
        allownull:true,
        unique:false
    }
   
})

const User=sequelize.define('user',{
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      // fbAccessToken: {
      //   type: Sequelize.STRING,
      // },
})

module.exports={
    sequelize,User,note1
}