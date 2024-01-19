const mongoose = require("mongoose");
 const {Schema }=mongoose;


const userSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
  },
 
  email: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  password: {
    type: Schema.Types.String,
    required: true,
  }
 
});

const User = mongoose.model('user', userSchema);
module.exports = User;