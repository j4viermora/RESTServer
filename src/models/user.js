const { Schema, model } = require('mongoose');


const UserSchema = Schema({

    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    img:{
        type: String,
    },
    role:{
        type: String,
        required: true,
        default: 'USER_ROLE',
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    state:{
        type: Boolean,
        default: true,
    },
    google:{
        type: Boolean,
        default: false
    }
});

UserSchema.methods.toJSON = function(){
    const { __v, password, _id : uid ,...user } = this.toObject();
    return {
        uid,
        ...user
    };
}


module.exports = model( 'User', UserSchema );