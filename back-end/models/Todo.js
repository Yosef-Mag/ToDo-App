const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
	
	content: {
		type: String,
	},
	
	date: {
		type: Date,
		default: Date.now()
	}
});

module.exports = Todo = mongoose.model('todo', TodoSchema);