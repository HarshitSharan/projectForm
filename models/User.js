const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  
  },
  /*question:{
      ques: [],
      type:[],
      questype:[]
  },*/

  type: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;