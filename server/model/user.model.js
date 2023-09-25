const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchma = new Schema(
    {
      name: {
        type: String,
        required: true
      }, 
      email: {
        type: String,
        required: true,
        unique: true
      },
      password:{
        type: String,
        required: true
      },
     
    },
    {collection : 'user-data'}
)


const UserModel = mongoose.model('User' , UserSchma)

module.exports = UserModel;