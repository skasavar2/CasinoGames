

const mongoose = require('mongoose');

const userSchema = mongoose.Schema(

    {
        operatorId: {
            type:String,
            required:[true, "Please enter a operatorId"],
        },
        userId: {
            type:String,
            required:[true, "Please enter a userId"],
        },
        reqId:{
            type:String,
            required:[true, "Please enter a reqId"],
        },

        transactionId:{
            type:String,
            required:[true, "Please enter a transactionId"],
        },

        gameId:{
            type:String,
            requires:[true,"Please enter a gameId"],
        },
        roundId:{
            type:String,
            requires:[true,"Please enter a balance"],
        },
        transactionType:{
            type:String,
            required:[true, "Please enter a transactionType"],
        },
        transactionAmount:{
            type:String,
            required:[true, "Please enter a transactionAmount"],
        },
        betType: {
            type:String,
            required:[true, "Please enter a betType"],
        }
    },
    {
        timestamps: true
    }

);


module.exports = mongoose.model("Transactions", userSchema);