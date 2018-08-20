var mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;
var Schema = mongoose.Schema;

var promotionSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: true
	},
	label: {
		type: String,
		default: ""
	},
	price: {
		type: Currency,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	featured: {
        type: Boolean,
        default:false
    }
});

module.exports = mongoose.model('Promotion', promotionSchema);


