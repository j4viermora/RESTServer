const { Schema, model } = require('mongoose');

const CategorySchema = Schema({

    name:{
         type: String,
         required: [ true, 'Name is required' ],
         unique: true
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
});

CategorySchema.methods.toJSON = function(){
    const { __v, ...data  } = this.toObject();
    return {
        ...data,
    };
}


module.exports = model( 'category', CategorySchema )