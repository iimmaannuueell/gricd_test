const mongoose = require("mongoose");

const WalletTransactionSchema = mongoose.Schema({
    user: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: "user",
		required: true,
	},
	transactionReference: { type: String },
	amount: { type: String },
	description: { type: String },
	status: { type: String },
	type: { type: String },
	currency: { type: String },
	sender: { type: String, default: 'self' },
	action: { type: String }
},
{
        timestamps: true,
});


module.exports = mongoose.model('WalletTransaction', WalletTransactionSchema);