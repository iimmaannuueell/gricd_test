const mongoose = require("mongoose");
const { randomString } = require("../utils/randomString");

const WalletSchema = mongoose.Schema({
    user: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: "user",
		required: true,
        unique: true
	},
	walletID: { type: String, unqiue: true },
	balance: { type: Number, default: 0.0 },
	currency: { type: String, default: "NGN" },
},
{
        timestamps: true,
});


WalletSchema.pre('save', async function(next) {
    // if(this.password){
    //     const salt = await bcrypt.genSalt(10);
    //     this.password = await bcrypt.hash(this.password, salt);
    // }
   this.walletID =  randomString(20)
});


module.exports = mongoose.model('Wallet', WalletSchema);