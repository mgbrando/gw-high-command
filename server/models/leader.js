const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;


const LeaderSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  handleName: {
    type: String,
    required: true
  },
  apiKey: {type: String, required: true},
  guildIds: [{type: String, required: true}]
});

LeaderSchema.methods.apiRepr = function() {
  return {
    handleName: this.handleName,
    apiKey: this.apiKey,
    guildIds: this.guildIds
  };
}

LeaderSchema.methods.validatePassword = function(password) {
  return bcrypt
    .compare(password, this.password)
    .then(isValid => isValid);
}

LeaderSchema.statics.hashPassword = function(password) {
  return bcrypt
    .hash(password, 10)
    .then(hash => hash);
}

const Leader = mongoose.model('Leader', LeaderSchema);

module.exports = {Leader};