var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var favoritesSchema = new Schema({
	postBy: {
		type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
	},
	dishes: [{
		id: {
			type: mongoose.Schema.Types.ObjectId,
        	ref: 'Dish'
		}
	}]


}, {
    timestamps: true
});

module.exports = mongoose.model('Favorite', favoritesSchema);