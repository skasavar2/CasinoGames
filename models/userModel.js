

const mongoose = require('mongoose');

const userSchema = mongoose.Schema(

    {
        userId:{
            type:String,
            required:[true, "Please enter a username"],
        },
        email:{
            type:String,
            unique:[true, "Please enter a email"],
        },
        password:{
            type:String,
            requires:[true,"Please enter a password"],
        },
        balance:{
            type:Number,
            requires:[true,"Please enter a balance"],
        },
        operatorId:{
            type:String,
            required:[true, "Please enter a operatorId"],
        }
    },
    {
        timestamps: true
    }

);


module.exports = mongoose.model("User", userSchema);