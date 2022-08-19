const { Wallet, WalletTransaction } = require('../models')
const ErrorResponse = require('../utils/errorResponse')
const { userService } = require('../services')
const { randomString } = require("../utils/randomString");

const getUserWallet = async(user) => {
    const wallet = await Wallet.findOne({user: user});
    return wallet;
}

const createWallet = async(user) => {
    const wallet = await Wallet.create({user: user});
    const updatedUser = await userService.updateUser(user,{wallet: wallet._id.toString()})
    return wallet;
}

const fundWallet = async(user,postData) => {
    try{
        const userWallet = await Wallet.findOne({user: user});

        if(!userWallet) {
            throw new ErrorResponse(`Wallet not found`, 404) 
        }

        // Create transaction with pending status
        
        Object.assign(userWallet, {balance: userWallet.balance + postData.amount});
        await userWallet.save()

        //Update transaction with the status(failed/succussful)
        const transaction = await WalletTransaction.create({
            wallet: userWallet._id,
            user: user,
            transactionReference: 'txn_'+randomString(30),
            description: 'Wallet funding',
            amount: upostData.amount,
            status: 'successful',
            type: 'credit',
            currency: userWallet.currency,
            action: 'fund'
        })
        return userWallet;
    } catch (err) {
        throw new ErrorResponse(err.message, 400) 
    }
}


const transferToWallet = async(user,postData) => {
    try {
        const senderWallet = await Wallet.findOne({user: user});

        if(!senderWallet) {
            throw new ErrorResponse(`Wallet not found`, 404) 
        }

        if(senderWallet.balance < postData.amount) {
            throw new ErrorResponse(`Insufficiate fund`, 400) 
        }
        // Create transaction with pending status


        const recieverWallet = await Wallet.findOne({user: postData.reciever});
        if(!recieverWallet) {
            throw new ErrorResponse(`Reciever not found`, 404) 
        }

        // debit sender
        Object.assign(senderWallet, {balance: senderWallet.balance - postData.amount});
        await senderWallet.save()


        //Credit reciever
        Object.assign(recieverWallet, {balance: recieverWallet.balance + postData.amount});
        await recieverWallet.save()

        // DRY the transaction
        //Update transaction with the status(failed/succussful)
        // Sender transaction
        await WalletTransaction.create({
            user: postData.reciever,
            transactionReference: 'txn_'+randomString(30),
            description: 'Wallet transfer debit',
            amount: postData.amount,
            status: 'successful',
            type: 'debit',
            currency: senderWallet.currency,
            sender: user,
            action: 'transfer'
        })


        // reciever transaction
        await WalletTransaction.create({
            user: postData.reciever,
            transactionReference: 'txn_'+randomString(30),
            description: 'Wallet transfer credit',
            amount: postData.amount,
            status: 'successful',
            type: 'credit',
            currency: senderWallet.currency,
            sender: user,
            action: 'transfer'
        })

        return true;
    } catch (err) {
        throw new ErrorResponse(err.message, 400) 
    }
}


const withdrawFromToWallet = async(user,postData) => {
    try {
        const userWallet = await Wallet.findOne({user: user});

        if(!userWallet) {
            throw new ErrorResponse(`Wallet not found`, 404) 
        }

        if(userWallet.balance < postData.amount) {
            throw new ErrorResponse(`Insufficiate fund`, 400) 
        }
        // Create transaction with pending status


        // debit withdrawal
        Object.assign(userWallet, {balance: userWallet.balance - postData.amount});
        await userWallet.save()


        //Update transaction with the status(failed/succussful)
        const transaction = await WalletTransaction.create({
            user: userWallet._id,
            transactionReference: 'txn_'+randomString(30),
            description: 'Wallet withdrawal',
            amount: postData.amount,
            status: 'successful',
            type: 'debit',
            currency: userWallet.currency,
            // sender: user,
            action: 'withdrawal'
        })
        return true;
    } catch (err) {
        throw new ErrorResponse(err.message, 400) 
    }
}

module.exports = {
    createWallet,
    fundWallet,
    getUserWallet,
    transferToWallet,
    withdrawFromToWallet
}