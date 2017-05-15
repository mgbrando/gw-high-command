const mongoose = require('mongoose');

mongoose.Promise = global.Promise;


const GuildSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {type: String, required: true},
  tag: {type: String, required: true},
  tasks: [{type: String, required: true}],
  members: [{handleName: {type: String, required: true}, apiKey: {type: String, required: true}}],
});

GuildSchema.methods.apiRepr = function() {
  return {
    id: this.id,
    name: this.name,
    tag: this.tag,
    tasks: this.tasks,
    members: this.members
  };
}

const Guild = mongoose.model('Guild', GuildSchema);

module.exports = {Guild};